<template>
  <div class="container main-container">
    <div class="row">
      <SideNavBar class="col-3" />
      <div class="col-5 p-0 border main-component">
        <TopNavBar :msg="User.name" :show="true" :total-tweets="User.totalTweets" />
        <div class="tweets-container">
          <TweetererImformation 
            :initial-user="User"
            @after-form-submit="afterFormSubmit"
          />
          <TwittererNavPills 
            :initial-id="User.id"
          />
          <TweetsCard
            v-for="like in likes"
            :key="like.id"
            :initial-data="like.Tweet"
            @after-click-modal="afterClickModal"
            @after-toggle-like="afterToggleLike"
          />
          <TweetReplyModal :target-tweet="modalContent" />
        </div>
      </div>
      <div class="col-4">
        <RecFollowingList />
      </div>
    </div>
  </div>
</template>

<script>
import SideNavBar from "./../components/SideNavBar.vue";
import RecFollowingList from "./../components/RecFollowingsList.vue";
import TopNavBar from "./../components/TopNavBar.vue";
import TweetsCard from "./../components/TweetsCard.vue";
import TweetererImformation from "./../components/TwittererInfomation.vue";
import TwittererNavPills from './../components/TwittererNavPills.vue'
import TweetReplyModal from "../components/TweetReplyModal.vue";

import usersAPI from './../apis/users'
import tweetsAPI from './../apis/tweets'
import { Toast } from './../utils/helpers'


export default {
  name: "UserProfileLikes",
  components: {
    SideNavBar,
    RecFollowingList,
    TopNavBar,
    TweetsCard,
    TweetererImformation,
    TwittererNavPills,
    TweetReplyModal
  },
  data() {
    return {
      User: {
        id: -1,
        name: "",
        account: "",
        avatar: "",
        cover: "",
        bio: "",
        followingsCounts: 0,
        followersCounts: 0,
        totalTweets: 0
      },
      likes: [],
      modalContent: {},
    };
  },

  created() {
    const { id: userId } = this.$route.params
    this.fetchUser(userId);
    this.fetchLikes(userId)
  },
  beforeRouteUpdate (to ,from, next) {
    const { id: userId } = to.params
    this.fetchUser(userId)
    this.fetchLikes(userId)
    next()
  },
  methods: {
    async fetchUser(userId) {
     try {
       const { data } = await usersAPI.getUser({ userId })
       const { id, account, name, bio, avatar, cover, totalFollowers, totalFollowings, totalTweets } = data
       this.User = {
         ...this.User,
         id,
         name,
         account,
         avatar,
         cover,
         bio,
         totalFollowers,
         totalFollowings,
         totalTweets
       }
     } catch(error) {
       Toast.fire({
         icon: 'error',
         title: '無法取得資料，請稍後再試。'
       })
     }
    },
    async fetchLikes(userId) {
      try {
        const { data } = await tweetsAPI.getUserLikes({ userId })

        // 篩除dummyData中，Tweet欄位為Null的資料(會導致渲染不出畫面，先篩掉)
        data.map(like => {
          if(!like.Tweet) {
            return
          }
          this.likes.push({
            ...like,
          })
        })

        this.likes.sort((a, b) => {
          const aDate = new Date(a.Tweet.createdAt)
          const bDate = new Date(b.Tweet.createdAt)
          return bDate.getTime() - aDate.getTime()
        })


      } catch(error) {
        Toast.fire({
          icon: 'error',
          title: '無法取得喜歡的內容，請稍後再試。'
        })
      }
    },
    afterFormSubmit(formData) {
      for (let [name, value] of formData.entries()) {
        console.log(name + ": " + value);
      }
    },
    afterClickModal(data) {
      this.modalContent = {
        ...this.modalContent,
        ...data,
      };
    },
    afterToggleLike() {
      this.likes = this.likes.filter(like => like.Tweet.isLiked === 1)
    }
  },
};
</script>

<style scoped>
.main-container {
  height: 100%;
  position: relative;
}

.main-component {
  height: 100%;
}

.tweets-container {
  height: calc(100% - 50px);
  overflow: scroll;
}

.row {
  height: 100%;
}
</style>