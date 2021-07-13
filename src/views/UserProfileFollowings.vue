<template>
    <div class="container main-container">
        <div class="row">
            <SideNavBar 
            class="col-3 border-end"/>

            <!-- ReplyDetail -->
            <div class="col-5 p-0 main-container border-0">
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
                v-for="following of followings"
                :key="following.id"
                :initial-data="following" 
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
import { mapState } from 'vuex'
import { Toast } from '../utils/helpers';


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
        name: '',
        account: '',
        totalFollowers: 0,
        totalFollowings: 0,
        totalTweets: 0,
        isFollowing: 0
      },
      followings: [],
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
    this.fetchFollowings(userId)
  },
  beforeRouteUpdate (to ,from, next) {
    const { id: userId } = to.params
    this.fetchUser(userId)
    this.fetchFollowings(userId)
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
    async fetchFollowings(userId) {
      try{
        const { data } = await usersAPI.getUserFollowings({ userId })
        data.map(following => {
          const { followingId, name, account, avatar, bio, isFollowing } = following
          this.followings.push({
            id: followingId,
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
          title: '無法取得正在跟隨資料，請稍後再試。'
        })
      }
    },
    async afterAddFollow(userId) {
      if(this.currentUser.id === this.User.id) {
        //TODO: 在自己的頁面要做其他篩選/新增
        // 抱歉 我偷懶 我呼叫API
        const { data } = await usersAPI.getUser({ userId })
        const { id, name, account, avatar, bio, isFollowing } = data
        this.followings.push({
          id,
          name,
          account,
          avatar,
          bio,
          isFollowing
        })
        console.log('data', data);
        return
      }
      this.followings.map(following => {
        if(following.id === userId) {
          following.isFollowing = 1
        }
      })
    },
    afterDeleteFollow(userId) {
      if(this.currentUser.id === this.User.id) {
        // 在自己的頁面中，將刪除的User移除。
        this.followings = this.followings.filter(following => following.id !== userId)
        return
      }
      this.followings.map(following => {
        if(following.id === userId) {
          following.isFollowing = 0
        }
      })
    },
    afterAddFollowMain(userId) {
      // 自己的頁面中，followings不會顯示沒有加入的User，所以不用另外設計。
      this.addFollowId = userId
    },
    afterDeleteFollowMain(userId) {
      // 在自己的頁面中，將刪除的User移除。
      if(this.currentUser.id === this.User.id) {
        this.followings = this.followings.filter(following => following.id !== userId)
      }
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