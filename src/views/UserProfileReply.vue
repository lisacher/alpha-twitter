<template>
  <div class="container main-container">
    <div class="row">
      <SideNavBar class="col-3" />
      <div class="col-5 p-0 border main-component">
        <TopNavBar :msg="User.name" :show="true" :tweetsCount="User.tweetsCount" />
        <div class="tweets-container">
          <TweetererImformation 
            :initial-user="User"
            @after-form-submit="afterFormSubmit"
          />
          <TwittererNavPills 
            :initial-id="User.id"
          />
          <TweetandReply
            v-for="reply in replies"
            :key="reply.id"
            :initial-data="reply"
          />
        </div>
      </div>
      <div class="col-4">
        <RecFollowingList />
      </div>
    </div>
  </div>
</template>

<script>
import SideNavBar from "../components/SideNavBar.vue";
import RecFollowingList from "../components/RecFollowingsList.vue";
import TopNavBar from "../components/TopNavBar.vue";
import TweetererImformation from "../components/TwittererInfomation.vue";
import TwittererNavPills from '../components/TwittererNavPills.vue'
import TweetandReply from '../components/TweetandReply.vue'

import tweetsAPI from '../apis/tweets'
import usersAPI from '../apis/users'
import { Toast } from './../utils/helpers'

import { mapState } from 'vuex'


export default {
  name: "UserProfileReply",
  components: {
    SideNavBar,
    RecFollowingList,
    TopNavBar,
    TweetandReply,
    TweetererImformation,
    TwittererNavPills
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
        totalTweets: 0
      },
      replies: [],
    };
  },
  created() {
    const { id: userId } = this.$route.params
    this.fetchUser(userId)
    this.fetchReplies(userId)
  },
  computed: {
    ...mapState(['currentUser'])
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
         totalTweets,
       }
     } catch(error) {
       Toast.fire({
         icon: 'error',
         title: '無法取得資料，請稍後再試。'
       })
     }
    },
    async fetchReplies(userId) {
      try {
        const { data } = await tweetsAPI.getReply({ userId })
        console.log('data', data);
        this.replies = data

        this.replies.sort((a, b) => {
          const aDate = new Date(a.createdAt)
          const bDate = new Date(b.createdAt)
          return bDate.getTime() - aDate.getTime()
        })
      } catch(error) {
        Toast.fire({
          icon:'error',
          title:'目前無法顯示回應，請稍後再試'
        })
      }
      
    },
    afterFormSubmit(formData) {
      for (let [name, value] of formData.entries()) {
        console.log(name + ": " + value);
      }
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