<template>
  <div class="container main-container">
    <div class="row">
      <SideNavBar class="col-3" />
      <div class="col-5 p-0 border main-component">
        <TopNavBar 
          :msg="User.name" 
          :show="true" 
          :totalTweets="User.totalTweets" 
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
          <div class="noTweets" v-if="replies.length < 1">
            此用戶暫無推文與回覆
          </div>
          <TweetandReply
            v-for="reply in replies"
            :key="reply.id"
            :initial-data="reply"
            @after-click-modal="afterClickModal"
          />
          <TweetReplyModal :target-tweet="modalContent"
          @after-create-reply="afterCreateReply"
          @change-reply-count="changeReplyCount"/>
          </template>
        </div>
      </div>
      <div class="col-4">
        <Spinner v-if="isLoading" />
        <template v-else>
        <RecFollowingList 
          @after-add-follow="afterAddFollow"
          @after-delete-follow="afterDeleteFollow"
          :remove-follow-id="removeFollowId"
          :add-follow-id="addFollowId"
        />
        </template>
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
import TweetReplyModal from "../components/TweetReplyModal.vue";

import tweetsAPI from '../apis/tweets'
import usersAPI from '../apis/users'
import { Toast } from './../utils/helpers'

import { mapState } from 'vuex'
import Spinner from '../components/Spinner.vue';


export default {
  name: "UserProfileReply",
  components: {
    SideNavBar,
    RecFollowingList,
    TopNavBar,
    TweetandReply,
    TweetererImformation,
    TwittererNavPills,
    Spinner,
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
        isFollowing: 0,
      },
      replies: [],
      removeFollowId: 0,
      addFollowId: 0,
      isLoading: true,
      modalContent: {},
    };
  },
  created() {
    const { id: userId } = this.$route.params
    this.fetchUser(userId)
    this.fetchReplies(userId)
  },
  beforeRouteUpdate (to ,from, next) {
    const { id: userId } = to.params
    this.fetchUser(userId)
    this.fetchReplies(userId)
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
    async fetchReplies(userId) {
      try {
        const { data } = await tweetsAPI.getReply({ userId })

        if(data.message === '使用者沒有回覆任何推文') {
          return
       }
        this.replies = data

        // 排序
        this.replies.sort((a, b) => {
          const aDate = new Date(a.createdAt)
          const bDate = new Date(b.createdAt)
          return bDate.getTime() - aDate.getTime()
        })
        this.isLoading = false
      } catch(error) {
        this.isLoading = false
        Toast.fire({
          icon:'error',
          title:'目前無法顯示回應，請稍後再試'
        })
      }
      
    },
    async afterFormSubmit() {
      const { id: userId } = this.$route.params
      await this.fetchUser(userId);
      this.replies.map(reply => {
        if(reply.User.id === userId) {
          reply.User = {
            ...reply.User,
            ...this.User
          }
        }
        reply.Replies.map(innerReply => {
          if(innerReply.User.id === userId) {
            innerReply.User = {
              ...innerReply,
              ...this.User
            }
          }
        })

      })
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
    afterClickModal(data) {
      this.modalContent = {
        ...this.modalContent,
        ...data,
      };
    },
    afterCreateReply () {
        this.data.User.totalLikes += 1;
    },
    changeReplyCount(tweetId) {
      this.replies.map(reply => {
        if(reply.id === tweetId) {
          reply.totalReplies += 1
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