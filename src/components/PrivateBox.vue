<template>
  <div class="box ">
    <div class="userBox border-start border-end">
      <div class="title ">
        <h1>訊息</h1>
        <div class="newMessage">
          <button type="button" class="btn">
            <img src="../assets/newmsg.svg" alt="" />
          </button>
        </div>
      </div>
      <li class="userItem border-bottom">
        <div class="avatar">
          <img :src="'' | emptyImage" alt="" />
        </div>
        <div class="userContainer">
          <div class="row">
            <div class="userName col-2">
              <p>Apple</p>
            </div>
            <div class="userAccount col-2">
              <p>@apple</p>
            </div>
            <div class="lastTime col-8">
              <p>剛剛</p>
            </div>
          </div>
          <div class="previewMessage">
            <p>
              你最近好嗎？
            </p>
          </div>
        </div>
      </li>
    </div>
  </div>
</template>

<script>
import { emptyImageFilter } from "../utils/mixins";

export default {
  name: "PrivateMessage",
  mixins: [emptyImageFilter],
};
</script>

<style scoped>
.row > * {
  padding-right: 0px;
  padding-left: 0px;
}
.box {
  display: flex;
}
.publicMessage {
  display: flex;
}
.mainSection {
  flex: 1;
  width: 100%;
  height: 100vh;
  display: flex;
}
.userBox {
  flex: 1;
}
.messageBox {
  flex: 2;
}
.userBox .title,
.messageBox .title {
  border-bottom: 1px solid #e6ecf0;
  height: 55px;
  padding: 10px 15px;
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  background-color: #fff;
  z-index: 1;
}
.messageBox .title {
  padding: 0;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 0 10px;
}
.messageBox .title p {
  margin: 0;
  color: hsl(207deg 14% 46%);
}
.title h1 {
  font-weight: 700;
  font-size: 19px;
  margin: 0;
}
.newMessage {
  /* border: 1px solid #000; */
  position: absolute;
  right: 10px;
}
.newMessage button {
  padding: 12px;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.newMessage img {
  display: block;
  width: 20px;
  height: 20px;
}
.userBox .container {
  padding: 0;
}
.noReceivedMessageList {
  margin-top: 100px;
  text-align: center;
}
.userItem {
  padding: 0 10px;
  height: 60px;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.userItem:hover {
  cursor: pointer;
  background-color: #f7f7f7;
}
.avatar {
  margin-right: 10px;
  min-width: 50px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
}
.avatar img {
  width: 100%;
  height: 100%;
}
.userContainer {
  height: 50px;
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
}
.userContainer .row {
  margin: 0;
  height: 25px;
  overflow-x: hidden;
  position: relative;
}
.previewMessage {
  max-width: 90%;
  width: 90%;
  height: 25px;
  overflow: hidden;
}
.lastTime p,
.userName p,
.userAccount p {
  line-height: 25px;
  font-size: 14px;
  margin: 0;
}
.userName p {
  font-weight: 700;
}
.previewMessage p,
.userAccount p,
.lastTime p {
  color: #657786;
  font-weight: 500;
}
.userAccount p,
.userName p,
.previewMessage p {
  margin: 0;
}
.lastTime {
  text-align: end;
}
.previewMessage p {
  line-height: 25px;
  width: 100%;
}
/*/////////////////// message box ///////////////////*/
.messageBox .container {
  padding: 0;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 115px);
  overflow-y: scroll;
}
.messageBox .container::-webkit-scrollbar {
  display: none;
}
/* for Chrome, Safari and Opera */
.messageBox .container {
  -ms-overflow-style: none;
}
.messageList {
  flex: 1;
  margin: 0;
}
.mainContent {
  max-width: 60%;
  /* width: 200px; */
  /* height: 50px; */
  margin: 10px 10px 0 10px;
  display: flex;
  align-items: flex-end;
}
.textTime {
  margin-left: 70px;
  color: #777;
  font-weight: 500;
}
.messageItem .avatar {
  min-width: 50px;
  width: 50px;
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
.actionItem {
  margin: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.actionItem p {
  margin: 0;
  width: auto;
  background-color: hsl(0deg 0% 90%);
  color: hsl(207deg 14% 46%);
  padding: 5px 10px;
  border-radius: 10px;
  font-weight: 500;
}
/*////////// currentUser's message ///////////*/
.currentUser {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
.currentUser .textContainer .text {
  border-radius: 20px 20px 0 20px;
  background-color: hsl(24deg 100% 50%);
  color: #fff;
}
.currentUser .textTime {
  /* border: 1px solid #000; */
  margin: 0;
  margin-right: 10px;
}
.currentUser .mainContent .avatar {
  display: none;
}
/*/ ////////////////// panel ///////////////*/
.meesagePanel {
  height: 60px;
  padding: 10px;
  display: flex;
  border: 1px solid #e6ecf0;
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
