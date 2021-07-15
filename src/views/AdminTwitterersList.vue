<template>
  <div class="container main-container">
    <div class="row main-row">
      <SideNavBar class="col-3" :isAdmin="true"/>
      <div class="col-9 p-0 border main-component">
        <TopNavBar msg="使用者列表" :show="false" />
        <Spinner v-if="isLoading" />
        <template v-else>
        <div class="container twitterers-container overflow-scroll">
          <h4 class="list-name border-bottom">使用者列表：</h4>
          <div class="row row-cols-4 gx-3 my-2">
           <AdminTwitterersCard 
           v-for="user in users"
           :key="user.id"
           :data="user"
           />
          </div>
          <h4 class="list-name border-bottom">管理者列表：</h4>
          <div class="row row-cols-4 gx-3 my-2">
          <AdminTwitterersCard 
           v-for="admin in admins"
           :key="admin.id"
           :data="admin"
           />
          </div>
        </div>
        </template>
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
import Spinner from '../components/Spinner.vue'


export default {
  name: 'AdminTwitterersList',
  components: {
    SideNavBar,
    TopNavBar,
    AdminTwitterersCard,
    Spinner
  },
  data() {
    return {
      users: [],
      admins: [],
      isLoading: true
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

        data.map(account => {
          if(account.role === 'user') {
            this.users.push({
              ...account
            })
          } else if(account.role === 'admin') {
            this.admins.push({
              ...account
            })
          }
        })
        this.users.sort((a, b) => {
          return b.totalTweets - a.totalTweets
        })
        this.isLoading = false
      }
      catch(error) {
        this.isLoading = false
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

.list-name {
  font-size: 20px;
  font-weight: 1000;
  padding: 20px 0;
}


</style>