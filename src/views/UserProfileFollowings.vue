<template>
    <div class="container main-container">
        <div class="row">
            <SideNavBar 
            class="col-3 border-end"/>

            <!-- ReplyDetail -->
            <div class="col-5 p-0 main-container border-0">
                <TopNavBar 
                  :msg="User.name"
                  :show="true"
                  :tweetsCount="User.tweetsCount"
                  class="border-bottom-0"
                />
                <TwittererFollowNavPills 
                :id="User.id"/>
            <!-- Tweet Detail -->
                <TwittererFollowTable 
                v-for="following of followings"
                :key="following.id"
                :initial-data="following" />
            <div class="followers-container">
              <!-- ReplyDetailList --> 
              
            </div>      
            </div>

            <div class="col-4 border-start">
                <RecFollowingList /> 
            </div>
        </div>
    </div>
</template>


<script>
import SideNavBar from "../components/SideNavBar.vue"
import TopNavBar from "../components/TopNavBar.vue"
import RecFollowingList from "../components/RecFollowingsList.vue"
import TwittererFollowNavPills from '../components/TwittererFollowNavPills.vue';
import TwittererFollowTable from '../components/TwittererFollowTable.vue';

const user = 
  {
    id: 1,
    name: "Yun",
    account: "lisacher",
    avatar: "",
    cover: "https://fakeimg.pl/200x200",
    bio: "ABBC.",
    tweetsCount: 7,
    followingsCounts: 22,
    followersCounts: 25,
    isFollowed: false
  }
;

const dummyFollowings = [
    {
        id: 3,
        name: "Carlos",
        account: "carlos811009",
        avatar: "https://tse3.mm.bing.net/th?id=OIP.KuI9PuK9qCUYvr52VawaEAHaHZ&pid=Api&P=0&w=300&h=300",
        cover: "https://fakeimg.pl/200x200",
        bio: "嗨～",
        tweetsCount: 7,
        followingsCounts: 22,
        followersCounts: 25,
        isFollowed: false
    },
    {
        id: 5,
        name: "Jacky",
        account: "jacky1234",
        avatar: "https://i0.wp.com/p3.pstatp.com/large/dd0000a5eac1ba380eb",
        cover: "https://fakeimg.pl/200x200",
        bio: "ABBC.",
        tweetsCount: 7,
        followingsCounts: 22,
        followersCounts: 25,
        isFollowed: false
    },
    {
        id: 6,
        name: "Cindy",
        account: "cindyyy",
        avatar: "https://p3.pstatp.com/origin/pgc-image/c1dc078deaa84cdbac337e90b6c267cf.jpeg",
        cover: "https://fakeimg.pl/200x200",
        bio: "Hi~~~~~~~~",
        tweetsCount: 7,
        followingsCounts: 22,
        followersCounts: 25,
        isFollowed: false
    },
    {
        id: 4,
        name: "Debbie",
        account: "debbie8820",
        avatar: "https://tse3.mm.bing.net/th?id=OIP.wbpwbCyShIPc9AZphoLkSgHaHf&pid=Api&P=0&w=300&h=300",
        cover: "https://fakeimg.pl/200x200",
        bio: "I'M DEBBIE!",
        tweetsCount: 7,
        followingsCounts: 22,
        followersCounts: 25,
        isFollowed: true
    }
]

export default {
    name: "UserProfileFollowers",
    components: {
        SideNavBar,
        RecFollowingList,
        TopNavBar,
        TwittererFollowNavPills,
        TwittererFollowTable
        
    },
    data() {
    return {
      User: {
        id: -1,
        name: "",
        account: "",
        avatar: "",
        bio: "",
        isFollowed: true,
      },
      followings: [],
    }
  },
  created() {
    this.fetchUser()
    this.fetchFollowers()
  },
  methods: {
    fetchUser() {
      this.User = {
        ...this.User,
        ...user,
      }
    },
    fetchFollowers() {
      this.followings = dummyFollowings
    },
  }
    
}
</script>

<style scoped>

</style>

<style scoped>
.main-container {
  height: 100%;
}

.main-component {
  height: 100%;
}

.row {
  height: 100%;
}
</style>