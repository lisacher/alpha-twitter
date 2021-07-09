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
          <TweetandReply
            v-for="reply in replies"
            :key="reply.id"
            :initial-data="reply"
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
import SideNavBar from "../components/SideNavBar.vue";
import RecFollowingList from "../components/RecFollowingsList.vue";
import TopNavBar from "../components/TopNavBar.vue";
import TweetererImformation from "../components/TwittererInfomation.vue";
import TwittererNavPills from '../components/TwittererNavPills.vue'
import TweetandReply from '../components/TweetandReply.vue'

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

const dummyReplies = [
  {
    id: 11,
    User: {
      id: 1,
      name: "Yun1",
      account: "yundwdsd",
      avatar: "./../assets/Logo.png",
    },
    Replies: {
      id: 5,
      content: "root的回覆，片片蝶衣輕，點點猩紅小。道是天公不惜花，百種千般巧。朝見樹頭繁，暮見枝頭少。道是天公果惜花，雨洗風吹了。",
      createdAt: new Date(2021, 6, 5, 10, 10),
      ReplyUser: {
        id: 3,
        avatar: null,
        name: "root",
        account: "@root"
      }
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
      name: "Teddy2",
      account: "teddy0323",
      avatar: "./../assets/Logo.png",
    },
    Replies: {
      id: 5,
      content: "小貓咪的回覆",
      createdAt: new Date(2021, 6, 5, 10, 10),
      ReplyUser: {
        id: 4,
        avatar: null,
        name: "cat",
        account: "@cat2344"
      }
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
      name: "Apple3",
      account: "apple333",
      avatar: "./../assets/Logo.png",
    },
    Replies: {
      id: 5,
      content: "Cathy的回覆，問訊湖邊春色，重來又是三年。東風吹我過湖船。楊柳絲絲拂面。",
      createdAt: new Date(2021, 6, 5, 10, 10),
      ReplyUser: {
        id: 6,
        avatar: null,
        name: "Cathy",
        account: "@cathy"
      }
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
      name: "July4",
      account: "julysss",
      avatar: "./../assets/Logo.png",
    },
    Replies: {
      id: 5,
      content: "daisy的回覆，新月曲如眉，未有團圞意。紅豆不堪看，滿眼相思淚。終日劈桃穰，人在心兒裏。兩耳隔牆花，早晚成連理。",
      createdAt: new Date(2021, 6, 5, 10, 10),
      ReplyUser: {
        id: 8,
        avatar: null,
        name: "daisy",
        account: "@daisy"
      }
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
    TweetandReply,
    TweetererImformation,
    TwittererNavPills
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
      replies: [],
    };
  },

  created() {
    this.fetchUser();
    this.fetchReplies();
  },
  methods: {
    fetchUser() {
      this.User = {
        ...this.User,
        ...user,
      };
    },
    fetchReplies() {
      this.replies = dummyReplies;
    },
    afterFormSubmit(formData) {
      for (let [name, value] of formData.entries()) {
        console.log(name + ": " + value);
      }
    }
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