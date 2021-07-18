<template>
  <div class="container">
    <div class="row">
      <!-- SideNavbar -->
      <SideNavBar class="col-3" />
      <!-- mainSection -->
      <UserOnlineList class="col-4" :online-users="onlineUsers" />

      <!-- messageBox -->
      <MessageBoard class="col-5" :initial-messages="messages" />
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";

import VueSocketIO from 'vue-socket.io'
import SocketIO from 'socket.io-client'
import Vue from 'vue'


import SideNavBar from "./../components/SideNavBar.vue";
import MessageBoard from "./../components/MessageBoard.vue";
import UserOnlineList from "./../components/UserOnlineList.vue";
import { emptyImageFilter } from "../utils/mixins";
import { mapState } from "vuex";
import chatsAPI from "./../apis/chat";

const getToken = () => localStorage.getItem('token')
const options = { extraHeaders: { Authorization: `Bearer ${getToken()}` }}


Vue.use(new VueSocketIO({
  debug: false,
  connection:SocketIO('https://twitter-api-for-2021.herokuapp.com',options),
}))

export default {
  name: "chat",
  components: { SideNavBar, MessageBoard, UserOnlineList },
  mixins: [emptyImageFilter],
  created() {
    this.fetchMessage();
    this.login();
  },
  destroyed() {
    this.logout();
  },
  data() {
    return {
      text: "",
      onlineUsers: [],
      messages: [],
    };
  },
  computed: {
    ...mapState(["currentUser, token"]),
  },
  methods: {
    async fetchMessage() {
      const { data } = await chatsAPI.getChatMessage();
      data.map((receiveMessage) => {
        if (!receiveMessage.User) {
          return;
        }
        const { User, message, createdAt } = receiveMessage;
        this.messages.push({
          id: uuidv4(),
          User,
          content: message,
          createdAt,
          type: "chat",
        });
      });

      // 按時間排序
      this.messages.sort((a, b) => {
        const aDate = new Date(a.createdAt);
        const bDate = new Date(b.createdAt);
        return aDate.getTime() - bDate.getTime();
      });
    },
    login() {
      this.$socket.connect();
      this.$socket.emit("login", this.currentUser);
    },
    logout() {
      this.$socket.emit("logout", this.currentUser);
      this.$socket.disconnect();
    },
  },
  sockets: {
    // 登入/登出
    joinRoom(msg) {
      this.messages.push({
        id: uuidv4(),
        content: msg,
        type: "alert",
      });
    },
    leaveRoom(msg) {
      this.messages.push({
        id: uuidv4(),
        content: msg,
        type: "alert",
      });
    },
    chatMessage(msg) {
      // 發送訊息
      const message = msg[0];
      const User = msg[1];

      this.messages.push({
        id: uuidv4(),
        User,
        content: message,
        createdAt: new Date(),
        type: "chat",
      });
    },
    totalUser(users) {
      this.onlineUsers = users;
    },
  },
};
</script>
