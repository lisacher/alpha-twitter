<template>
  <div class="container main-container">
    <div class="row">
      <SideNavBar class="col-3" />
      <div class="col-5 p-0 border main-component">
        <TopNavBar :msg="User.name" :show="true" :tweetsCount="tweets.length" />
        <div class="tweets-container">
          <TweetererImformation 
            :initial-user="User"
          />
          <TweetsCard
            v-for="tweet in tweets"
            :key="tweet.id"
            :initial-data="tweet"
          />
        </div>
      </div>
      <div class="col-4">
        <RecFollowingList />
      </div>
    </div>
  </div>
</template>

<script>
import SideNavBar from "./../components/SideNavBar.vue";
import RecFollowingList from "./../components/RecFollowingsList.vue";
import TopNavBar from "./../components/TopNavBar.vue";
import TweetsCard from "./../components/TweetsCard.vue";
import TweetererImformation from "./../components/TwittererInfomation.vue";

const user = 
  {
    id: 2,
    name: "Yun",
    account: "lisacher",
    avatar: "",
    cover: "",
    bio: "ABBC.",
    followingsCounts: 22,
    followersCounts: 25,
    isLiked: false
  }
;

const dummyTweets = [
  {
    id: 11,
    User: {
      id: 1,
      name: "Teddy",
      account: "teddy0323",
      avatar: "./../assets/Logo.png",
    },
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia architecto hic, optio aut enim exercitationem blanditiis libero, assumenda quos cupiditate quae, eligendi pariatur sit tenetur eveniet at voluptatibus. Quo, cumque.",
    createdAt: new Date(2021, 6, 5, 10, 10),
    repliesCount: 13,
    likesCount: 4,
    isLiked: true,
  },
  {
    id: 16,
    User: {
      id: 4,
      name: "Teddy",
      account: "teddy0323",
      avatar: "./../assets/Logo.png",
    },
    text: "Lorem ipsum dolanditiis libero, niet   at vol at vol at vol  at voluptatibus. Quo, cim exercitationem blanditiis liacumque.",
    createdAt: new Date(2021, 5, 11, 10, 10),
    repliesCount: 13,
    likesCount: 66,
    isLiked: true,
  },
  {
    id: 17,
    User: {
      id: 4,
      name: "Teddy",
      account: "teddy0323",
      avatar: "./../assets/Logo.png",
    },
    text: "Lorem ipsum dolanditiis libero, niet   at vol at vol at vol  at voluptatibus. Quo, cim exercitationem blanditiis liacumque.",
    createdAt: new Date(2021, 5, 11, 10, 10),
    repliesCount: 13,
    likesCount: 17,
    isLiked: true,
  },
  {
    id: 18,
    User: {
      id: 4,
      name: "Teddy",
      account: "teddy0323",
      avatar: "./../assets/Logo.png",
    },
    text: "Lorem ipsum dolanditiis libero, niet   at vol at vol at vol  at voluptatibus. Quo, cim exercitationem blanditiis liacumque.",
    createdAt: new Date(2021, 5, 11, 10, 10),
    repliesCount: 0,
    likesCount: 0,
    isLiked: false,
  },
  {
    id: 12,
    User: {
      id: 2,
      name: "Teddy",
      account: "teddy0323",
      avatar: "./../assets/Logo.png",
    },
    text: "Lorem ipsum dolor sitcing elit. Officim exercitationem blanditiis liae, eligendi pariatur sit tenetur eveniet at voluptatibus. Quo, cumque.",
    createdAt: new Date(2021, 6, 2, 10, 10),
    repliesCount: 13,
    likesCount: 4,
    isLiked: false,
  },
  {
    id: 13,
    User: {
      id: 3,
      name: "Teddy",
      account: "teddy0323",
      avatar: "./../assets/Logo.png",
    },
    text: "Lorem ipsum dolanditiis libero, niet at voluptatibus. Quo, cumque.",
    createdAt: new Date(2021, 5, 21, 10, 10),
    repliesCount: 5,
    likesCount: 7,
    isLiked: true,
  },
  {
    id: 14,
    User: {
      id: 4,
      name: "Teddy",
      account: "teddy0323",
      avatar: "./../assets/Logo.png",
    },
    text: "Lorem ipsum dolanditiis libero, niet at voluptatibus. Quo, cim exercitationem blanditiis liacumque.",
    createdAt: new Date(2021, 5, 11, 10, 10),
    repliesCount: 6,
    likesCount: 2,
    isLiked: false,
  },
];

export default {
  name: "main-tweets",
  components: {
    SideNavBar,
    RecFollowingList,
    TopNavBar,
    TweetsCard,
    TweetererImformation,
  },
  data() {
    return {
      User: {
        id: -1,
        name: "",
        account: "",
        avatar: "",
        cover: "",
        bio: "",
        followingsCounts: 0,
        followersCounts: 0,
      },
      tweets: [],
    };
  },

  created() {
    this.fetchUser();
    this.fetchTweets();
  },
  methods: {
    fetchUser() {
      this.User = {
        ...this.User,
        ...user,
      };
    },
    fetchTweets() {
      this.tweets = dummyTweets;
    },
  },
};
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
  margin-top: 50px;
  height: calc(100% - 50px);
  overflow: scroll;
}

.row {
  height: 100%;
}
</style>