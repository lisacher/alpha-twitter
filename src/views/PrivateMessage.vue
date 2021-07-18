<template>
  <div class="container">
    <div class="row publicMessage">
      <SideNavBar class="col-3" />
      <!-- mainSection -->
      <PrivateBox class="col-4" />
      <!-- messageBox -->
      <PrivateBoxReply class="col-5" />
    </div>
  </div>
</template>

<script>
import SideNavBar from "./../components/SideNavBar.vue";
import PrivateBox from "../components/PrivateBox.vue";
import PrivateBoxReply from "../components/PrivateBoxReply.vue";

export default {
  name: "privateMessage",
  components: {
    SideNavBar,
    PrivateBox,
    PrivateBoxReply,
  },
};
</script>
