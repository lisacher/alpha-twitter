<template>
  <div class="messageBoard border-end">
    <div class="title ">
      <h1>公開聊天室</h1>
    </div>
    <div class="container border-top">
      <ul class="messageList">
        <div class="check-online">
          <div class="online-box">Apple 上線</div>
          <div class="offline-box">Debbie 離線</div>
        </div>
        <!-- send message-->
        <li class="messageItem">
          <div class="mainContent">
            <div class="avatar">
              <img :src="'' | emptyImage" alt="" />
            </div>
            <div class="textContainer">
              <div class="text">
                Hello~
              </div>
            </div>
          </div>
          <div class="textTime">下午6:01</div>
        </li>
        <!-- reply message -->
        <li class="messageItem">
          <div class="userContent">
            <div class="textContainer">
              <div class="reply">
                hi 你好啊～
              </div>
            </div>
          </div>
          <div class="replyTextTime">下午6:03</div>
        </li>
      </ul>
    </div>
    <div class="meesagePanel border-top">
      <input
        id="textInput"
        placeholder="輸入訊息..."
        type="text"
        maxlength="140"
        required
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
  name: "MessageBoard",
  mixins: [emptyImageFilter, fromNowFilter],
  computed: {
    ...mapState(["currentUser"]),
  },
};
</script>

<style scoped>
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
  max-width: 60%;
  margin: 10px 10px 0 0px;
  display: flex;
  align-items: flex-end;
}
.userContent {
  max-width: 60%;
  margin: 10px 0px 0 300px;
  display: flex;
  align-items: flex-start;
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
.textTime {
  margin-left: 70px;
  color: #777;
  font-weight: 500;
}
.replyTextTime {
  margin-left: 350px;
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
