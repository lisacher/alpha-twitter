<template>
  <div class="container main-container">
    <div class="row main-row">
      <SideNavBar class="col-3" :isAdmin="true"/>
      <div class="col-9 p-0 border main-component">
        <TopNavBar msg="使用者列表" :show="false" />
        <div class="container twitterers-container overflow-scroll">
          <div class="row row-cols-4 gx-3 my-2">
           <AdminTwitterersCard 
           v-for="user in users"
           :key="user.id"
           :user="user"
           />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SideNavBar from './../components/SideNavBar.vue'
import TopNavBar from './../components/TopNavBar.vue'
import AdminTwitterersCard from './../components/AdminTwitterersCard.vue'
import usersAPI from "./../apis/users"
import { Toast } from './../utils/helpers'


export default {
  name: 'AdminTwitterersList',
  components: {
    SideNavBar,
    TopNavBar,
    AdminTwitterersCard
  },
  data() {
    return {
      users: []
    }
  },
  created() {
    this.fetchUser()
  },
  methods: {
	async fetchUser() {
      try{
        const { data } = await usersAPI.getAdminUsers()
        console.log('data',data);
        this.users = data
        this.users.sort((a, b) => {
          return b.totalTweets - a.totalTweets
        })
      }
      catch(error) {
        Toast.fire({
          icon: 'error',
          title: '無法取得所有使用者資料，請稍後再試'
        })
        console.log(error.message);
      }
    },
  }
}
</script>

<style scoped>
.main-container {
  height: 100%;
  position: relative;
}

.main-component {
  height: 100%;
}

.twitterers-container {
  height: calc(100% - 55px);
}

.main-row {
  height: 100%;
}



</style>