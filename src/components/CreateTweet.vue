<template>
  <div class="border">
    <form class="tweet-form border-top" @submit.prevent.stop="handleSubmit">
      <div class="d-flex">
        <img src="./../assets/Logo.png" alt="" />
        <textarea
          v-model="text"
          name="text"
          id="text"
          rows="3"
          :placeholder="currentUser.name | adjustAddTweetPlaceholder"
          class="flex-grow-1 pe-2"
          maxlength="140"
          required
        >
        </textarea>
      </div>
      
      <div class="submit d-flex mt-3 mb-2 pe-3">
        <div
          v-if="text.length > 140"
          class="warning-content"
        > 
          字數請勿超過140字！
        </div>
        <button 
          type="submit" 
          class="btn btn-primary ms-auto"
          :disabled="!text || text.length > 140"
        >推文</button>
      </div>
    </form>
  </div>
</template>

<script>
import { Toast } from './../utils/helpers'

export default {
  name: 'CreateTweet',
  props: {
    currentUser: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      text: '',
      comments: []
    }
  },
  methods: {
    handleSubmit() {
      if(!this.text.trim()) {
        Toast.fire({
          icon: 'error',
          title: '請填寫推文內容！'
        })
        this.text = ''
        return
      }
      if(this.text.length > 140) {
        Toast.fire({
          icon: 'warning',
          title: '推文內容請勿超過140字'
        })
        return
      }

      this.$emit('after-create-tweet', {
        text: this.text
      })
      this.text = ''

    }
  },
  filters: {
    adjustAddTweetPlaceholder(userName) {
      return `${userName}，有什麼新鮮事呢？`
    }
  }
}
</script>

<style scoped>

img {
  height: 50px;
  width: 50px;
}

.tweet-form {
  border-bottom: 10px solid #E6ECF0;
}

.tweet-form textarea {
  border: 0;
  resize: none;
  transform: translateY(10px);
}

.tweet-form textarea:focus {
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
  background: #FF6600;
  border: 0 solid #000;
  border-radius: 100px;
}
</style>