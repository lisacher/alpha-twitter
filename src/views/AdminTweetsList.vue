<template>
  <div class="container main-container">
    <div class="row">
      <SideNavBar class="col-3" :isAdmin="true" />
      <div class="col-9 p-0 border main-component">
        <TopNavBar msg="推文清單" :show="false" />
        
        <div class="tweets-container">
          <Spinner v-if="isLoading" />
          <template v-else>
          <AdminTweetsCard
            v-for="tweet in tweets"
            :key="tweet.id"
            :tweet="tweet"
            @after-generate-target="afterGenerateTarget"
          />
        
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
                  <div>您確定要刪除此則推文嗎？</div>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body text-center">推文刪除後將無法復原</div>
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
                    @click.prevent.stop="deleteTweet(deleteTargetId)"
                  >
                    確定
                  </button>
                </div>
              </div>
            </div>
          </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SideNavBar from "./../components/SideNavBar.vue";
import TopNavBar from "./../components/TopNavBar.vue";
import AdminTweetsCard from "./../components/AdminTweetsCard.vue";

import tweetsAPI from "./../apis/tweets";
import { Toast } from "./../utils/helpers";
import Spinner from '../components/Spinner.vue';

export default {
  name: "AdminTweetsList",
  components: {
    SideNavBar,
    TopNavBar,
    AdminTweetsCard,
    Spinner,
  },
  data() {
    return {
      tweets: [],
      deleteTargetId: 0,
      isLoading: true
    };
  },
  created() {
    this.fetchTweets();
  },
  methods: {
    async fetchTweets() {
      try {
        const { data } = await tweetsAPI.getAdminTweets();
        this.tweets = data;

        this.tweets.sort((a, b) => {
          const aDate = new Date(a.createdAt)
          const bDate = new Date(b.createdAt)
          return bDate.getTime() - aDate.getTime()
        })
        this.isLoading = false
      } catch (error) {
        this.isLoading = false
        Toast.fire({
          icon: "error",
          title: "無法取得推文資料，請稍後再試",
        });
      }
    },
    afterGenerateTarget({ tweetId })  {
      this.deleteTargetId = tweetId
    },

    async deleteTweet(deleteTargetId) {
      try {
        const { data } = await tweetsAPI.deleteTweet({ tweetId: deleteTargetId });

        if (data.status === "error") {
          throw new Error(data.message);
        }
        this.tweets = this.tweets.filter((tweet) => tweet.id !== this.deleteTargetId);

      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "目前無法刪除貼文，請稍後再試",
        });
      }
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

.modal-header {
  font-size: 16px;
  font-weight: 700;
}

.modal-body {
  height: 150px;
  line-height: 118px;
  font-size: 18px;
  font-weight: 700;
  color: red;
}
</style>