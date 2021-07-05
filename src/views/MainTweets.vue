<template>
  <div class="container main-container">
    <div class="row">
      <SideNavBar 
        class="col-3"
      />
      <div class="col-5 p-0 border">
        <TopNavBar 
          msg="首頁"
          :show="false"
          :tweetsCount="0"
        />
        <TweetContent 
          :current-user="currentUser"
        />
        <TweetsCard />
      </div>
      <div class="col-4">
        <RecFollowingList />
      </div>
    </div>
  </div>
</template>

<script>
import SideNavBar from './../components/SideNavBar.vue'
import RecFollowingList from './../components/RecFollowingsList.vue';
import TopNavBar from './../components/TopNavBar.vue'
import TweetContent from './../components/TweetContent.vue'
import TweetsCard from './../components/TweetsCard.vue'

const currentUser = {
  id: 1,
  name: 'Teddy',
  account: 'teddy0323',
  image: ''
}


export default {
  name: 'main-tweets',
  components: {
    SideNavBar,
    RecFollowingList,
    TopNavBar,
    TweetContent,
    TweetsCard
  },
  data() {
    return {
      currentUser: {
        id: -1,
        name: '',
        account: '',
        image: ''
      }
    }
    
  },

  created() {
    this.fetchUser()
  },
  methods: {
    fetchUser() {
      this.currentUser = {
        ...this.currentUser,
        ...currentUser
      }
    },
  }
}
</script>

<style scoped>

  .main-container {
    height: 100%;
  }

  .row {
    height: 100%;
  }

  .side-nav-row {
    height: 100%;
  }
  
</style>