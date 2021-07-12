<template>
  <div>
    <div
      class="d-flex border tweet-container px-2"
    >
      <div class="img-container">
        <img src="./../assets/Logo.png" alt="" />
      </div>
      <div class="text-container mt-2 flex-grow-1">
        <div class="header">
          <div class="name d-inline-block pe-2 fw-bold">
            {{ tweet.User.name }}
          </div>
          <div class="account d-inline-block">{{ tweet.User.account }}</div>
          <div class="createdAt d-inline-block">
            ・{{ tweet.createdAt | fromNow }}
          </div>
        </div>
        <div class="body">
          <div class="text">
            {{ tweet.description | textEllipsis }}
          </div>
        </div>
      </div>
      <div class="delete-container">
        <button
          type="button"
          class="btn btn-close mt-2"
          data-bs-toggle="modal"
          data-bs-target="#deleteModal"
          @click.prevent.stop="generatedeleteTarger(tweet.id)"
        ></button>
      </div>
    </div>
  </div>
</template>

<script>
import { daytimeFilter } from "./../utils/mixins";


export default {
  name: "AdminTweetsCard",
  mixins: [daytimeFilter],
  props: {
    tweet: {
      type: Object,
      required: true
    }
  },
  methods: {
    generatedeleteTarger(id) {
      this.$emit('after-generate-target', { tweetId: id })
    }
  },
  filters: {
    textEllipsis(text) {
      const strictLength = 50
      if(text.length <= strictLength) {
        return text
      }
      return text.substring(0, strictLength ) + '...'
    }
  }
};
</script>

<style scoped>
.tweet-container {
  height: 110px;
}

.img-container img {
  height: 50px;
  width: 50px;
}

.header,
.body {
  font-size: 15px;
}

.account,
.createdAt {
  color: #657786;
}
</style>