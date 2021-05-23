import React from "react";

import Constants from "expo-constants";
import * as Notifications from "expo-notifications";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import RoomStackNavConfigs from "./RoomStackNavigation";
import UserStackNavConfigs from "./UserStackNavigation";
const TabNav = createBottomTabNavigator();

import Pusher from "pusher-js/react-native";
import pusherConfig from "../pusher.json";

import { connect } from "react-redux";

Pusher.logToConsole = true;

const pusher = new Pusher(pusherConfig.key, pusherConfig);

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

class MainTabNavConfigs extends React.Component {
  state = {
    channel: null,
    expoPushToken: null,
    notification: {},
  };

  setExpoPushToken = (item) => {
    this.setState({ expoPushToken: item });
  };

  setNotification = (item) => {
    this.setState({ notification: item });
  };

  subscribePusher = () => {
    if (!this.props.isLoggedIn) return;

    let channel = pusher.subscribe("user");

    channel.bind("post-authenticated", (data) => {
      console.log(data);
    });

    channel.bind("review-authenticated", (data) => {
      console.log(data);
    });

    this.setState({ channel });
  };

  unsubPusher = () => {
    if (!this.state.channel) return;

    pusher.unsubsribe("user");
    this.setState({
      channel: null,
    });
  };

  registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      const token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
      this.setState({ expoPushToken: token });
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }
  };

  componentDidMount() {
    this.subscribePusher();

    this.registerForPushNotificationsAsync();

    Notifications.addNotificationReceivedListener(this._handleNotification);
    
    Notifications.addNotificationResponseReceivedListener(this._handleNotificationResponse);
  }

  _handleNotification = notification => {
    this.setState({ notification: notification });
  };

  _handleNotificationResponse = response => {
    console.log(response);
  };

  componentDidUpdate() {
    if (this.props.isLoggedIn) {
      this.subscribePusher();
    } else {
      this.unsubPusher();
    }
  }

  render() {
    return (
      <TabNav.Navigator
        initialRouteName="Room"
        tabBarOptions={{
          showLabel: false,
        }}
      >
        <TabNav.Screen
          name="Room"
          options={{
            title: "Rooms",
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name={focused ? "list" : "list-outline"}
                size={focused ? 30 : 25}
                color="pink"
              />
            ),
          }}
        >
          {() => <RoomStackNavConfigs />}
        </TabNav.Screen>
        <TabNav.Screen
          name="User"
          options={{
            title: "User",
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name={focused ? "person" : "person-outline"}
                size={focused ? 30 : 25}
                color="pink"
              />
            ),
          }}
        >
          {() => <UserStackNavConfigs />}
        </TabNav.Screen>
      </TabNav.Navigator>
    );
  }
}

const mapStateToProps = (state) => ({
  isLoggedIn: state.userReducer.isLoggedIn,
  user: state.userReducer.user,
});

export default connect(mapStateToProps)(MainTabNavConfigs);
