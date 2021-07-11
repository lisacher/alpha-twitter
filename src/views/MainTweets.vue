<template>
  <div class="container main-container">
    <div class="row">
      <SideNavBar 
        class="col-3" 
      />
      <div class="col-5 p-0 border main-component">
        <TopNavBar msg="首頁" :show="false" :tweetsCount="0" />
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
import { v4 as uuidv4 } from 'uuid'

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
    afterCreateTweet({ text }) {
      this.tweets.unshift({
        id: uuidv4(),
        User: {
          id: this.currentUser.id,
          name: this.currentUser.name,
          account: this.currentUser.account,
          image: this.currentUser.image

        },
        text,
        createdAt: new Date(),
        isLiked: false,
        likesCount: 0,
        repliesCount: 0
      })
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