<template>
  <div class="messageBoard border-end">
    <div class="title">
      <h1>公開聊天室</h1>
    </div>
    <div class="container border-top" id="chat-container">
      <ul class="messageList">
        <div class="showMore">
          <div class="btn" v-show="!more" @click="more = !more">顯示更多</div>
        </div>
        <li
          v-for="(message, index) in messages"
          v-show="!(!more && index < 10)"
          :key="message.id"
          class="messageItem"
        >
          <template v-if="message.type === 'chat'">
            <template v-if="message.User.id !== currentUser.id">
              <div class="name">{{ message.User.name }}</div>
              <div class="mainContent">
                <router-link
                  :to="{ name: 'user', params: { id: message.User.id } }"
                >
                  <div class="avatar">
                    <img :src="message.User.avatar | emptyImage" alt="" />
                  </div>
                </router-link>
                <div class="textContainer">
                  <div class="text">{{ message.content }}</div>
                </div>
                <div class="textTime">{{ message.createdAt | fromNow }}</div>
              </div>
            </template>
            <template v-else>
              <div class="userContent d-flex ms-auto me-3 mb-4">
                <div class="replyTextTime">{{ message.createdAt | fromNow }}</div>
                <div class="textContainer">
                  <div class="reply">{{ message.content }}</div>
                </div>

              </div>
            </template>
          </template>
          <template v-else>
            <div class="check-online">
              <div class="online-box">{{ message.content }}</div>
            </div>
          </template>
        </li>

        <!-- reply message -->
      </ul>
    </div>
    <div class="meesagePanel border-top">
      <input
        id="textInput"
        placeholder="輸入訊息..."
        type="text"
        maxlength="140"
        required
        v-model="text"
        @keypress.enter="handleSubmit"
      />
      <button
        type="submit"
        class="btn sendBtn"
        @click.prevent.stop="handleSubmit"
      >
        <img src="../assets/send.svg" alt="" />
      </button>
    </div>
  </div>
</template>

<script>
import { fromNowFilter } from "../utils/mixins";
import { emptyImageFilter } from "../utils/mixins";
import { mapState } from "vuex";
import { Toast } from "../utils/helpers";

export default {
  name: "MessageBoard",
  mixins: [emptyImageFilter, fromNowFilter],
  computed: {
    ...mapState(["currentUser"]),
  },
  props: {
    initialMessages: {
      type: Array,
      required: true,
    },
  },
  watch: {
    initialMessages: {
      handler: function (newValue) {
        this.messages = newValue;
      },
      deep: true,
    },
  },
  updated() {
    const chatContainer = document.querySelector("#chat-container");
    chatContainer.scrollTop = chatContainer.scrollHeight;
  },
  created() {
    this.fetchMessages();
  },
  data() {
    return {
      messages: [],
      text: "",
      more: false,
    };
  },
  methods: {
    fetchMessages() {
      this.messages = this.initialMessages;
    },
    handleSubmit() {
      if (!this.text.trim()) {
        Toast.fire({
          icon: "error",
          title: "請輸入內容！",
        });
        return;
      }
      // 向socket 發出事件，傳送聊天訊息
      this.$socket.emit("chatMessage", this.text);
      // 清空輸入欄
      this.text = "";
    },
  },
};
</script>

<style scoped>
.row > * {
  padding-right: 0px;
  padding-left: 0px;
}
.messageBoard {
  flex: 2;
}
.messageBoard .title {
  height: 55px;
  padding: 10px 15px;
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  background-color: #fff;
  z-index: 1;
}
.title h1 {
  font-weight: 700;
  font-size: 19px;
  margin: 0;
}
/* message box */
.messageBoard .container {
  padding: 0;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 120px);
  overflow-y: scroll;
}
.name {
  font-size: 13px;
  font-weight: 900;
  color: rgb(75, 74, 74);
  margin-left: 65px;
  margin-top: 5px;
}
.avatar {
  width: 50px;
  height: 50px;
  border: 1px solid #fff;
  border-radius: 50%;
}
.avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.messageBoard .container::-webkit-scrollbar {
  display: none;
}
.messageList {
  margin-left: -10px;
}
.mainContent {
  max-width: 80%;
  margin: 5px 10px 15px 0px;
  display: flex;
  align-items: center;
}
.userContent {
  max-width: 60%;
  justify-content: flex-end;
}
.textTime {
  font-size: 12px;
  margin-left: 10px;
  margin-bottom: 10px;
  color: #777;
  font-weight: 500;
  align-self:flex-end;
}
.replyTextTime { 
  font-size: 12px;
  text-align: end;
  align-self: flex-end;
  color: #777;
  font-weight: 500;
}
.check-online {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.online-box,
.offline-box {
  max-width: 30%;
  margin: 5px;
  padding: 5px 10px;
  border-radius: 20px;
  background: #e6ecf0;
  font-weight: 700;
  font-size: 13px;
  text-align: center;
  color: #777;
}
.messageItem .avatar {
  min-width: 50px;
  height: 50px;
}
.messageItem .textContainer {
  word-break: break-all;
  max-width: 80%;
  margin-left: 10px;
  height: 100%;
}
.messageItem .mainContent .textContainer {
  max-width: 60%;
}
.messageItem .textContainer .text {
  padding: 10px 15px;
  border-radius: 20px 20px 20px 0;
  background: #e6ecf0;
  font-size: 16px;
}
.messageItem .textContainer .reply {
  padding: 10px 15px;
  display: flex;
  align-items: flex-end;
  border-radius: 20px 20px 0px 20px;
  background: #ff6600;
  color: #fff;
  font-size: 16px;
}

/*/ ////////////////// panel ///////////////*/
.meesagePanel {
  height: 60px;
  padding: 10px;
  display: flex;
}
#textInput {
  flex: 1;
  height: 40px;
  outline: none;
  border: none;
  padding: 10px;
  background: #e6ecf0;
  border-radius: 10px;
  font-size: 18px;
  font-weight: 500;
}
.sendBtn {
  width: 40px;
  height: 40px;
  padding: 0;
  padding-right: 10px;
  margin-left: 10px;
}
.sendBtn img {
  transform: rotate(45deg);
}
.showMore {
  text-align: center;
  margin-top: 30px;
}
.showMore .btn {
  padding: 0;
  font-size: 14px;
  color: #777;
  font-weight: 400;
}
</style>
