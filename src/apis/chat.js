import { apiHelper } from './../utils/helpers'

export default {
  getChatMessage () {
    return apiHelper.get('/chat')
  }
}