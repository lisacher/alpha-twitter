<template>
  <div class="container main-container">
    <div class="row">
      <SideNavBar class="col-3" />
      <div class="col-5 p-0 border main-component">
        <TopNavBar 
          :msg="User.name" 
          :show="true" 
          :tweetsCount="tweets.length" 
        />
        <div class="tweets-container">
          <TweetererImformation 
            :initial-user="User"
            @after-form-submit="afterFormSubmit"
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
      },
      tweets: [],
      modalContent : {}
    };
  },

  created() {
    const { id: userId } = this.$route.params
    this.fetchUser(userId);
  },
  methods: {
   async fetchUser(userId) {
     try {
       const { data } = await usersAPI.getUser({ userId })
       console.log('data', data);
       const { id, account, name, bio, avatar, cover, totalFollowers, totalFollowings, Tweets } = data
       this.User = {
         ...this.User,
         id,
         name,
         account,
         avatar,
         cover,
         bio,
         totalFollowers,
         totalFollowings
       }
       this.tweets = Tweets
       console.log(this.tweets.length);
     } catch(error) {
       Toast.fire({
         icon: 'error',
         title: '無法取得資料，請稍後再試。'
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