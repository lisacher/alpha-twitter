<template>
  <div>
    <nav class="container">
      <div class="nav-logo mb-4">
        <router-link
          to="/"  
        >
          <img src="./../assets/Logo.png" alt="" />
        </router-link>
      </div>
      <div class="nav-list">
        <ul class="nav flex-column me-3 pe-4">
          <li class="nav-item mb-3">
            <router-link to="/tweets" class="nav-link d-flex">
              <div class="home-image"></div>
              <div class="nav-item-text">首頁
              </div>
            </router-link>
          </li>
          <li class="nav-item mb-3">
            <router-link 
              :to="{ name: 'user-tweets', params: { id: currentUser.id}}"
              class="nav-link d-flex"
            >
              <div class="profile-image"></div>
              <div class="nav-item-text">個人資料</div>
            </router-link>
          </li>
          <li class="nav-item mb-3">
            <router-link to="/usersetting" class="nav-link d-flex">
              <div class="setting-image"></div>
              <div class="nav-item-text">設定</div>
            </router-link>
          </li>
          <li class="nav-item mt-2">
            <AddTweetCard 
              :current-user="currentUser"
              @after-create-tweet="afterCreateTweet"
            />
          </li>
          <li class="nav-item mb-3 nav-item-logout">
            <router-link to="/login" class="nav-link d-flex">
              <div class="logout-image"></div>
              <div class="nav-item-text">登出</div>
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import AddTweetCard from './../components/AddTweetCard.vue'

const currentUser = {
  id: 1,
  name: 'Teddy',
  account: 'teddy0323',
  image: ''
}

export default {
  name: 'SideNavBar',

  data () {
    return {
      currentUser: {
        id: -1,
        name: '',
        account: '',
        image: ''
      },
      comments: []
    }
  },
  components: {
    AddTweetCard
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
    afterCreateTweet(payload) {
      console.log('payload', payload);
      const { id, text } = payload
      this.comments.push({
        id,
        text,
        createdAt: new Date()
      })
    }
  }
}
</script>

<style scoped>

.container  {
  height: 100%
}

img {
  width: 50px;
  height: 50px;
}

.nav {
  position: relative;
}

.nav-list {
  height: calc(100% - 74px);
}

.nav-list ul {
  height: 100%;
}

.nav-item .nav-item-text  {
  line-height: 20px;
  display: inline-block;
  font-size: 14px;
  font-weight: 700;
  color: #000;
}

.nav-item:hover .nav-item-text{
  color: #ff6600;
}

.active .nav-item-text {
  color: #ff6600;
}


.nav-item-logout {
  position: absolute;
  bottom: 10px;
  left: 0px;
}

.home-image {
  display: inline-block;
  margin-right: 15px;
  background-image: url(./../assets/home@2x.png);
  background-size: contain;
  background-repeat: no-repeat;
  height: 20px;
  width: 20px;
}

.active .home-image {
  background-image: url(./../assets/home-hover@2x.png);
}

.profile-image {
  display: inline-block;
  margin-right: 15px;
  background-image: url(./../assets/profile@2x.png);
  background-size: contain;
  background-repeat: no-repeat;
  height: 20px;
  width: 20px;
}

.active .profile-image {
  background-image: url(./../assets/profile-hover@2x.png);
}

.setting-image {
  display: inline-block;
  margin-right: 15px;
  background-image: url(./../assets/Setting@2x.png);
  background-size: contain;
  background-repeat: no-repeat;
  height: 20px;
  width: 20px;
}

.active .setting-image {
  background-image: url(./../assets/setting-hover@2x.png);
}

.logout-image {
  display: inline-block;
  margin-right: 15px;
  background-image: url(./../assets/logout@2x.png);
  background-size: contain;
  background-repeat: no-repeat;
  height: 20px;
  width: 20px;
}

.nav-item:hover .home-image {
  background-image: url(./../assets/home-hover@2x.png);
}
.nav-item:hover .profile-image {
  background-image: url(./../assets/profile-hover@2x.png);
}
.nav-item:hover .setting-image {
  background-image: url(./../assets/setting-hover@2x.png);
}

</style>