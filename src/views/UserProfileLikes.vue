<template>
  <div class="container main-container">
    <div class="row">
      <SideNavBar class="col-3" />
      <div class="col-5 p-0 border main-component">
        <TopNavBar :msg="User.name" :show="true" :tweetsCount="User.tweetsCount" />
        <div class="tweets-container">
          <TweetererImformation 
            :initial-user="User"
            @after-form-submit="afterFormSubmit"
          />
          <TwittererNavPills 
            :id="User.id"
          />
          <TweetsCard
            v-for="like in likes"
            :key="like.id"
            :initial-data="like"
            @after-click-modal="afterClickModal"
          />
          <TweetReplyModal :target-tweet="modalContent" />
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
import TwittererNavPills from './../components/TwittererNavPills.vue'
import TweetReplyModal from "../components/TweetReplyModal.vue";

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

const dummyLikes = [
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
  }
];

export default {
  name: "UserProfileLikes",
  components: {
    SideNavBar,
    RecFollowingList,
    TopNavBar,
    TweetsCard,
    TweetererImformation,
    TwittererNavPills,
    TweetReplyModal
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
      likes: [],
      modalContent: {},
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
      this.likes = dummyLikes;
    },
    afterFormSubmit(formData) {
      for (let [name, value] of formData.entries()) {
        console.log(name + ": " + value);
      }
    },
    afterClickModal(data) {
      this.modalContent = {
        ...this.modalContent,
        ...data,
      };
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
  height: calc(100% - 50px);
  overflow: scroll;
}

.row {
  height: 100%;
}
</style>