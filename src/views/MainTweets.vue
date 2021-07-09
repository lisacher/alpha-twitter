<template>
  <div class="container main-container">
    <div class="row">
      <SideNavBar class="col-3" />
      <div class="col-5 p-0 border main-component">
        <TopNavBar msg="首頁" :show="false" :tweetsCount="0" />
        <div class="tweets-container">
          <CreateTweet 
            :current-user="currentUser" 
            @after-create-tweet="afterCreateTweet"
          />
          <TweetsCard 
            v-for="tweet in tweets" 
            :key="tweet.id" 
            :initial-data="tweet" 
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
import { v4 as uuidv4 } from 'uuid'

import SideNavBar from "./../components/SideNavBar.vue";
import RecFollowingList from "./../components/RecFollowingsList.vue";
import TopNavBar from "./../components/TopNavBar.vue";
import CreateTweet from "../components/CreateTweet.vue";
import TweetsCard from "./../components/TweetsCard.vue";
import TweetReplyModal from './../components/TweetReplyModal.vue'

const currentUser = {
  id: 1,
  name: "Teddy",
  account: "teddy0323",
  image: "",
};

const dummyTweets = [
  {
    id: 11,
    User: {
      id: 1,
      name: "Teddy",
      account: "teddy0323",
      image: "./../assets/Logo.png",
    },
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia architecto hic, optio aut enim exercitationem blanditiis libero, assumenda quos cupiditate quae, eligendi pariatur sit tenetur eveniet at voluptatibus. Quo, cumque.",
    createdAt: new Date('July 20, 69 00:20:18 GMT+00:00'),
    repliesCount: 13,
    likesCount: 4,
    isLiked: true,
  },
  {
    id: 16,
    User: {
      id: 4,
      name: "Debbie",
      account: "debbie8820",
      image: "./../assets/Logo.png",
    },
    text: "Lorem ipsum dolanditiis libero, niet   at vol at vol at vol  at voluptatibus. Quo, cim exercitationem blanditiis liacumque.",
    createdAt: new Date('July 21, 69 00:20:18 GMT+00:00'),
    repliesCount: 13,
    likesCount: 66,
    isLiked: true,
  },
  {
    id: 17,
    User: {
      id: 4,
      name: "Debbie",
      account: "debbie8820",
      image: "./../assets/Logo.png",
    },
    text: "Lorem ipsum dolanditiis libero, niet   at vol at vol at vol  at voluptatibus. Quo, cim exercitationem blanditiis liacumque.",
    createdAt: new Date('July 20, 69 00:20:18 GMT+00:00'),
    repliesCount: 13,
    likesCount: 17,
    isLiked: true,
  },
  {
    id: 18,
    User: {
      id: 4,
      name: "Debbie",
      account: "debbie8820",
      image: "./../assets/Logo.png",
    },
    text: "Lorem ipsum dolanditiis libero, niet   at vol at vol at vol  at voluptatibus. Quo, cim exercitationem blanditiis liacumque.",
    createdAt: new Date('July 20, 69 00:20:18 GMT+00:00'),
    repliesCount: 0,
    likesCount: 0,
    isLiked: false,
  },
  {
    id: 12,
    User: {
      id: 2,
      name: "Yun",
      account: "lisacher",
      image: "./../assets/Logo.png",
    },
    text: "Lorem ipsum dolor sitcing elit. Officim exercitationem blanditiis liae, eligendi pariatur sit tenetur eveniet at voluptatibus. Quo, cumque.",
    createdAt: new Date('July 25, 69 00:20:18 GMT+00:00'),
    repliesCount: 13,
    likesCount: 4,
    isLiked: false,
  },
  {
    id: 13,
    User: {
      id: 3,
      name: "Carlos",
      account: "carlos811009",
      image: "./../assets/Logo.png",
    },
    text: "Lorem ipsum dolanditiis libero, niet at voluptatibus. Quo, cumque.",
    createdAt: new Date('July 20, 69 00:20:18 GMT+00:00'),
    repliesCount: 5,
    likesCount: 7,
    isLiked: true,
  },
  {
    id: 14,
    User: {
      id: 4,
      name: "Debbie",
      account: "debbie8820",
      image: "./../assets/Logo.png",
    },
    text: "Lorem ipsum dolanditiis libero, niet at voluptatibus. Quo, cim exercitationem blanditiis liacumque.",
    createdAt: new Date('July 22, 69 00:20:18 GMT+00:00'),
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
    CreateTweet,
    TweetsCard,
    TweetReplyModal
  },
  data() {
    return {
      currentUser: {
        id: -1,
        name: "",
        account: "",
        image: "",
      },
      tweets: [],
      modalContent: {},
    };
  },

  created() {
    this.fetchUser();
    this.fetchTweets();
  },
  methods: {
    fetchUser() {
      this.currentUser = {
        ...this.currentUser,
        ...currentUser,
      };
    },
    fetchTweets() {
      this.tweets = [
        ...this.tweets,
        ...dummyTweets
      ]

      this.tweets.sort((a, b) => {
        return b.createdAt.getTime() - a.createdAt.getTime()
      })
    },
    afterCreateTweet({ text }) {
      this.tweets.unshift({
        id: uuidv4(),
        User: {
          id: this.currentUser.id,
          name: this.currentUser.name,
          account: this.currentUser.account,
          image: this.currentUser.image

        },
        text,
        createdAt: new Date(),
        isLiked: false,
        likesCount: 0,
        repliesCount: 0
      })
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