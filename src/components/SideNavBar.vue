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
            <router-link to="/main" class="nav-link d-flex">
              <div class="home-image"></div>
              <div class="nav-item-text">首頁
              </div>
            </router-link>
          </li>
          <li class="nav-item mb-3">
            <router-link to="/" class="nav-link d-flex">
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
            <div class="d-grid gap-2">
              <button
                class="btn tweet-button"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#tweetModal"
              >
                推文
              </button>
            </div>
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
    <!-- tweet modal -->
    <div
      class="modal fade"
      id="tweetModal"
      tabindex="-1"
      aria-labelledby="tweet-modal"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header py-2">
            <button
              type="button"
              class="btn close-btn p-0"
              data-bs-dismiss="modal"
              aria-label="Close"
            ><img src="./../assets/icon_close@2x.png" alt=""></button>
          </div>
          <form class="modal-body" @submit.prevent.stop="handleSubmit">
            <div class="d-flex">
              <img src="./../assets/Logo.png" alt="">
              <textarea 
                v-model="text"
                name="" 
                id="" 
                cols="50" 
                rows="5" 
                :placeholder="currentUser.name | adjustAddTweetPlaceholder">
              </textarea>
            </div>
            <div class="modal-footer">
              <button type="submit" class="btn btn-primary">推文</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {v4 as uuidv4} from 'uuid'

const currentUser = {
  id: 1,
  name: 'Teddy',
  account: 'teddy0323',
  image: ''
}

export default {
  name: 'SideNavBar',
  props: {
    currentUser: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      User: {
        id: -1,
        name: '',
        account: '',
        image: ''
      },
      text: '',
      comments: []
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
    handleSubmit() {
      if(!this.text) {
        return
      }
      this.comments.push({
        id: uuidv4(),
        User: {
          id: this.user.id,
          name: this.user.name,
          account: this.user.account,
          image: this.user.image
        },
        text: this.text,
        createdAt: new Date()
      })
      this.text = ''
    }
  },
  filters: {
    adjustAddTweetPlaceholder(userName) {
      return `${userName}，有什麼新鮮事呢？`
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


.nav-item button.tweet-button {
  background: #ff6600;
  color: #fff;
  border-radius: 100px;
  font-size: 14px;
  margin-left: 20px;
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

.modal-content {
  border-radius: 14px;
  border: 0;
}

.modal-header img {
  height: 15px;
  width: 15px;
}

.modal-body {
  padding-top: 15px;
}

.modal-body textarea {
  border: 0;
  resize: none;
  transform: translateY(10px);
}

.modal-body textarea:focus {
  outline: 0;
}

.modal-footer {
  border-top: 0;
}

.modal-footer button {
  background: #FF6600;
  border: 0 solid #000;
  border-radius: 100px;
}
</style>