<template>
  <div class="container main-container">
    <div class="row">
      <SideNavBar class="col-3 border-end" />

      <!-- ReplyDetail -->
      <div class="col-5 p-0 main-container">
        <TopNavBar msg="推文" :show="true" />
        <!-- Tweet Detail -->
        <div class="tweets-container">
          <TweetContent
            :tweet="tweet"
            @after-click-modal="afterClickModal" 
          />
          <!-- ReplyDetailList -->
          <TweetsCard
            v-for="reply in replies"
            :key="reply.id"
            :initial-data="reply"
            :replyTweet="tweet"
            @after-click-modal="afterClickModal"
          />
          <TweetReplyModal :target-tweet="modalContent"
          @after-create-reply="afterCreateReply"/>
        </div>
      </div>

      <div class="col-4 border-start">
        <RecFollowingList />
      </div>
    </div>
  </div>
</template>

<script>
import SideNavBar from "./../components/SideNavBar.vue";
import TopNavBar from "./../components/TopNavBar.vue";
import RecFollowingList from "./../components/RecFollowingsList.vue";
import TweetContent from "./../components/TweetContent.vue";
import TweetsCard from "../components/TweetsCard.vue";
import TweetReplyModal from "../components/TweetReplyModal.vue";

const currentUser = {
  id: 4,
  name: "Teddy",
  account: "teddy0323",
  image: "./../assets/Logo.png",
}
const dummyTweet = {
    id: 11,
    User: {
      id: 1,
      name: "Apple",
      account: "apple1234",
      image:
        "https://tse4.mm.bing.net/th?id=OIP.-C08ivJ6oLNEELI4SkjElgHaHa&pid=Api&P=0&w=300&h=300",
    },
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    createdAt: new Date(2021, 6, 5, 10, 10),
    repliesCount: 6,
    likesCount: 4,
    isLiked: true,
    Replies: [
      {
        id: 16,
        UserId: 2,
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
        UserId: 3,
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
        UserId: 4,
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
        UserId: 1,
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
        UserId: 7,
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
        UserId: 6,
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
    ],
  }
  ;

export default {
  name: "Tweet",
  components: {
    SideNavBar,
    TopNavBar,
    RecFollowingList,
    TweetContent,
    TweetsCard,
    TweetReplyModal,
  },
  data() {
    return {
      currentUser,
      tweet: {},
      replies: [],
      modalContent: {},
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      const { id, User, text,  createdAt, repliesCount, likesCount, isLiked, Replies } = dummyTweet
      this.tweet = {
        ...this.tweet,
        id,
        User,
        text,
        createdAt,
        repliesCount,
        likesCount,
        isLiked
      }
      this.replies = Replies
      this.currentUser = {
        ...this.currentUser,
        ...currentUser,
      };
    },
    afterClickModal(data) {
      this.modalContent = {
        ...this.modalContent,
        ...data,
      };
    },
    afterCreateReply (payload) {
      const { id, UserId, text, likesCount, repliesCount, isLiked } = payload
      this.replies.unshift({
        id,
        UserId: UserId,
        User: {
          id: this.currentUser.id,
          name: this.currentUser.name,
          account: this.currentUser.account,
          image: this.currentUser.image
        },
        text,
        createdAt: new Date(),
        likesCount,
        repliesCount,
        isLiked,
      })
      this.tweet.repliesCount += 1
    }
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

.tweets-container {
  overflow: scroll;
  height: calc(100% - 50px);
}
</style>
