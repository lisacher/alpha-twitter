<template>
  <div class="container main-container">
    <div class="row">
      <SideNavBar class="col-3 border-end" />

      <!-- ReplyDetail -->
      <div class="col-5 p-0 main-container">
        <TopNavBar msg="推文" :show="true" />
        <!-- Tweet Detail -->
        <Spinner v-if="isLoading" />
        <template v-else>
        <div class="tweets-container">
          <TweetContent
            :tweet="tweet"
            @after-click-modal="afterClickModal" 
          />
          <!-- ReplyDetailList -->
          <div class="noTweets" v-if="replies.length < 1">
            推文還沒有人回覆哦！
          </div>
          <TweetsCard
            v-for="reply in replies"
            :key="reply.id"
            :initial-data="reply"
            :replyTweet="tweet"
            @after-click-modal="afterClickModal"
          />
          <TweetReplyModal :target-tweet="modalContent"
          :replyTweet="tweet"
          @after-create-reply="afterCreateReply"/>
        </div>
      </template>
      </div>
      <div class="col-4 border-start">
        <RecFollowingList />
      </div>
    </div>
  </div>
</template>

<script>
import SideNavBar from "./../components/SideNavBar.vue";
import TopNavBar from "./../components/TopNavBar.vue";
import RecFollowingList from "./../components/RecFollowingsList.vue";
import TweetContent from "./../components/TweetContent.vue";
import TweetsCard from "../components/TweetsCard.vue";
import TweetReplyModal from "../components/TweetReplyModal.vue";

import tweetsAPI from './../apis/tweets'
import { Toast } from './../utils/helpers'
import { mapState } from 'vuex'
import Spinner from '../components/Spinner.vue';

export default {
  name: "Tweet",
  components: {
    SideNavBar,
    TopNavBar,
    RecFollowingList,
    TweetContent,
    TweetsCard,
    TweetReplyModal,
    Spinner,
  },
  data() {
    return {
      tweet: {
        id: -1,
        User: '',
        description: '',
        createdAt: '',
        totalReplies: 0,
        totalLikes: 0,
        isLiked: 0
      },
      replies: [],
      modalContent: {},
      isLoading: true
    };
  },
  created() {
    const { id: tweetId } = this.$route.params
    this.fetchTweet(tweetId)
  },
  computed: {
    ...mapState(['currentUser'])
  },
  methods: {
    async fetchTweet(tweetId) {
      try {
        const { data } = await tweetsAPI.getTweet({ tweetId })
        //TODO: 請後端在 Replies中 加入totalReplies資料
        const { id, User, description, createdAt, totalReplies, totalLikes, isLiked, Replies } = data

        this.tweet = {
          ...this.tweet,
          id,
          User,
          description,
          createdAt,
          totalReplies,
          totalLikes,
          isLiked
        }
        this.replies = Replies
        
        this.replies.sort((a, b) => {
          const aDate = new Date(a.createdAt)
          const bDate = new Date(b.createdAt)
          return bDate.getTime() - aDate.getTime()
        })
        this.isLoading = false
      } catch(error) {
        this.isLoading = false
        Toast.fire({
          icon: 'error',
          title: '無法取得推文資料，請稍後再試。'
        })
      }

    },
    afterClickModal(data) {
      this.modalContent = {
        ...this.modalContent,
        ...data,
      };
    },
    afterCreateReply ({ content, id }) {
        this.replies.unshift({
          ...this.replies,
          id,
          User: {
            id: this.currentUser.id,
            name: this.currentUser.name,
            account: this.currentUser.account,
            avatar: this.currentUser.avatar
          },
          content,
          createdAt: new Date(),
          totalLikes: 0,
          totalReplies: 0,
          isLiked: false
        })
        this.tweet.totalReplies += 1
      }
    }
};
</script>

<style scoped>
.main-container {
  height: 100%;
}

.row {
  height: 100%;
}

.tweets-container {
  overflow: scroll;
  height: calc(100% - 50px);
}

.noTweets {
  text-align: center;
  margin: 50px;
  font-size: 13px;
  color: #657786;
}
</style>
