<template>
  <div class="container">
    <div class="row">
      <SideNavBar 
        class="col-3"
      />
      <div class="col-5 p-0">
        <TopNavBar 
          class="border"
          msg="首頁"
          :show="true"
          :tweetsCount="4"
        />
      </div>
      <div class="col-4">
        RecFollowingList
      </div>
    </div>
  </div>
</template>

<script>
import SideNavBar from './../components/SideNavBar.vue'
import TopNavBar from './../components/TopNavBar.vue'

export default {
  name: 'main-tweets',
  components: {
    SideNavBar,
    TopNavBar
  }
}
</script>

<style scoped>

  .container {
    height: 100%;
  }

  .row {
    height: 100%;
  }
  
</style>