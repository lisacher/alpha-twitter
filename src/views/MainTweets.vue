<template>
  <div class="container">
    <div class="row">
      <SideNavBar 
        class="col-3"
      />
      <div class="col-5">
        TopNavBar
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

export default {
  name: 'main-tweets',
  components: {
    SideNavBar,
    RecFollowingList
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