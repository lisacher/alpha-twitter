<template>
  <div class="border">
    <form
      class="tweet-form border-top"
      @submit.prevent.stop="handleSubmit"
      :class="{ warningBackground: description.length > 140 }"
    >
      <div class="d-flex">
        <img src="./../assets/Logo.png" alt="" />
        <textarea
          v-model="description"
          name="text"
          id="text"
          rows="3"
          :placeholder="currentUser.name | adjustAddTweetPlaceholder"
          class="flex-grow-1 pe-2"
          :class="{ warningBackground: description.length > 140 }"
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
</template>

<script>
import tweetsAPI from "./../apis/tweets";
import { Toast } from "./../utils/helpers";

export default {
  name: "CreateTweet",
  props: {
    currentUser: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      description: "",
      comments: [],
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
img {
  height: 50px;
  width: 50px;
}

.tweet-form {
  border-bottom: 10px solid #e6ecf0;
}

.tweet-form textarea {
  border: 0;
  resize: none;
  transform: translateY(10px);
}

.tweet-form textarea:focus {
  outline: 0;
}

.warningBackground {
  background-color: #ffeff4;
}

.submit {
  border-top: 0;
}

.warning-content {
  line-height: 36px;
  color: #e0245e;
  font-weight: 700;
  padding-left: 50px;
}

.submit button {
  background: #ff6600;
  border: 0 solid #000;
  border-radius: 100px;
}
</style>