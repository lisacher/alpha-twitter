<template>
  <div class="container border-top px-0">
    <div class="cover-container">
      <img :src="user.cover | emptyImage" alt="" />
    </div>
    <div class="avatar-container">
      <img :src="user.avatar | emptyImage" alt="" />
    </div>
    <div class="description-container px-3">
      <div
        class="button-container d-flex justify-content-end align-items-center"
      >
        <UserProfileEditForm 
          v-if="currentUser.id === user.id"
          :initail-user="initialUser"
          @after-form-submit="afterFormSubmit"
        />
        <template v-else>
          <button class="btn button dm-button me-2"></button>
          <button class="btn button noti-button me-2"></button>
          <button 
            v-if="user.isFollowing === 1" 
            type="button"
            class="btn button is-active"
            @click.prevent.stop="deleteFollow(user.id)"
            >
            追蹤中
          </button>
          <button 
            v-else 
            type="button"
            class="btn button"
            @click.prevent.stop="addFollow(user.id)"
          >追蹤</button>
        </template>
      </div>
      <div class="info-container mb-4">
        <p class="name">{{ user.name }}</p>
        <p class="account">{{ user.account }}</p>
        <p class="bio my-2">{{ user.bio }}</p>
        <div class="follow-container">
          <router-link 
            :to="{name: 'user-followings', params:{ id: user.id}}"
            class="follow-link"
          >
            <p class="me-3">{{ user.totalFollowings }} 個<span>跟隨中</span></p>
          </router-link>
          <router-link 
            :to="{name: 'user-followers', params:{ id: user.id}}"
            
          >
            <p>{{ user.totalFollowers }} 位<span>跟隨者</span></p>
          </router-link>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UserProfileEditForm from './../components/UserProfileEditForm.vue'
import { emptyImageFilter } from './../utils/mixins'
import { mapState } from 'vuex'

import usersAPI from './../apis/users'
import { Toast } from './../utils/helpers'


export default {
  name: "TwittererInformation",
  props: {
    initialUser: {
      type: Object,
      required: true,
    },
  },
  components: {
    UserProfileEditForm
  },
  mixins: [emptyImageFilter],
  data() {
    return {
      user: {},
    };
  },
  created() {
    this.fetchUser();
  },
  computed: {
    ...mapState(['currentUser'])
  },
  watch: {
    initialUser: {
      handler: function(newValue) {
        this.user = {
          ...this.user,
          ...newValue
        }
      },
      deep: true
    }
  },
  methods: {
    fetchUser() {
      this.user = this.initialUser;
    },
    async addFollow(userId) {
      try {
        const { data } = await usersAPI.followUser({ userId })
        if(data.status !== 'success') {
          throw new Error(data.message)
        }

        this.user = {
          ...this.user,
          isFollowing: 1,
          totalFollowers: this.user.totalFollowers + 1
        }
        this.$emit('after-add-follow-main', userId)
        Toast.fire({
          icon: 'success',
          title: '追蹤成功！'
        })
      } catch(error) {
        Toast.fire({
          icon: 'error',
          title: '無法追蹤使用者，請稍後再試。'
        })
      }
    },
    async deleteFollow(userId) {
      try {
        const { data } = await usersAPI.unfollowUser({ userId })
        if(data.status !== 'success') {
          throw new Error(data.message)
        }

        this.user = {
          ...this.user,
          isFollowing: 0,
          totalFollowers: this.user.totalFollowers - 1
        }
        this.$emit('after-delete-follow-main', userId)
        Toast.fire({
          icon: 'success',
          title: '取消追蹤成功！'
        })
      } catch(error) {
        Toast.fire({
          icon: 'error',
          title: '無法取消追蹤使用者，請稍後再試。'
        })
      }
    },
    afterFormSubmit() {
      this.$emit('after-form-submit')
    }
  },
};
</script>

<style scoped>
.container {
  position: relative;
}

.cover-container img {
  height: 200px;
  width: 100%;
  object-fit: cover;
  object-position: 50% 50%;
}

.avatar-container {
  position: absolute;
  top: 200px;
  left: 15px;
  transform: translateY(-50%);
}

.avatar-container img {
  width: 140px;
  height: 140px;
  object-fit: cover;
  object-position: center center;
  background-color: #000;
  border-radius: 50%;
  border: 4px solid #fff;
}

.button-container {
  height: 70px;
}

.button-container button {
  font-size: 15px;
  font-weight: 700;
  height: 40px;
}

.button-container button.button {
  background-color: #fff;
  color: #f60;
  border: 1px solid #f60;
  border-radius: 100px;
}

.button-container button.is-active {
  background-color: #f60;
  color: #fff;
}

.button-container button.dm-button {
  background-image: url(./../assets/dm.png);
  background-size: 50%;
  background-repeat: no-repeat;
  background-position: center center;
  width: 40px;
  height: 40px;
}

.button-container button.noti-button {
  background-image: url(./../assets/noti.png);
  background-size: 60%;
  background-repeat: no-repeat;
  background-position: center center;
  width: 40px;
  height: 40px;
}

.button-container button.button:hover {
  background-color: #f60;
  color: #fff;
}

.button-container button.dm-button:hover {
  background-color: rgb(250, 182, 136);
}

.button-container button.noti-button:hover {
  background-image: url(./../assets/noti-active.png);
}


.info-container .name {
  font-size: 19px;
  font-weight: 900;
}

.info-container .account {
  color: #657786;
}

.info-container .bio {
  font-size: 14px;
}

.follow-container {
  font-size: 14px;
}

.follow-container p {
  display: inline-block;
}

.follow-container span {
  color: #657786;
}

.follow-container a {
  color: #000;
}
</style>