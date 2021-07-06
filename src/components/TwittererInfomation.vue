<template>
  <div class="container border-top px-0">
    <div class="cover-container">
      <img src="https://fakeimg.pl/200x200" alt="" />
    </div>
    <div class="avatar-container">
      <img src="./../assets/Logo.png" alt="" />
    </div>
    <div class="description-container px-3">
      <div
        class="button-container d-flex justify-content-end align-items-center"
      >
        <button
          v-if="currentUser.id === user.id"
          class="btn btn-primary button edit-profile"
        >
          編輯個人資料
        </button>
        <template v-else>
          <button class="btn button dm-button me-2"></button>
          <button class="btn button noti-button me-2"></button>
          <button v-if="user.isLiked" class="btn button">
            取消追蹤
          </button>
          <button v-else class="btn button isactive">追蹤</button>
        </template>
      </div>
      <div class="info-container mb-5">
        <p class="name">{{ user.name }}</p>
        <p class="account">@{{ user.account }}</p>
        <p class="bio my-2">{{ user.bio }}</p>
        <div class="follow-container">
          <p class="me-3">{{ user.followingsCounts }}<span>個跟隨中</span></p>
          <p>{{ user.followersCounts }}<span>位跟隨者</span></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const dummycurrentUser = {
  id: 1,
  name: "Teddy",
  account: "teddy0323",
  avatar: "",
  cover: "",
  bio: "Have a nice day.",
  followingsCounts: 13,
  followersCounts: 25,
};

export default {
  name: "TwittererInformation",
  props: {
    initialUser: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      currentUser: {},
      user: {},
    };
  },
  created() {
    this.fetchCurrentUser();
    this.fetchUser();
  },
  methods: {
    fetchCurrentUser() {
      this.currentUser = dummycurrentUser;
    },
    fetchUser() {
      this.user = this.initialUser;
    },
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
</style>