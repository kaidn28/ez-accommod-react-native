import axios from 'axios'

const sendNotif = (to, title, subtitle, body) => {
    return axios.post('https://exp.host/--/api/v2/push/send', {
        to, title, subtitle, body
    })
}

export default sendNotif