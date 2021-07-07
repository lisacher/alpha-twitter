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
                v-model="text"
                name=""
                id=""
                cols="50"
                rows="5"
                :placeholder="currentUser.name | adjustAddTweetPlaceholder"
                maxlength="140"
              >
              </textarea>
            </div>
            <div class="modal-footer">
              <button 
                type="submit" 
                class="btn btn-primary"
                :disabled="!text"
              >推文</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {v4 as uuidv4} from 'uuid'


export default {
  name: 'AddTweetCard',
  props: {
    currentUser : {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      text: '',
    }
  },
  methods: {
     handleSubmit() {
      if(!this.text) {
        return
      }

      // TODO: 串接API儲存留言

      this.$emit('after-create-tweet',{
        id: uuidv4(),
        text: this.text,

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

.modal-footer {
  border-top: 0;
}

.modal-footer button {
  background: #FF6600;
  border: 0 solid #000;
  border-radius: 100px;
}
</style>