<template>
  <div class="container main-container">
    <div class="row">
      <SideNavBar 
        class="col-3"
      />
      <div class="col-5 p-0 border">
        <TopNavBar 
          msg="首頁"
          :show="true"
          :tweetsCount="16"
        />
      </div>
      <div class="col-4">
        <RecFollowingList />
      </div>
    </div>
  </div>
</template>

<script>
import SideNavBar from './../components/SideNavBar.vue'
import RecFollowingList from './../components/RecFollowingsList.vue';
import TopNavBar from './../components/TopNavBar.vue'


export default {
  name: 'main-tweets',
  components: {
    SideNavBar,
    RecFollowingList,
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

  .side-nav-row {
    height: 100%;
  }
  
</style>