import axios from 'axios'

const getToken = () => localStorage.getItem("token")

export default {
  getChatMessage () {
    return axios.get('https://twittertest8111009.herokuapp.com/api/chat', {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
  }
}