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
                />
                <TwittererFollowNavPills 
                :id="User.id"/>
            <!-- Tweet Detail -->
                <TwittererFollowTable 
                v-for="follower of followers"
                :key="follower.id"
                :initial-data="follower" />
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

const dummyFollowers = [
  {
    id: 2,
    name: "Apple",
    account: "apple123",
    avatar: "https://p1.pstatp.com/origin/pgc-image/f2d321f3b9e14ce2b953392e2b076718.jpeg",
    cover: "https://fakeimg.pl/200x200",
    bio: "哈囉你好",
    tweetsCount: 7,
    followingsCounts: 22,
    followersCounts: 25,
    isFollowed: true,
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
      followers: [],
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
      this.followers = dummyFollowers
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