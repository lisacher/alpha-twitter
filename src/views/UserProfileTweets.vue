<template>
  <div class="container main-container">
    <div class="row">
      <SideNavBar 
        class="col-3" 
        @after-create-tweet="afterCreateTweet"
      />
      <div class="col-5 p-0 border main-component">
        <TopNavBar 
          :msg="User.name" 
          :show="true" 
          :total-tweets="User.totalTweets" 
        />
        <div class="tweets-container">
          <TweetererImformation 
            :initial-user="User"
            @after-form-submit="afterFormSubmit"
            @after-delete-follow-main="afterDeleteFollowMain"
            @after-add-follow-main="afterAddFollowMain"
          />
          <TwittererNavPills 
            :initial-id="User.id"
          />
          <TweetsCard
            v-for="tweet in tweets"
            :key="tweet.id"
            :initial-data="tweet"
            @after-click-modal="afterClickModal"
          />
          <TweetReplyModal :target-tweet="modalContent" />
        </div>
      </div>
      <div class="col-4">
        <RecFollowingList 
          @after-add-follow="afterAddFollow"
          @after-delete-follow="afterDeleteFollow"
          :remove-follow-id="removeFollowId"
          :add-follow-id="addFollowId"
        />
      </div>
    </div>
  </div>
</template>

<script>
// import component 
import SideNavBar from "./../components/SideNavBar.vue";
import RecFollowingList from "./../components/RecFollowingsList.vue";
import TopNavBar from "./../components/TopNavBar.vue";
import TweetsCard from "./../components/TweetsCard.vue";
import TweetererImformation from "./../components/TwittererInfomation.vue";
import TwittererNavPills from './../components/TwittererNavPills.vue'
import TweetReplyModal from "../components/TweetReplyModal.vue";

// import currentUser
import { mapState } from 'vuex'

// import API
import usersAPI from './../apis/users'
import tweetsAPI from './../apis/tweets'
import { Toast } from './../utils/helpers'



export default {
  name: "UserProfileTweets",
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
        totalFollowings: 0,
        totalFollowers: 0,
        totalTweets: 0,
        isFollowing: 0
      },
      tweets: [],
      modalContent : {},
      removeFollowId: 0,
      addFollowId: 0
    };
  },

  created() {
    const { id: userId } = this.$route.params
    this.fetchUser(userId);
    this.fetchUserTweet(userId)
  },
  beforeRouteUpdate (to ,from, next) {
    const { id: userId } = to.params
    this.fetchUser(userId)
    this.fetchUserTweet(userId)
    next()
  },
  computed: {
    ...mapState(['currentUser'])
  },
  methods: {
   async fetchUser(userId) {
     try {
       const { data } = await usersAPI.getUser({ userId })

       const { id, account, name, bio, avatar, cover, totalFollowers, totalFollowings, totalTweets, isFollowing } = data
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
         totalTweets,
         isFollowing
       }
     } catch(error) {
       Toast.fire({
         icon: 'error',
         title: '無法取得資料，請稍後再試。'
       })
     }
    },
    async fetchUserTweet(userId) {
      try{
        const { data } = await tweetsAPI.getUsersTweets({ userId })
        this.tweets = data

        this.tweets.sort((a, b) => {
          const aDate = new Date(a.createdAt)
          const bDate = new Date(b.createdAt)
          return bDate.getTime() - aDate.getTime()
        })

      } catch(error) {
        Toast.fire({
          icon: 'error',
          title: '目前無法取得資料，請稍後再試'
        })
      }
    },
    afterCreateTweet({ description, id }) {
      if(this.User.id !== this.currentUser.id) {
        return
      }
      this.tweets.unshift({
        id,
        User: {
          id: this.currentUser.id,
          name: this.currentUser.name,
          account: this.currentUser.account,
          avatar: this.currentUser.avatar

        },
        description,
        createdAt: new Date(),
        isLiked: false,
        totalLikes: 0,
        totalReplies: 0
      })
    },
    afterFormSubmit() {
      const { id: userId } = this.$route.params
      this.fetchUser(userId);
    },
    afterClickModal(data) {
      this.modalContent = {
        ...this.modalContent,
        ...data,
      };
    },
    afterAddFollow(userId) {
      // 在我自己以外的別人的主頁時：
      if(this.User.id === userId) {
        this.User.totalFollowers += 1
        this.User.isFollowing = 1
        return
      }
      // 在我自己的主頁時。
      if(this.currentUser.id === this.User.id) {
        this.User.totalFollowings += 1
        return
      }
      return
    },
    afterAddFollowMain(userId) {
      this.addFollowId = userId
    },
    afterDeleteFollow(userId) {
      // 當從右側點選的使用者與當前頁面的使用者相同時：
      if(this.User.id === userId) {
        this.User.totalFollowers -= 1
        this.User.isFollowing = 0
        return
      }
      // 在我自己的主頁時。
      if(this.currentUser.id === this.User.id) {
        this.User.totalFollowings -= 1
        return
      }
      return
    },
    afterDeleteFollowMain(userId) {
      this.removeFollowId = userId
    }
  },
};
</script>

<style scoped>
.main-container {
  height: 100%;
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