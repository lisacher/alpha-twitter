<template>
  <div class="container">
    <div class="logo">
      <img src="../assets/Logo.png" alt="" />
    </div>
    <div class="title">
      <h1>建立你的帳號</h1>
    </div>
    <RegistEditForm :isSignUp="isSignUp"/>
  </div>
</template>

<script>
import RegistEditForm from '../components/RegistEditForm.vue'
export default {
    name:'Register',
    data() {
    return {
      isSignUp: false,
    };
  },
    components: {
        RegistEditForm
    }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.title h1 {
  font-weight: 900;
  font-size: 23px;
}
.logo {
  margin: 60px 0 30px 0;
}
.logo img {
  width: 50px;
  height: 50px;
}
</style>