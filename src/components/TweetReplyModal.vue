<template>
  <div
    class="modal fade"
    id="tweetReplyModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
            <button
              type="button"
              class="btn close-btn p-0"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
            <span aria-hidden="true"
              ><img src="../assets/icon_close@2x.png" alt=""
            /></span>
          </button>
        </div>

        <div class="modal-body">
          <!-- tweet -->
          <div class="container replyTarget">
            <div class="avatar">
              <img :src="'' | emptyImage" alt="" />
            </div>
            <div class="tweetInfo">
              <div class="userInfo">
                <p class="userName">
                  apple
                </p>
                <p class="userAccount">
                  @apple123
                </p>
                <span class="mx-1">&#xb7;</span>
                <p class="tweetUpdateAt">
                  2021/08
                </p>
              </div>
              <div class="tweetContent">
                <p>text</p>
              </div>
              <div class="panel">
                <p>
                  回覆給
                  <span> @ apple123 </span>
                </p>
              </div>
            </div>
          </div>

          <!-- comment -->
          <div class="container myReply">
            <div class="avatar">
              <img :src="'' | emptyImage" alt="" />
            </div>
            <div class="tweetInf">
              <div class="input">
                <textarea
                  id=""
                  name=""
                  cols="55"
                  rows="5"
                  autofocus
                  maxlength="140"
                  required
                  placeholder="推你的回覆"
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <div class="tweetButton">
            <button
              type="button"
              class="btn"
            >
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { emptyImageFilter } from "../utils/mixins"
import { fromNowFilter } from "../utils/mixins"

// const dummyData = {
// 	user: {
// 		id: 1,
// 		name: 'Jay',
// 		account: 'jay123',
// 		image: 'https://tse4.mm.bing.net/th?id=OIP.-C08ivJ6oLNEELI4SkjElgHaHa&pid=Api&P=0&w=300&h=300',
//         text: 'Hello您好～',
//         createdAt: '2021-07-01T09:58:39.000Z',
//     }
// }

export default {
  name: "TweetReplyModal",
  mixins: [emptyImageFilter, fromNowFilter],
  methods: {
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  padding: 10px 15px;
  display: flex;
}
/* replyTarget */
.replyTarget {
  position: relative;
}
.replyTarget::after {
  position: absolute;
  bottom: 0;
  left: 40px;
  content: "";
  display: block;
  width: 2px;
  transform: translateX(-50%);
  height: calc(100% - 70px);
  background-color: #ccd6dd;
}
/* modal-body */
.modal-body {
  padding: 0;
}
.avatar {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}
.avatar img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.tweetInfo {
  width: calc(100% - 60px);
}
.userInfo {
  display: flex;
  height: 22px;
}
.userInfo p {
  font-size: 15px;
  height: 100%;
  margin: 0;
}
.userInfo .userName {
  margin-right: 10px;
  font-weight: 700;
}
.userInfo .userAccount,
.userInfo .tweetUpdateAt,
.userInfo span {
  font-weight: 500;
  color: #657786;
  line-height: 22px;
}
.tweetContent {
  width: 100%;
  margin-bottom: 15px;
}
.tweetContent a {
  text-decoration: none;
}
.tweetContent p {
  margin: 0;
  font-weight: 500;
  font-size: 15px;
  word-wrap: break-word;
}
/* panel */
.panel {
  font-size: 13px;
  font-weight: normal;
}
.panel p {
  margin: 0;
  color: #657786;
}
.panel span {
  color: #ff6600;
}
/* myReply */
.myReply .input {
  width: 100%;
}
.myReply textarea,
.myReply input {
  border: none;
  width: 100%;
  resize: none;
}
/* footer */
.modal-footer {
  border-top: none;
}
.tweetButton .btn {
  min-width: 64px;
  height: 40px;
  background-color: #ff6600;
  color: #fff;
  border-radius: 100px;
  font-weight: 500;
  font-size: 18px;
}
</style>
