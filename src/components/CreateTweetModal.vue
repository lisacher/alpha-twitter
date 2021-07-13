<template>
  <div class="d-grid gap-2">
    <button
      class="btn tweet-button"
      type="button"
      data-bs-toggle="modal"
      data-bs-target="#tweetModal"
    >
      推文
    </button>
    <div
      class="modal fade"
      id="tweetModal"
      tabindex="-1"
      aria-labelledby="tweet-modal"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header py-2">
            <button
              type="button"
              class="btn close-btn p-0"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <img src="./../assets/icon_close@2x.png" alt="" />
            </button>
          </div>
          <form class="modal-body" @submit.prevent.stop="handleSubmit">
            <div class="d-flex">
              <img src="./../assets/Logo.png" alt="" />
              <textarea
                v-model="description"
                name="description"
                id="descriptionModal"
                rows="6"
                :placeholder="currentUser.name | adjustAddTweetPlaceholder"
                class="flex-grow-1 pe-2"
                maxlength="140"
                required
              >
              </textarea>
            </div>
            <div class="submit d-flex mt-3 mb-2 pe-3">
              <div v-if="description.length > 140" class="warning-content">
                字數請勿超過140字！
              </div>
              <button
                type="submit"
                class="btn btn-primary ms-auto"
                :disabled="!description || description.length > 140"
              >
                推文
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from '../utils/helpers'
import tweetsAPI from './../apis/tweets'

export default {
  name: "CreatedTweetModal",
  props: {
    currentUser: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      description: "",
    };
  },
  methods: {
    async handleSubmit() {
      //篩掉都是空白鍵的內容
      try {
        if (!this.description.trim()) {
          Toast.fire({
            icon: "error",
            title: "請填寫推文內容！",
          });
          this.description = "";
          return;
        }
        //文字數量過長，跳出提示，阻止送出。
        if (this.description.length > 140) {
          Toast.fire({
            icon: "warning",
            title: "推文內容請勿超過140字",
          });
          return;
        }

        const { data } = await tweetsAPI.createTweet({
          User: this.currentUser,
          description: this.description,
        });

        if(data.status !== 'success') {
          throw new Error(data.message)
        }

        this.$emit("after-create-tweet", {
          description: this.description,
          id: data.message.id
        });

        this.description = "";

        Toast.fire({
          icon: 'success',
          title: '推文成功！'
        })
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法推文，請稍後再試",
        });
      }
    },
  },
  filters: {
    adjustAddTweetPlaceholder(userName) {
      return `${userName}，有什麼新鮮事呢？`;
    },
  },
};
</script>

<style scoped>
button.tweet-button {
  background: #ff6600;
  color: #fff;
  border-radius: 100px;
  font-size: 18px;
  margin-left: 20px;
}

.modal-content {
  border-radius: 14px;
  border: 0;
}

.modal-header img {
  height: 15px;
  width: 15px;
}

.modal-body {
  padding-top: 15px;
}

form img {
  width: 50px;
  height: 50px;
}

.modal-body textarea {
  border: 0;
  resize: none;
  transform: translateY(10px);
}

.modal-body textarea:focus {
  outline: 0;
}

.submit {
  border-top: 0;
}

.warning-content {
  line-height: 36px;
  color: red;
  font-weight: 700;
  padding-left: 50px;
}

.submit button {
  background: #ff6600;
  border: 0 solid #000;
  border-radius: 100px;
}
</style>