<template>
    <form @submit.prevent.stop="handleSubmit">
      <div class="logo">
        <img src="../assets/Logo.png" alt="" />
      </div>
      <div class="title">
        <h1>後台登入</h1>
      </div>

      <div class="row">
        <label for="account">帳號</label>
        <input
          id="account"
          name="account"
          v-model="account"
          type="text"
          required
        />
      </div>

      <div class="row">
        <label for="password">密碼</label>
        <input
          id="password"
          name="password"
          type="password"
          v-model="password"
          required
        />
      </div>

      <div class="row mt-4">
        <button class="btn signin" type="submit">
          登入
        </button>
      </div>
      <div class="row link-btns-container">
          <div class="link-btns login">
        <p>
          <router-link class="routerLink" 
          to="/login">前台登入</router-link>
        </p>
      </div>
      </div>
      
    </form>
</template>

<script>
import { Toast } from "../utils/helpers"

const dummyAdmin = {
    id: 3,
    account: 'root',
    password: '1234',
    isAdmin: true

}

export default {
  name: "AdminLogin",
  data() {
    return {
      account: "",
      password: "",
      user: []
    }
  },
  created() {
      this.fetchUser()
  },
  methods: {
    fetchUser() {
        this.user = dummyAdmin
    },
    handleSubmit() {
        if (!this.user.account || !this.user.password) {
          Toast.fire({
            icon: "warning",
            title: "請輸入帳號和密碼",
          })
          return
        }

        if (this.user.password !== this.password) {
          Toast.fire({
            icon: "warning",
            title: "您非管理者身分!",
          })
          return
        }
        this.$router.push("/admin/tweets")
    },
  },
}

</script>

<style scoped>
.logo {
  margin: 60px 0 30px 0;
}
.logo img {
  width: 50px;
  height: 50px;
}
form {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.row {
  width: 540px;
  height: 50px;
  margin: 10px;
}
.row label {
  color: #657786;
  font-weight: 500;
  background-color: #F5F8FA;
  width: 540px;
  height: 23px;
}
.title h1 {
  width: 100%;
  text-align: center;
  font-weight: 700;
  font-size: 23px;
  margin-bottom: 20px;
}
input {
  background-color: #f5f8fa;
  width: 100%;
  border: none;
  border-bottom: 2px solid #657786;
}
input:focus,textarea:focus {
    outline: none
}
.btn {
  width: 100%;
  border-radius: 50px;
  height: 50px;
}
button.signin {
  background-color: #ff6600;
  color: #fff;
  font-size: 18px;
  font-weight: 700;
}
.link-btns-container {
  position: relative;
  height: 26px;
}
.link-btns {
  position: absolute;
  right: 0;
}
.routerLink {
  font-weight: 700;
  color: #0099ff;
  text-decoration: underline;
}
.link-btns-container span {
  color: #0099ff;
  font-weight: 700;

}
form .login {
  position: relative;
  height: 26px;
  font-weight: 700;
  text-align: right;
  padding-top: 20px;
}
</style>