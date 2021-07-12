<template>
  <div>
    <nav class="container">
      <div class="nav-logo mb-4">
        <router-link to="/">
          <img src="./../assets/Logo.png" alt="" />
        </router-link>
      </div>
      <!-- if is user -->
      <div class="nav-list" v-if="!isAdmin">
        <ul class="nav flex-column me-3 pe-4">
          <li class="nav-item mb-4">
            <router-link to="/tweets" class="nav-link d-flex">
              <div class="home-image"></div>
              <div class="nav-item-text">首頁</div>
            </router-link>
          </li>
          <li class="nav-item mb-4">
            <router-link
              :to="{ name: 'user', params: { id: currentUser.id } }"
              class="nav-link d-flex"
            >
              <div class="profile-image"></div>
              <div class="nav-item-text">個人資料</div>
            </router-link>
          </li>
          <li class="nav-item mb-4">
            <router-link to="/setting" class="nav-link d-flex">
              <div class="setting-image"></div>
              <div class="nav-item-text">設定</div>
            </router-link>
          </li>
          <li class="nav-item mt-2">
            <CreatedTweetModal
              :current-user="currentUser"
              @after-create-tweet="afterCreateTweet"
            />
          </li>
          <li class="nav-item mb-3 nav-item-logout">
            <button
              class="btn nav-link d-flex"
              data-bs-toggle="modal"
              data-bs-target="#logoutModal"
            >
              <div class="logout-image"></div>
              <div class="nav-item-text">登出</div>
            </button>
          </li>
        </ul>
      </div>
      <!-- if is Admin -->
      <div class="nav-list" v-else>
        <ul class="nav flex-column me-3 pe-4">
          <li class="nav-item mb-4">
            <router-link to="/admin/tweets" class="nav-link d-flex">
              <div class="home-image"></div>
              <div class="nav-item-text">推文清單</div>
            </router-link>
          </li>
          <li class="nav-item mb-4">
            <router-link to="/admin/users" class="nav-link d-flex">
              <div class="profile-image"></div>
              <div class="nav-item-text">使用者列表</div>
            </router-link>
          </li>
          <li class="nav-item mb-3 nav-item-logout">
            <button
              class="btn nav-link d-flex"
              data-bs-toggle="modal"
              data-bs-target="#logoutModal"
            >
              <div class="logout-image"></div>
              <div class="nav-item-text">登出</div>
            </button>
          </li>
        </ul>
      </div>
    </nav>
    <div
      class="modal fade"
      id="logoutModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-sm">
        <div class="modal-content">
          <div class="modal-body text-center">您確定要登出嗎？</div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              取消
            </button>
            <button
              type="button"
              class="btn btn-danger"
              data-bs-toggle="modal"
              data-bs-target="#logoutModal"
              @click.prevent.stop="logOut()"
            >
              登出
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CreatedTweetModal from "./CreateTweetModal.vue";
import { mapState } from 'vuex'

export default {
  name: "SideNavBar",
  props: {
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      comments: [],   
    };
  },
  computed: {
    ...mapState(['currentUser'])
  },
  components: {
    CreatedTweetModal,
  },
  methods: {
    afterCreateTweet({ description, id }) {
      this.$emit("after-create-tweet", {
        description,
        id
      });
    },
    logOut() {
      if (this.isAdmin) {
        this.$router.push("/admin");
        return
      }
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.container {
  height: 100%;
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

.nav-item .nav-item-text {
  line-height: 20px;
  display: inline-block;
  font-size: 18px;
  font-weight: 700;
  color: #000;
}

.nav-item:hover .nav-item-text {
  color: #ff6600;
}

.active .nav-item-text,
.part-active .nav-item-text {
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

.active .profile-image,
.part-active .profile-image {
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

.modal-body {
  height: 100px;
  line-height: 100px;
}

.modal-footer {
  border-top: none;
}
</style>