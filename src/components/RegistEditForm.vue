<template>
<form @submit.prevent.stop="handleSubmit($event)">
    <div class="row">
      <label for="account"
        >帳號<span class="note ml-5">*帳號長度不得大於 50 字元</span></label
      >
      <input
        id="account"
        name="account"
        type="text"
        v-model="form.account"
        required
        maxlength="50"
      />
    </div>

    <div class="row">
      <label for="name"
        >名稱<span class="note ml-5">*名稱長度不得大於 50 字元</span></label
      >
      <input
        id="name"
        name="name"
        type="text"
        v-model="form.name"
        maxlength="50"
        required
      />
    </div>

    <div class="row">
      <label for="email"
        >Email<span class="note ml-5">*信箱長度不得大於 50 字元</span></label
      >
      <input
        id="email"
        name="email"
        type="email"
        v-model="form.email"
        maxlength="50"
        required
      />
    </div>

    <div class="row">
      <label for="password"
        >密碼<span class="note ml-5">*密碼長度需介於 4 和 12 之間</span></label
      >
      <input
        id="password"
        name="password"
        type="password"
        v-model="form.password"
        required
        maxLength="12"
      />
    </div>
    <div class="row">
      <label for="confirmPassword"
        >密碼確認<span class="note ml-3"
          >*密碼長度需介於 4 和 12 之間</span
        ></label
      >
      <input
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        v-model="form.confirmPassword"
        required
        maxLength="12"
      />
    </div>

    <template v-if="isSignUp">
      <div class="row mt-4" >
        <button class="btn submit" type="submit" >
            註冊
        </button>
      </div>
      <div class="row">
        <button class="btn cancel" @click.stop.prevent="backToLogin">
          取消
        </button>
      </div>
    </template>
    <template v-else>
      <div class="row">
        <button
          class="btn update"
          type="submit"
        >
        </button>
        <button class="btn update">儲存</button>
      </div>
    </template>
  </form>
</template>

<script>
import authorizationAPI from "./../apis/authorization"
import usersAPI from "./../apis/users"
import { Toast } from "../utils/helpers";
import { mapState } from 'vuex'

export default {
  name: "RegistEditForm",
  props: {
    isSignUp: {
        type: Boolean,
        default: true
      }
  },
  data() {
    return {
      form: {
        account: '',
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
      isSaved: true,
      userChanged: false,
    }
  },
  created() {
    this.fetchCurrentUser(this.currentUser);
  },
  watch: {
    currentUser(payload) {
      this.fetchCurrentUser(payload);
    },
    form: {
      handler: function () {
        if (!this.userChanged) {
          return (this.userChanged = true);
        }
        this.isSaved = false;
      },
    },
  },
  computed: {
    ...mapState(['currentUser'])
  },
  methods: {
    fetchCurrentUser(payload) {
      const { name, email, account } = payload;
      this.form = {
        ...this.form,
        name,
        email,
        account,
      };
    },
    backToLogin() {
      this.$router.push("/login")
    },
    formCheck() {
      let result = false
      if (!this.form.account) {
        Toast.fire({
          icon: "info",
          title: "請填寫帳號！",               
        });
        return result
      }
      if (!this.form.name) {
        Toast.fire({
          icon: "info",
          title: "請填寫名稱！",
        })
        return result
      }
      if (!this.form.email) {
        Toast.fire({
          icon: "info",
          title: "請填寫 Email！",
        })
        return result
      }
      if (!this.form.password) {
        Toast.fire({
          icon: "info",
          title: "請填寫密碼！",
        })
        return result
      }
      if (this.form.password.length > 12 || this.form.password.length < 4) {
        Toast.fire({
          icon: "info",
          title: "密碼長度不得小於 4 或超過 12！",
        })
        return result
      }
      if (!this.form.confirmPassword) {
        Toast.fire({
          icon: "info",
          title: "請填寫密碼確認！",
        })
        return result
      }
      if (this.form.password !== this.form.confirmPassword) {
        Toast.fire({
          icon: "error",
          title: "密碼不相符！",
        })
        return result
      }
      console.log("Data check passed")
      return (result = true)

    },
    handleSubmit() {
      if (this.isSignUp) {
        this.handleRegistSubmit()
      } else {
        this.handleSaveSetting()}
    },
    async handleRegistSubmit() {
      try {
        const formData = this.form
        const formCheckResult = this.formCheck()
        if (!formCheckResult) {
          return;
        }
        const { data } = await authorizationAPI.signUp(formData)
        console.log(data)
        if (data.status !== "success") {
          throw new Error(data)
        }
        Toast.fire({
          icon: "success",
          title: "註冊成功！",
        })

        this.$router.push("/login")
      } catch (error) {
        console.log(error)
        let message = "無法註冊，請稍後再試！"
        Toast.fire({
          icon: "error",
          title: message,
        })
      }
    },
    async handleSaveSetting() {
      try {
        const formData = this.form
        const formCheckResult = this.formCheck()
        if (!formCheckResult) {
          return;
        }
        const { data } = await usersAPI.updateInfo(
          { userId: this.currentUserid, formData })
        console.log(data);
        if (data[1].status !== "success") {
          throw new Error(data.message)
        }
        Toast.fire({
          icon: "success",
          title: "資料修改成功！",
        });
        this.isSaved = true
        this.userChanged = true
        this.form.password = ""
        this.form.confirmPassword = ""
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: "error",
          title: "無法儲存使用者資訊，請稍候再試！",
        })
      }
    },
    
  }
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  margin: 20px 0 0 15px;
  width: 642px;
}
.row {
  width: 642px;
  margin: 10px 0;
}
.row label {
  padding-left: 11px;
  color: #657786;
  font-weight: 700;
  display: block;
  width: 100%;
  background-color: #F5F8FA;
  width: 642px;
  height: 19px;
}
.row input {
  padding-left: 11px;
  font-weight: 500;
  font-size: 19px;
  background-color: #f5f8fa;
  width: 100%;
  border: none;
  border-bottom: 2px solid #657786;
}
input:focus,textarea:focus {
    outline: none
}
.note {
  font-size: 15px;
  color: #ff6600;
}
.btn {
  width: 100%;
  border-radius: 50px;
  height: 50px;
}
button.submit,
button.update {
  background-color: #ff6600;
  color: #fff;
  font-size: 18px;
  font-weight: 700;
}
button.cancel {
  color: #0099ff;
  text-decoration: underline;
  font-size: 18px;
  font-weight: 700;
}
.row:last-child {
  position: relative;
  height: 50px;
}
button.update {
  position: absolute;
  right: 0;
  width: 122px;
  font-size: 18px;
}
</style>