<template>
  <div>
    <form class="tweet-form border-top" @submit.prevent.stop="handleSubmit">
      <div class="d-flex">
        <img src="./../assets/Logo.png" alt="" />
        <textarea
          v-model="text"
          name=""
          id=""
          cols="50"
          rows="1"
          :placeholder="currentUser.name | adjustAddTweetPlaceholder"
        >
        </textarea>
      </div>
      <div class="submit d-flex justify-content-end mt-3 mb-2 pe-3">
        <button type="submit" class="btn btn-primary">推文</button>
      </div>
    </form>
  </div>
</template>

<script>
import {v4 as uuidv4} from 'uuid'

export default {
  name: 'TweetContent',
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
      if(!this.text) {
        return
      }
      this.comments.push({
        id: uuidv4(),
        User: {
          id: this.currentUser.id,
          name: this.currentUser.name,
          account: this.currentUser.account,
          image: this.currentUser.image
        },
        text: this.text,
        createdAt: new Date()
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

.submit button {
  background: #FF6600;
  border: 0 solid #000;
  border-radius: 100px;
}
</style>