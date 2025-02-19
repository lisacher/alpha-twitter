<template>
  <form @submit.prevent.stop="handleSubmit($event)">
    <div class="row">
      <label for="account"
        >帳號<span class="note">{{ form.account.length }} / 50</span>
      </label>
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
        >名稱<span class="note">{{ form.name.length }} / 50</span></label
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
      <label for="email">Email<span class="note ml-5"></span></label>
      <input
        id="email"
        name="email"
        type="email"
        v-model="form.email"
        required
      />
    </div>

    <div class="row">
      <label for="password"
        >密碼<span class="password">*密碼長度需介於 4 到 15 字元</span></label
      >
      <input
        id="password"
        name="password"
        type="password"
        v-model="form.password"
        required
        maxLength="15"
      />
    </div>
    <div class="row">
      <label for="confirmPassword"
        >密碼確認<span class="passwordCheck"
          >*密碼長度需介於 4 到 15 字元</span
        ></label
      >
      <input
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        v-model="form.confirmPassword"
        required
        maxLength="15"
      />
    </div>

    <template v-if="isSignUp">
      <div class="row mt-4">
        <button class="btn submit" type="submit">註冊</button>
      </div>
      <div class="row">
        <button class="btn cancel" @click.stop.prevent="backToLogin">
          取消
        </button>
      </div>
    </template>
    <template v-else>
      <div class="row">
        <button class="btn update" type="submit"></button>
        <button class="btn update">儲存</button>
      </div>
    </template>
  </form>
</template>

<script>
import authorizationAPI from "./../apis/authorization";
import usersAPI from "./../apis/users";
import { Toast } from "../utils/helpers";
import { mapState } from "vuex";

export default {
  name: "RegistEditForm",
  props: {
    isSignUp: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      form: {
        account: "",
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      isSaved: true,
      userChanged: false,
    };
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
    ...mapState(["currentUser"]),
  },
  methods: {
    fetchCurrentUser(payload) {
      const { id, name, email, account } = payload;
      this.form = {
        ...this.form,
        id,
        name,
        email,
        account,
      };
    },
    backToLogin() {
      this.$router.push("/login");
    },
    formCheck() {
      let result = false;
      if (!this.form.account) {
        Toast.fire({
          icon: "info",
          title: "請填寫帳號！",
        });
        return result;
      }
      if (!this.form.name) {
        Toast.fire({
          icon: "info",
          title: "請填寫名稱！",
        });
        return result;
      }
      if (!this.form.email) {
        Toast.fire({
          icon: "info",
          title: "請填寫 Email！",
        });
        return result;
      }
      if (!this.form.password) {
        Toast.fire({
          icon: "info",
          title: "請填寫密碼！",
        });
        return result;
      }
      if (this.form.password.length > 15 || this.form.password.length < 4) {
        Toast.fire({
          icon: "info",
          title: "密碼長度需介於 4 到 15 字元！",
        });
        return result;
      }
      if (!this.form.confirmPassword) {
        Toast.fire({
          icon: "info",
          title: "請填寫密碼確認！",
        });
        return result;
      }
      if (this.form.password !== this.form.confirmPassword) {
        Toast.fire({
          icon: "error",
          title: "密碼不相符！",
        });
        return result;
      }
      return (result = true);
    },
    handleSubmit() {
      if (this.isSignUp) {
        this.handleRegistSubmit();
      } else {
        this.handleSaveSetting();
      }
    },
    async handleRegistSubmit() {
      try {
        const formData = this.form;
        const formCheckResult = this.formCheck();
        if (!formCheckResult) {
          return;
        }
        const res = await authorizationAPI.signUp(formData);
        const { data } = res;
        if (data.status !== "success") {
          throw new Error(data);
        }
        Toast.fire({
          icon: "success",
          title: "註冊成功！",
        });

        this.$router.push("/login");
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: error.response.data.message,
        });
      }
    },
    async handleSaveSetting() {
      try {
        const formData = this.form;
        const formCheckResult = this.formCheck();
        if (!formCheckResult) {
          return;
        }
        const { data } = await usersAPI.updateInfo({
          userId: this.currentUserid,
          formData,
        });
        //check email and account
        if (data.message === "此帳號已被使用") {
          Toast.fire({
            icon: "error",
            title: "此帳號已被使用，請改試其他帳號",
          });
          return;
        }
        if (data.message === "此信箱已被使用") {
          Toast.fire({
            icon: "error",
            title: "此信箱已被使用，請改試其他帳號",
          });
          return;
        }
        Toast.fire({
          icon: "success",
          title: "資料修改成功！",
        });
        this.isSaved = true;
        this.userChanged = true;
        this.form.password = "";
        this.form.confirmPassword = "";

        this.$store.commit("setCurrentUser", {
          ...this.currentUser,
          ...data[0],
        });
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法儲存使用者資訊，請稍候再試！",
        });
      }
    },
  },
};
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
  font-weight: 500;
  font-size: 15px;
  display: block;
  width: 100%;
  background-color: #f5f8fa;
  width: 642px;
  height: 20px;
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
input:focus,
textarea:focus {
  outline: none;
}
.note {
  font-size: 13px;
  font-weight: 400;
  margin-left: 540px;
}
.password {
  font-size: 13px;
  font-weight: 400;
  margin-left: 400px;
}
.passwordCheck {
  font-size: 13px;
  font-weight: 400;
  margin-left: 370px;
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