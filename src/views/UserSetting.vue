<template>
<div class="container main-container">
    <div class="row" id="UserSetting">
      <SideNavBar class="col-3" />
      <div class="col-9 p-0 border-start main-component">
       <TopNavBar 
          msg="帳戶設定"
          :show="false"
          class="border-bottom"
        />
        <div class="regist-container">
          <RegistEditForm :isSignUp="false"
          />
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

.main-component {
  height: 100%;
}
</style>
