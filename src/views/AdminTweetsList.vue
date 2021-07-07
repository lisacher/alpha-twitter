<template>
  <div class="container main-container">
    <div class="row">
      <SideNavBar class="col-3" :isAdmin="true"/>
      <div class="col-9 p-0 border main-component">
        <TopNavBar msg="推文清單" :show="false" />
        <div class="tweets-container">
          <AdminTweetsCard />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SideNavBar from './../components/SideNavBar.vue'
import TopNavBar from './../components/TopNavBar.vue'
import AdminTweetsCard from './../components/AdminTweetsCard.vue'

export default {
  name: 'AdminTweetsList',
  components: {
    SideNavBar,
    TopNavBar,
    AdminTweetsCard
  }
}
</script>

<style scoped>
.main-container {
  height: 100%;
  position: relative;
}

.main-component {
  height: 100%;
}

.tweets-container {
  height: calc(100% - 50px);
  overflow: scroll;
}

.row {
  height: 100%;
}
</style>