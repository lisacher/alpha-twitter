<template>
  <div class="container">
    <div class="row">
      <SideNavBar 
        class="col-3"
      />
      <div class="col-6">
        TopNavBar
      </div>
      <div class="col-3">
        RecFollowingList
      </div>
    </div>
  </div>
</template>

<script>
import SideNavBar from './../components/SideNavBar.vue'

export default {
  name: 'main-tweets',
  components: {
    SideNavBar
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