<template>
<form >
    <div class="row">
      <label for="account"
        >帳號<span class="note ml-5">*帳號長度不得大於 50 字元</span></label
      >
      <input
        id="account"
        name="account"
        type="text"
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
        required
        maxLength="12"
      />
    </div>
    <div class="row">
      <label for="passwordCheck"
        >密碼確認<span class="note ml-3"
          >*密碼長度需介於 4 和 12 之間</span
        ></label
      >
      <input
        id="passwordCheck"
        name="passwordCheck"
        type="password"
        required
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
        <button class="btn update" >儲存</button>
      </div>
    </template>
  </form>
</template>

<script>

export default {
  name: "RegistEditForm",
  props: {
    isSignUp: {
        type: Boolean,
        default: false
      }
  },
  data() {
    return {
      form: {
        account: '',
        name: '',
        email: '',
        password: '',
        passwordCheck: '',
      }
    }
  },
  methods: {
      backToLogin() {
      this.$router.push("/login")
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