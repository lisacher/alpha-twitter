<template>
  <div class="d-grid gap-2">
    <button
      class="btn button edit-profile"
      type="button"
      data-bs-toggle="modal"
      data-bs-target="#editFormModal"
    >
      編輯個人資料
    </button>
    <!-- modal -->
    <div
      class="modal fade"
      id="editFormModal"
      tabindex="-1"
      aria-labelledby="edit-form-modal"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div
            class="modal-header justify-content-start align-items-center py-2"
          >
            <button
              type="button"
              class="btn close-btn p-0 d-flex align-items-center"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <img src="./../assets/icon_close@2x.png" alt="" />
            </button>
            <p class="ms-4">編輯個人資料</p>
            <button class="btn save ms-auto">儲存</button>
          </div>
          <!-- form -->
          <form class="modal-body p-0">

            <div class="cover-container">
              <img :src="user.cover" alt="" />
            </div>

            <div class="avatar-container">
              <img :src="user.avatar | emptyImage" alt="" />
            </div>

            <div class="description-container px-3 pb-5">
              <div class="row">
                <label for="name">名稱</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  maxlength="50"
                  required
                  :value="user.name"
                />
                <div class="info text-end">
                  {{user.name.length}}/50
                </div>
              </div>

              <div class="row">
                <label for="name">自我介紹</label>
                <textarea
                  id="name"
                  name="bio"
                  type="text"
                  rows="5"
                  maxlength="160"
                  :value="user.bio"
                />
                <div class="info text-end">
                  {{user.bio.length}}/160
                </div>
              </div>
            </div>

            
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { emptyImageFilter } from "./../utils/mixins";

export default {
  name: "UserProfileEditForm",
  mixins: [emptyImageFilter],
  props: {
    initailUser: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      user: {},
    };
  },
  created() {
    this.fetchUser();
  },
  methods: {
    fetchUser() {
      this.user = this.initailUser;
    },
  },
};
</script>

<style scoped>
button.edit-profile {
  background: #fff;
  color: #ff6600;
  border-radius: 100px;
  border: 1px solid #ff6600;
  font-size: 14px;
  margin-left: 20px;
}

button.edit-profile:hover {
  background: #ff6600;
  color: #fff;
}

.modal-content {
  border-radius: 14px;
  border: 0;
}

.modal-header img {
  height: 20px;
  width: 20px;
}

.modal-header {
  font-size: 19px;
  font-weight: 500;
}

button.save {
  background: #ff6600;
  color: #fff;
  height: 30px;
  line-height: 30px;
  padding: 0 12px 0 12px;
  border-radius: 100px;
  font-size: 18px;
}

.modal-body {
  padding-top: 15px;
}

.cover-container img {
  height: 200px;
  width: 100%;
  object-fit: cover;
  object-position: 50% 50%;
}

.avatar-container {
  position: absolute;
  top: 200px;
  left: 15px;
  transform: translateY(-50%);
}

.avatar-container img {
  width: 140px;
  height: 140px;
  object-fit: cover;
  object-position: center center;
  background-color: #000;
  border-radius: 50%;
  border: 4px solid #fff;
}

.description-container {
  padding-top: 75px;
}

.row {
  width: 100%;
  margin: 10px 0;
}
.row label {
  padding-left: 11px;
  color: #657786;
  background-color: #f5f8fa;
  font-weight: 700;
  display: block;
  width: 100%;
}
.row input, .row textarea {
  padding-left: 11px;
  font-weight: 500;
  font-size: 19px;
  background-color: #f5f8fa;
  width: 100%;
  border: none;
  border-bottom: 2px solid #657786;
}

.row textarea {
  resize: none;
}
</style>