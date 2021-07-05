<template>
  <div class="d-flex">
    <div class="img-container">
      <img src="./../assets/Logo.png" alt="">
    </div>
    <div class="text-container flex-grow-1">
      <div class="header">
        <div class="name d-inline-block pe-2">{{tweet.User.name}}</div>
        <div class="account d-inline-block pe-2">{{tweet.User.account}}</div>
        <div class="createdAt d-inline-block">{{tweet.createdAt}}</div>
      </div>
      <div class="body tweet-content">
        {{tweet.text}}
      </div>
      <div class="footer d-flex">
        <div class="comment d-flex align-items-center me-5">
          <div class="btn comment-img"></div>
          <div class="comments-count">123</div>
        </div>
        <div class="liked d-flex align-items-center">
          <div 
            class="btn liked-img"
            :class="{activeLiked: tweet.isLiked}"
          ></div>
          <div class="likes-count">223</div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'TweetsCard',
  data() {
    return {
      tweet: {
        User: {
          id:-1,
          name: 'Teddy',
          account: 'teddy0323',
          image: './../assets/Logo.png'
        },
        text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia architecto hic, optio aut enim exercitationem blanditiis libero, assumenda quos cupiditate quae, eligendi pariatur sit tenetur eveniet at voluptatibus. Quo, cumque.',
        createdAt: new Date(),
        isLiked: true
      }
    }
  },

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