<template>
  <div>
    <div
      class="d-flex border tweet-container px-2"
      v-for="tweet in tweets"
      :key="tweet.id"
    >
      <div class="img-container">
        <img src="./../assets/Logo.png" alt="" />
      </div>
      <div class="text-container mt-2 flex-grow-1">
        <div class="header">
          <div class="name d-inline-block pe-2 fw-bold">
            {{ tweet.User.name }}
          </div>
          <div class="account d-inline-block">@{{ tweet.User.account }}</div>
          <div class="createdAt d-inline-block">
            ・{{ tweet.createdAt | fromNow }}
          </div>
        </div>
        <div class="body">
          <div class="text">
            {{ tweet.text }}
          </div>
        </div>
      </div>
      <div class="delete-container">
        <button
          type="button"
          class="btn btn-close mt-2"
          data-bs-toggle="modal"
          data-bs-target="#deleteModal"
          @click.prevent.stop="generatedeleteTarger(tweet.id)"
        ></button>
      </div>
    </div>
    <!-- Modal -->
    <div
      class="modal fade"
      id="deleteModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body text-center">您確定要刪除此則推文嗎？</div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              取消
            </button>
            <button
              type="button"
              class="btn btn-danger"
              data-bs-toggle="modal"
              data-bs-target="#deleteModal"
              @click.prevent.stop="deleteTweet"
            >
              確定
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { daytimeFilter } from "./../utils/mixins";

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
    createdAt: new Date(2021, 6, 5, 10, 10),
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
  },
  {
    id: 15,
    User: {
      id: 4,
      name: "Debbie",
      account: "debbie8820",
      image: "./../assets/Logo.png",
    },
    text: "Lorem ipsum dolanditiis libero, niet at voluptatibus. Quo, cim exercitationem blanditiis liacumque.",
    createdAt: new Date(2021, 5, 11, 10, 10),
  },
  {
    id: 26,
    User: {
      id: 4,
      name: "Debbie",
      account: "debbie8820",
      image: "./../assets/Logo.png",
    },
    text: "Lorem ipsum dolanditiis libero, niet at voluptatibus. Quo, cim exercitationem blanditiis liacumque.",
    createdAt: new Date(2021, 5, 11, 10, 10),
  },
  {
    id: 27,
    User: {
      id: 4,
      name: "Debbie",
      account: "debbie8820",
      image: "./../assets/Logo.png",
    },
    text: "Lorem ipsum dolanditiis libero, niet at voluptatibus. Quo, cim exercitationem blanditiis liacumque.",
    createdAt: new Date(2021, 5, 11, 10, 10),
  },
  {
    id: 28,
    User: {
      id: 4,
      name: "Debbie",
      account: "debbie8820",
      image: "./../assets/Logo.png",
    },
    text: "Lorem ipsum dolanditiis libero, niet at voluptatibus. Quo, cim exercitationem blanditiis liacumque.",
    createdAt: new Date(2021, 5, 11, 10, 10),
  },
];

export default {
  name: "AdminTweetsCard",
  mixins: [daytimeFilter],
  data() {
    return {
      tweets: [],
      deleteTarget: 0,
    };
  },
  created() {
    this.fetchTweets();
  },
  methods: {
    fetchTweets() {
      this.tweets = [...this.tweets, ...dummyTweets];
    },
    generatedeleteTarger(id) {
      this.deleteTarget = id;
    },
    deleteTweet() {
      const targetId = this.deleteTarget;
      this.tweets = this.tweets.filter((tweet) => tweet.id !== targetId);
    },
  },
};
</script>

<style scoped>
.tweet-container {
  height: 110px;
}

.img-container img {
  height: 50px;
  width: 50px;
}

.header,
.body {
  font-size: 15px;
}

.account,
.createdAt {
  color: #657786;
}

.modal-body {
  height: 150px;
  line-height: 118px;
  font-size: 18px;
  font-weight: 700;
}
</style>