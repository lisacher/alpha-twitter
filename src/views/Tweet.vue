<template>
    <div class="container main-container">
        <div class="row">
            <SideNavBar 
            class="col-3 border-end"/>

            <!-- ReplyDetail -->
            <div class="col-5 p-0 main-container">
                <TopNavBar 
                  msg="推文"
                  :show="true"
                />
            <!-- Tweet Detail -->
            <div class="tweets-container">
              <TweetContent />
              <!-- ReplyDetailList --> 
              <TweetsCard 
              v-for="tweet in tweets" 
              :key="tweet.id" 
              :initial-data="tweet"
              />
            </div>      
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


const dummyTweets = [
  {
    id: 11,
    User: {
      id: 1,
      name: "Apple",
      account: "apple1234",
      image: "https://tse4.mm.bing.net/th?id=OIP.-C08ivJ6oLNEELI4SkjElgHaHa&pid=Api&P=0&w=300&h=300",
    },
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    createdAt: new Date(2021, 6, 5, 10, 10),
    repliesCount: 13,
    likesCount: 4,
    isLiked: true,
    Replies: [
            {
                id: 5,
                content: "user1的回覆",
                isLiked: 1,
                User: {
                    avatar: null,
                    name: "root",
                    account: "@root"
                }
            },
            {
                id: 6,
                content: "user2的回覆",
                isLiked: 0,
                User: {
                    avatar: null,
                    name: "user1",
                    account: "@user1"
                }
            },
            {
                id: 7,
                content: "user3的回覆",
                isLiked: 1,
                User: {
                    avatar: null,
                    name: "user2",
                    account: "@user2"
                }
            }
        ]
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
    createdAt: new Date(2021, 5, 11, 10, 10),
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
    createdAt: new Date(2021, 5, 11, 10, 10),
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
    createdAt: new Date(2021, 5, 11, 10, 10),
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
    createdAt: new Date(2021, 6, 2, 10, 10),
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
    createdAt: new Date(2021, 5, 21, 10, 10),
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
    createdAt: new Date(2021, 5, 11, 10, 10),
    repliesCount: 6,
    likesCount: 2,
    isLiked: false,
  },
];

export default {
  components: {
    SideNavBar,
    TopNavBar,
    RecFollowingList,
    TweetContent,
    TweetsCard
  },
  data() {
    return {
      currentUser: {
        id: -1,
        name: "",
        account: "",
        image: "",
      },
      tweets: []
    }
  },
  created() {
    this.fetchTweets()
  },
  methods: {
    fetchTweets() {
      this.tweets = dummyTweets
    },
  }
};
</script>

<style scoped>

.main-container {
  height: 100%;
}

.row {
  height: 100%;
}

.tweets-container {
  overflow: scroll;
  height: calc(100% - 50px);
}
</style>
