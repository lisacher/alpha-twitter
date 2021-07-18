<template>
  <div class="container">
    <div class="row publicMessage">
      <SideNavBar class="col-3" />
      <!-- mainSection -->
      <PrivateBox class="col-4" />
      <!-- messageBox -->
      <MessageBoard class="col-5" />
    </div>
  </div>
</template>

<script>
import MessageBoard from "./../components/MessageBoard.vue";
import SideNavBar from "./../components/SideNavBar.vue";
import PrivateBox from "../components/PrivateBox.vue";

export default {
  name: "privateMessage",
  components: {
    MessageBoard,
    SideNavBar,
    PrivateBox,
  },
};
</script>
