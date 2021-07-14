<template>
  <div class="container main-container">
    <div class="row">
      <SideNavBar 
        class="col-3" 
        @after-create-tweet="afterCreateTweet"
      />
      <div class="col-5 p-0 border main-component">
        <TopNavBar msg="首頁" :show="false" />
        <div class="tweets-container">
          <CreateTweet 
            :current-user="currentUser" 
            @after-create-tweet="afterCreateTweet"
          />
          <TweetsCard 
            v-for="tweet in tweets" 
            :key="tweet.id" 
            :initial-data="tweet" 
            @after-click-modal="afterClickModal"
          />
          <TweetReplyModal 
          :target-tweet="modalContent" 
          @change-reply-count="changeReplyCount"/>
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
import CreateTweet from "../components/CreateTweet.vue";
import TweetsCard from "./../components/TweetsCard.vue";
import TweetReplyModal from './../components/TweetReplyModal.vue'

import tweetsAPI from './../apis/tweets'
import { Toast } from './../utils/helpers'
import { mapState } from 'vuex'



export default {
  name: "main-tweets",
  components: {
    SideNavBar,
    RecFollowingList,
    TopNavBar,
    CreateTweet,
    TweetsCard,
    TweetReplyModal
  },
  data() {
    return {
      tweets: [],
      modalContent: {},
    };
  },

  created() {
    this.fetchTweets();
  },
  computed: {
    ...mapState(['currentUser'])
  },
  methods: {
    async fetchTweets() {
      try {
        const { data } = await tweetsAPI.getTweets()


        this.tweets = data

        this.tweets.sort((a, b) => {
          const aDate = new Date(a.createdAt)
          const bDate = new Date(b.createdAt)
          return bDate.getTime() - aDate.getTime()
        })
      } catch(error) {
        Toast.fire({
          icon: 'error',
          title: '目前無法取得推文資料，請稍後再試'
        })
      }

      
    },
    afterCreateTweet({ description, id }) {
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
    afterClickModal(data) {
      this.modalContent = {
        ...this.modalContent,
        ...data,
      };
    },
    changeReplyCount(tweetId) {
      this.tweets.map(tweet => {
        if(tweet.id === tweetId) {
          tweet.totalReplies += 1
        }
      })
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