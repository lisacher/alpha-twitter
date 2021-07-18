<template>
  <div class="messageBoard border-end">
    <div class="title d-flex">
      <h1>Apple</h1>
      <p>@apple</p>
    </div>
    <div class="container border-top">
      <ul class="messageList">
        <li class="messageItem">
          <template>
            <div class="mainContent">
              <div class="avatar">
                <img :src="'' | emptyImage" alt="" />
              </div>
              <div class="textContainer">
                <div class="text">你最近好嗎？</div>
              </div>
            </div>
            <div class="textTime">1分鐘</div>
          </template>
          <template>
            <div class="userContent">
              <div class="textContainer">
                <div class="reply">我很好</div>
              </div>
            </div>
            <div class="replyTextTime">1秒前</div>
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
      />
      <button type="submit" class="btn sendBtn">
        <img src="../assets/send.svg" alt="" />
      </button>
    </div>
  </div>
</template>

<script>
import { fromNowFilter } from "../utils/mixins";
import { emptyImageFilter } from "../utils/mixins";
import { mapState } from "vuex";

export default {
  name: "PrivateBoxReply",
  mixins: [emptyImageFilter, fromNowFilter],
  computed: {
    ...mapState(["currentUser"]),
  },
  // props: {
  //   initialMessages: {
  //     type: Array,
  //     required: true,
  //   },
  // },
  // watch: {
  //   initialMessages: {
  //     handler: function(newValue) {
  //       this.messages = newValue;
  //     },
  //     deep: true,
  //   },
  // },
  // created() {
  //   this.fetchMessages();
  // },
  data() {
    return {
      messages: [],
      text: "",
    };
  },
  methods: {
    // fetchMessages() {
    //   this.messages = this.initialMessages;
    // },
    // handleSubmit() {
    // 向socket 發出事件，傳送聊天訊息
    // this.$socket.emit("send", {
    //   User: this.currentUser,
    //   content: this.text,
    //   createdAt: new Date(),
    // });
    // this.messages.push({
    //   User: this.currentUser,
    //   content: this.text,
    //   createdAt: new Date(),
    // });
    // 確定送出成功
    // 存入事件
    // this.saveMessage();
    // 清空輸入欄
    // this.text = "";
  },
  // async saveMessage() {
  //   try {
  //     // TODO: 請求存入訊息
  //   } catch (error) {
  //     console.log(error);
  //   }
  // },
  // },
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
  flex-direction: column;
  position: sticky;
  top: 0;
  background-color: #fff;
  z-index: 1;
}
.title h1 {
  font-weight: 900;
  font-size: 19px;
  margin: 0;
}
.title p {
  font-weight: 700;
  font-size: 12px;
  color: #777;
}
/* message box */
.messageBoard .container {
  padding: 0;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 120px);
  overflow-y: scroll;
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
  margin-left: -15px;
}
.mainContent {
  max-width: 60%;
  margin: 10px 10px 0 0px;
  display: flex;
  align-items: flex-end;
}
.userContent {
  max-width: 60%;
  margin: 10px 0px 0 350px;
  display: flex;
  align-items: flex-start;
}
.textTime {
  font-size: 12px;
  margin-left: 70px;
  color: #777;
  font-weight: 500;
}
.replyTextTime {
  font-size: 12px;
  margin-left: 400px;
  color: #777;
  font-weight: 500;
}
.messageItem .avatar {
  min-width: 50px;
  height: 50px;
}
.messageItem .textContainer {
  word-break: break-all;
  margin-left: 10px;
  height: 100%;
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
</style>
