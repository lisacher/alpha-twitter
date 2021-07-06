<template>
    <div class="container main-container">
        <div class="row">
            <SideNavBar 
            class="col-3 border-end"/>

            <!-- ReplyDetail -->
            <div class="col-5 p-0">
                <TopNavBar 
                msg="推文"
                :show="true"
                class="border-bottom"/>
            <!-- Tweet Detail -->
            <TweetContent />
            <!-- ReplyDetailList -->
            <TweetsCard />
            </div>

            <div class="col-4 border-start">
                <RecFollowingList /> 
            </div>
        </div>
    </div>
</template>

<script>
import SideNavBar from "./../components/SideNavBar.vue"
import TopNavBar from "./../components/TopNavBar.vue"
import RecFollowingList from "./../components/RecFollowingsList.vue"
import TweetContent from "./../components/TweetContent.vue"
import TweetsCard from "../components/TweetsCard.vue"

export default {
  components: {
    SideNavBar,
    TopNavBar,
    RecFollowingList,
    TweetContent,
    TweetsCard
  },
};
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
