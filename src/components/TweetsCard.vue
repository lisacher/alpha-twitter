<template>
  <div class="d-flex border">
    <div class="img-container">
      <img src="./../assets/Logo.png" alt="">
    </div>
    <div class="text-container mt-2 flex-grow-1">
      <div class="header">
        <div class="name d-inline-block pe-2">{{data.User.name}}</div>
        <div class="account d-inline-block">@{{data.User.account}}</div>
        <div class="createdAt d-inline-block">・{{data.createdAt | fromNow }}</div>
      </div>
      <div class="body">
        <div v-if="repliedTo" class="replied-to mt-1">
          回覆 <span>@{{repliedTo}}</span>
        </div>
        <div class="text">
          {{data.text}}
        </div>
      </div>
      <div class="footer d-flex my-2">
        <div class="comment d-flex align-items-center me-5">
          <div class="btn comment-img"></div>
          <div class="comments-count">{{data.repliesCount}}</div>
        </div>
        <div class="liked d-flex align-items-center">
          <div 
            class="btn liked-img"
            :class="{activeLiked: data.isLiked}"
            @click.prevent.stop="toggleLiked"
          ></div>
          <div class="likes-count">{{data.likesCount}}</div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  name: 'TweetsCard',
  props: {
    data: {
      type: Object,
      required: true
    },
    repliedTo: {
      type: String,
      default: '',
    }
  },
  methods: {
    toggleLiked() {
      this.tweet.isLiked = !this.tweet.isLiked
    },

  },
  filters: {
      fromNow (time) {
        const now = new Date()
        if(now - time < 86400000) {
          return moment(time).fromNow() 
        }
        return moment(time).format('MMM Do')
      }
    }

}
</script>

<style scoped>
  .img-container img {
    height: 50px;
    width: 50px;
  }

  .comment-img {
    background-image: url(./../assets/comment.png);
    height: 12px;
    width: 12px;
    background-size: contain;
    background-repeat: no-repeat;
  }

  .header, .body{
    font-size: 15px;
  }

  .account, .createdAt, .footer, .replied-to {
    color:#657786 ;
  }

  .replied-to span {
    color: #FF6600;
  }

  .footer {
    font-size: 13px;
  }

  .comment, .liked {
    width: 50px;
  }

  .liked-img {
    background-image: url(./../assets/isLiked.png);
    height: 12px;
    width: 12px;
    background-size: contain;
    background-repeat: no-repeat;
  }

  .activeLiked {
    background-image: url(./../assets/isLiked-active.png);
  }

</style>