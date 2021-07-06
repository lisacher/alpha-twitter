<template>
<div class="container">
  <div class="row">
    <div id="UserSetting">
      <SideNavBar />
    <div class="UserSettingPanel border">
      <div class="title">
        <TopNavBar 
          msg="帳戶設定"
          :show="false" />
      </div>
      <RegistEditForm :isSignUp="false"/>
    </div>
  </div>
</div>
</div>
  
</template>

<script>
import SideNavBar from "../components/SideNavBar.vue"
import RegistEditForm from "../components/RegistEditForm.vue"
import TopNavBar from './../components/TopNavBar.vue'

export default {
  name: "UserSetting",
  components: {
    SideNavBar,
    RegistEditForm,
    TopNavBar
  }
}
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
