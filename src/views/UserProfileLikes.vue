<template>
  <div class="container main-container">
    <div class="row">
      <SideNavBar class="col-3" />
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
          <Spinner v-if="isLoading" />
          <template v-else>
            <div class="noTweets" v-if="likes.length < 1">
              此用戶暫無喜歡的內容
            </div>
            <TweetsCard
              v-for="like in likes"
              :key="like.id"
              :initial-data="like.data"
              :reply-tweet="like.data.TweetId"
              @after-click-modal="afterClickModal"
              @after-toggle-like="afterToggleLike"
            />
            <TweetReplyModal 
              :target-tweet="modalContent" 
              @change-reply-count="changeReplyCount"
            />
          </template>
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
import SideNavBar from "./../components/SideNavBar.vue";
import RecFollowingList from "./../components/RecFollowingsList.vue";
import TopNavBar from "./../components/TopNavBar.vue";
import TweetsCard from "./../components/TweetsCard.vue";
import TweetererImformation from "./../components/TwittererInfomation.vue";
import TwittererNavPills from './../components/TwittererNavPills.vue'
import TweetReplyModal from "../components/TweetReplyModal.vue";

import { mapState } from 'vuex'

import usersAPI from './../apis/users'
import tweetsAPI from './../apis/tweets'
import { Toast } from './../utils/helpers'
import Spinner from '../components/Spinner.vue';


export default {
  name: "UserProfileLikes",
  components: {
    SideNavBar,
    RecFollowingList,
    TopNavBar,
    TweetsCard,
    TweetererImformation,
    TwittererNavPills,
    TweetReplyModal,
    Spinner
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
      removeFollowId: 0,
      addFollowId: 0,
      isLoading: true
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
       this.isLoading = false
     } catch(error) {
       this.isLoading = false
       Toast.fire({
         icon: 'error',
         title: '無法取得資料，請稍後再試。'
       })
     }
    },
    async fetchLikes(userId) {
      try {
        const { data } = await tweetsAPI.getUserLikes({ userId })
        if(data.message === '使用者沒有喜歡的推文或回覆') {
          this.likes = []
          return
        }
        // 先只抓喜歡的推文

        data.map(like => {
          // 抓出喜歡的推文
          if(like.Tweet) {
            this.likes.push({
              id: like.id,
              createdAt:like.createdAt,
              data: like.Tweet
            })
            return
            // 抓出喜歡的回覆
          } else if(like.Reply) {
            this.likes.push({
              id: like.id,
              createdAt:like.createdAt,
              data: like.Reply
            })
            return
          } 
        })

        this.likes.sort((a, b) => {
          const aDate = new Date(a.createdAt)
          const bDate = new Date(b.createdAt)
          return bDate.getTime() - aDate.getTime()
        })
      } catch(error) {
        Toast.fire({
          icon: 'error',
          title: '無法取得喜歡的內容，請稍後再試。'
        })
      }
    },
    async afterFormSubmit() {
      const { id: userId } = this.$route.params
      await this.fetchUser(userId);
      this.likes.map(like => {
        if(like.Tweet.User.id === this.User.id) {
          like.Tweet.User = {
            ...like.User,
            ...this.User
          }
        }
      })
    },

    afterClickModal(data) {
      this.modalContent = {
        ...this.modalContent,
        ...data,
      };
    },
    afterToggleLike() {
      // 只有在我自己的頁面才執行
      if(this.User.id === this.currentUser.id) {
        this.likes = this.likes.filter(like => like.data.isLiked === 1)
      }
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
    },
    changeReplyCount(tweetId) {
      this.likes.map(like => {
        if(like.Tweet.id === tweetId) {
          like.Tweet.totalReplies += 1
        }
      })
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

.noTweets {
  text-align: center;
  margin: 50px;
  font-size: 13px;
  color: #657786;
}
</style>