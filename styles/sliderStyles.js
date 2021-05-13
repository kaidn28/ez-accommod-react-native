import { StyleSheet } from "react-native";

import { defaultColor, defaultBorder } from "./constStyles";

const THUMB_RADIUS = 12;

export default StyleSheet.create({
  thumb: {
    width: THUMB_RADIUS * 2,
    height: THUMB_RADIUS * 2,
    borderRadius: THUMB_RADIUS,
    backgroundColor: defaultColor.primary,
  },
  rail: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: defaultColor.light,
  },
  railSelected: {
    height: 4,
    backgroundColor: defaultColor.secondary,
    borderRadius: 2,
  },
  label: {
    alignItems: "center",
    padding: 8,
    backgroundColor: defaultColor.secondary,
    borderRadius: 4,
  },
  labelText: {
    fontSize: 12,
    color: defaultColor.dark,
  },
  notch: {
    width: 8,
    height: 8,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: defaultColor.secondary,
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderTopWidth: 8,
  },
});
