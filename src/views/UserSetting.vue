<template>
  <div id="UserSetting">
    <SideNavBar />
    <div class="UserSettingPanel">
      <div class="title">
        <h1>帳戶設定</h1>
      </div>

      <RegistEditForm :isSignUp="isSignUp"/>
    </div>
  </div>
</template>

<script>
import SideNavBar from "../components/SideNavBar.vue"
import RegistEditForm from "../components/RegistEditForm.vue"

export default {
  name: "UserSetting",
  data() {
    return {
      isSignUp: false,
    };
  },
  components: {
    SideNavBar,
    RegistEditForm,
  }
}
</script>

<style scoped>
#UserSetting {
  display: flex;
}
.UserSettingPanel {
  flex: 1;
}
.title {
  height: 55px;
  border-bottom: 1px solid #e6ecf0;
  padding: 10px 15px;
  display: flex;
  align-items: center;
}
.title h1 {
  font-weight: 700;
  font-size: 19px;
  margin: 0;
}
</style>
