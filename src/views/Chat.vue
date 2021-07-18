<template>
<div class="container">
    <div class="row">
    <!-- SideNavbar -->
     <SideNavBar 
        class="col-3"
      />
    <!-- mainSection -->
    <UserOnlineList class="col-4" />

      <!-- messageBox -->
      <MessageBoard class="col-5" />
    </div>
</div>
</template>

<script>
import SideNavBar from "./../components/SideNavBar.vue";
import MessageBoard from "./../components/MessageBoard.vue";
import UserOnlineList from "./../components/UserOnlineList.vue"
import { emptyImageFilter } from "../utils/mixins";

export default {
  name: "chat",
  components: { SideNavBar, MessageBoard, UserOnlineList },
  mixins: [emptyImageFilter]
}
</script>