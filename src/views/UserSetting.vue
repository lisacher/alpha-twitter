<template>
  <div id="UserSetting" class="container main-container">
    <div class="row">
      <SideNavBar class="col-3"/>
      <div class="UserSettingPanel col-9 border">
        <div class="title">
          <h1>帳戶設定</h1>
        </div>

        <RegistEditForm :isSignUp="isSignUp" />
      </div>
    </div>
  </div>
</template>

<script>
import SideNavBar from "../components/SideNavBar.vue";
import RegistEditForm from "../components/RegistEditForm.vue";

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
  },
};
</script>

<style scoped>

.main-container {
  height: 100%;
}

.row {
  height: 100%;
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
