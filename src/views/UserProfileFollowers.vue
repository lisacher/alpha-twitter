<template>
    <div class="container main-container">
        <div class="row">
            <SideNavBar 
            class="col-3 border-end"/>

            <!-- ReplyDetail -->
            <div class="col-5 p-0 main-container">
                <TopNavBar 
                  :msg="User.name"
                  :show="true"
                  :total-tweets="User.totalTweets" 
                  class="border-bottom-0"
                />
                <TwittererFollowNavPills 
                :id="User.id"/>
            <!-- Tweet Detail -->
                <TwittererFollowTable 
                v-for="follower of followers"
                :key="follower.id"
                :initial-data="follower"
                @after-delete-follow-main="afterDeleteFollowMain"
                @after-add-follow-main="afterAddFollowMain"
                />
            <div class="followers-container">
              <!-- ReplyDetailList --> 
              
            </div>      
            </div>

            <div class="col-4 border-start">
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
import SideNavBar from "../components/SideNavBar.vue"
import TopNavBar from "../components/TopNavBar.vue"
import RecFollowingList from "../components/RecFollowingsList.vue"
import TwittererFollowNavPills from '../components/TwittererFollowNavPills.vue';
import TwittererFollowTable from '../components/TwittererFollowTable.vue';

import usersAPI from './../apis/users'
import { Toast } from './../utils/helpers'
import { mapState } from 'vuex'


export default {
    name: "UserProfileFollowers",
    components: {
        SideNavBar,
        RecFollowingList,
        TopNavBar,
        TwittererFollowNavPills,
        TwittererFollowTable
        
    },
  data() {
    return {
      User: {
        id: -1,
        name: "",
        account: "",
        avatar: "",
        bio: "",
        isFollowed: true,
      },
      followers: [],
      removeFollowId: 0,
      addFollowId: 0
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  created() {
    const { id: userId } = this.$route.params
    this.fetchUser(userId)
    this.fetchFollowers(userId)
  },
  beforeRouteUpdate (to ,from, next) {
    const { id: userId } = to.params
    this.fetchUser(userId)
    this.fetchFollowers(userId)
    next()
  },

  methods: {
    async fetchUser(userId) {
     try {
       const { data, statusText } = await usersAPI.getUser({ userId })
       if(statusText !== 'OK') {
         throw new Error(data.message)
       }
       const { id, account, name, totalFollowers, totalFollowings, totalTweets, isFollowing } = data
       this.User = {
         ...this.User,
         id,
         name,
         account,
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
    async fetchFollowers(userId) {
      try{
        const { data } = await usersAPI.getUserFollowers({ userId })

        data.map(follower => {
          const { followerId, name, account, avatar, bio, isFollowing } = follower
          this.followers.push({
            id: followerId,
            name,
            account,
            avatar,
            bio,
            isFollowing
          })
        })

      } catch(error) {
        Toast.fire({
          icon: 'error',
          title: '無法取得追隨者資料，請稍後再試。'
        })
      }
    },
    afterAddFollow(userId) {
      if(this.currentUser.id === this.User.id) {
        //TODO: 在自己的頁面要做其他篩選/新增
        return
      }
      this.followers.map(follower => {
        if(follower.id === userId) {
          follower.isFollowing = 1
        }
      })
    },
    afterDeleteFollow(userId) {
      if(this.currentUser.id === this.User.id) {
        //TODO: 在自己的頁面要做其他篩選/新增
        return
      }
      this.followers.map(follower => {
        if(follower.id === userId) {
          follower.isFollowing = 0
        }
      })
    },
    afterAddFollowMain(userId) {
      this.addFollowId = userId
    },
    afterDeleteFollowMain(userId) {
      this.removeFollowId = userId
    }
  }
    
}
</script>

<style scoped>

</style>

<style scoped>
.main-container {
  height: 100%;
}

.main-component {
  height: 100%;
}

.row {
  height: 100%;
}
</style>