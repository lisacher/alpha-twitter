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
    <!-- Modal -->
    <div
      class="modal fade"
      id="deleteModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <div>您確定要刪除此則推文嗎？</div>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body text-center">推文刪除後將無法復原</div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              取消
            </button>
            <button
              type="button"
              class="btn btn-danger"
              data-bs-toggle="modal"
              data-bs-target="#deleteModal"
              @click.prevent.stop="deleteTweet"
            >
              確定
            </button>
          </div>
        </div>
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
  data() {
    return {
      deleteTarget: 0,
    };
  },
  methods: {
    generatedeleteTarger(id) {
      this.deleteTarget = id;
    },
    deleteTweet() {
      const targetId = this.deleteTarget;
      this.tweets = this.tweets.filter((tweet) => tweet.id !== targetId);
    },
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
.modal-header {
  font-size: 16px;
  font-weight: 700;
}

.modal-body {
  height: 150px;
  line-height: 118px;
  font-size: 18px;
  font-weight: 700;
  color: red;
}
</style>