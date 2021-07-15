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
              ><img
                src="../assets/icon_close@2x.png"
                class="close-image"
                alt=""
            /></span>
          </button>
        </div>

        <div class="modal-body">
          <!-- tweet -->
          <div class="container replyTarget">
            <div class="avatar">
              <img :src="tweet.User.avatar | emptyImage" alt="" />
            </div>
            <div class="tweetInfo">
              <div class="userInfo">
                <p class="userName">
                  {{ tweet.User.name }}
                </p>
                <p class="userAccount">
                  {{ tweet.User.account }}
                </p>
                <span class="mx-1">&#xb7;</span>
                <p class="tweetUpdateAt">
                  {{ tweet.createdAt | fromNow }}
                </p>
              </div>
              <div class="tweetContent">
                <p>{{ tweet.description }}</p>
              </div>
              <div class="panel">
                <p>
                  回覆給
                  <span>{{ tweet.User.account }} </span>
                </p>
              </div>
            </div>
          </div>

          <!-- comment -->
          <div class="container myReply">
            <div class="avatar">
              <img :src="currentUser.avatar | emptyImage" alt="" />
            </div>
            <div class="tweetInfo">
              <div class="input">
                <textarea
                  id=""
                  name=""
                  cols="55"
                  rows="5"
                  autofocus
                  maxlength="140"
                  required
                  v-model="replyContent"
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
              :disabled="!replyContent || status.isProcessing "
              @click.stop.prevent="createReply(tweet.id)"
            >
              回覆
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { emptyImageFilter } from "../utils/mixins";
import { fromNowFilter } from "../utils/mixins";
import { Toast } from "../utils/helpers";
import tweetsAPI from "../apis/tweets";
import { mapState } from "vuex";

export default {
  name: "TweetReplyModal",
  mixins: [emptyImageFilter, fromNowFilter],
  props: {
    targetTweet: {
      type: Object,
      default: () => {
        return {
          id: -1,
          User: {
            id: -1,
            account: "",
            name: "",
            avatar: "",
          },
          description: "",
          totalLikes: 0,
          totalReplies: 0,
          createdAt: "",
          isLiked: false,
          Replies: {},
        };
      },
    },
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  data() {
    return {
      replyContent: "",
      tweet: {
        id: -1,
        User: {
          id: -1,
          account: "",
          name: "",
          image: "",
        },
        content: "",
        totalLikes: 0,
        totalReplies: 0,
        createdAt: "",
        isLiked: false,
        Replies: {},
      },
      status: {
        isProcessing: false
      }
    };
  },
  created() {
    this.fetchModalContent();
  },
  watch: {
    targetTweet() {
      this.fetchModalContent();
    },
  },
  methods: {
    async createReply(tweetId) {
      try {
        this.status.isProcessing = true
        const content = this.replyContent.trim();
        if (!content) {
          Toast.fire({
            icon: "error",
            title: "尚未輸入推文內容！",
          });
          this.replyContent = ''
          this.status.isProcessing = false
          return;
        }
        if (content.length > 140) {
          Toast.fire({
            icon: "error",
            title: "回覆字數不得超過 140 個字！",
          });
          this.status.isProcessing = false
          return;
        }
        const { data } = await tweetsAPI.createReply({ tweetId, content });
        console.log('data',data);

        if (data.status !== "success") {
          throw new Error(data.message);
        }

        this.$emit("after-create-reply", {
          id: data.message.id,
          content: this.replyContent,
          tweetId,
        });

        this.$emit('change-reply-count', this.tweet.id)

        //clear when finished
        this.replyContent = "";

        Toast.fire({
          icon: "success",
          title: "已完成回覆！",
        });
        this.status.isProcessing = false
        return;
      } catch (error) {
        this.status.isProcessing = false
        Toast.fire({
          icon: "error",
          title: "目前無法新增回應，請稍後再試",
        });
      }
    },
    fetchModalContent() {
      this.tweet = {
        ...this.tweet,
        ...this.targetTweet,
      };
    },
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  padding: 10px 15px;
  display: flex;
}
.modal-content {
  border-radius: 14px;
}
.close-image {
  width: 20px;
  height: 20px;
}
.modal-header {
  height: 54px;
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
  object-fit: cover;
  object-position: 50% 50%;
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
.input:focus,
textarea:focus {
  outline: none;
}
</style>
