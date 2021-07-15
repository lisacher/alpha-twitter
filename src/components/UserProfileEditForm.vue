<template>
  <div class="d-grid gap-2">
    <button
      class="btn button edit-profile"
      type="button"
      data-bs-toggle="modal"
      data-bs-target="#editFormModal"
      @click.stop.prevent="cachedUserData"
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
        <form @submit.prevent.stop="handelSubmit">
          <div class="modal-content">
            <div
              class="modal-header justify-content-start align-items-center py-2"
            >
              <button
                type="button"
                class="btn close-btn p-0 d-flex align-items-center"
                data-bs-dismiss="modal"
                aria-label="Close"
                @click.prevent.stop="handleCancel"
              >
                <img src="./../assets/icon_close@2x.png" alt="" />
              </button>
              <p class="ms-4">編輯個人資料</p>
              <button
                class="btn save ms-auto"
                type="submit"
                :disabled="status.isProcessing"
              >
                儲存
              </button>
            </div>
            <!-- form  content -->
            <div class="modal-body p-0">
              <div class="cover-container">
                <div class="form-group">
                  <label for="cover"
                    ><img
                      src="./../assets/picture.png"
                      alt=""
                      class="edit-cover-picture"
                  /></label>
                  <img class="coverimage" :src="user.cover | emptyCover" alt=""  />
                  <input
                    type="file"
                    id="cover"
                    name="cover"
                    accept="image/*"
                    class="cover-input d-none"
                    @change="handleFileChange"
                  />
                  <button
                    class="btn delete-cover-button"
                    type="button"
                    @click.prevent.stop="deleteCover"
                  >
                    <img
                      src="./../assets/close.png"
                      alt=""
                      class="delete-cover-picture"
                    />
                  </button>
                </div>
              </div>

              <div class="avatar-container">
                <div class="form-group">
                  <label for="avatar"
                    ><img
                      src="./../assets/picture.png"
                      alt=""
                      class="edit-avatar-picture"
                  /></label>
                  <img :src="user.avatar | emptyImage" alt="" class="avatar" />
                  <input
                    type="file"
                    id="avatar"
                    name="avatar"
                    accept="image/*"
                    class="cover-input d-none"
                    @change="handleFileChange"
                  />
                </div>
              </div>

              <div class="description-container px-3 pb-5">
                <div class="form-group">
                  <label for="name">名稱</label>
                  <input
                    id="name"
                    name="name"
                    class="input"
                    type="text"
                    maxlength="50"
                    v-model="user.name"
                  />
                  <div class="info text-end">{{ user.name.length }}/50</div>
                </div>

                <div class="form-group">
                  <label for="bio">自我介紹</label>
                  <textarea
                    id="bio"
                    name="bio"
                    type="text"
                    rows="5"
                    maxlength="160"
                    v-model="user.bio"
                    placeholder="尚未輸入任何自我介紹唷！"
                  />
                  <div class="info text-end">{{ user.bio.length }}/160</div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { emptyImageFilter } from "./../utils/mixins";

import usersAPI from "./../apis/users";
import { Toast } from "./../utils/helpers";

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
      userCached: {},
      status: {
        isProcessing: false
      }
    };
  },
  created() {
    this.fetchUser();
  },
  methods: {
    fetchUser() {
      this.user = {
        ...this.user,
        ...this.initailUser,
      };
      if (this.user.bio === null) {
        this.user = {
          ...this.user,
          bio: "",
        };
      }
    },
    cachedUserData() {
      this.userCached = {
        ...this.userCached,
        ...this.user,
      };
    },
    handleFileChange(e) {
      const id = e.target.id;
      const { files } = e.target;
      // change cover
      if (id === "cover") {
        if (files.length === 0) {
          return (this.user.cover = "");
        }
        const imageURL = window.URL.createObjectURL(files[0]);
        this.user.cover = imageURL;
      } else if (id === "avatar") {
        if (files.length === 0) {
          return (this.user.avatar = "");
        }
        const imageURL = window.URL.createObjectURL(files[0]);
        this.user.avatar = imageURL;
      }
    },

    deleteCover() {
      this.user.cover = "";
    },

    async handelSubmit(e) {
      try {
        this.status.isProcessing = true
        if (!this.user.name) {
          Toast.fire({
            icon: "warning",
            title: "姓名請勿空白",
          });
          return;
        }
        const form = e.target;
        const formData = new FormData(form);

      

        const { data } = await usersAPI.update({
          id: this.user.id,
          formData,
        });

        if (data[1].status !== "success") {
          throw new Error(data.message);
        }

        this.$emit("after-form-submit");
        this.$store.commit("setCurrentUser", {
          ...this.currentUser,
          ...data[0]
        })
        
        Toast.fire({
          icon: "success",
          title: "儲存成功！",
        });
        this.status.isProcessing = false
      } catch (error) {
        this.status.isProcessing = false
        Toast.fire({
          icon: "error",
          title: "無法更新個人資料，請稍後再試。",
        });
      }
    },

    handleCancel() {
      this.user = {
        ...this.user,
        ...this.userCached,
      };
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

.form-group {
  position: relative;
}

.form-group .edit-cover-picture {
  width: 20px;
  height: 20px;
  position: absolute;
  left: 250px;
  top: 100px;
  transform: translate(-150%, -50%);
  cursor: pointer;
}

.form-group .delete-cover-button {
  padding: 0;
  border: none;
}

.form-group .edit-avatar-picture {
  width: 20px;
  height: 20px;
  position: absolute;
  left: 70px;
  top: 70px;
  transform: translate(-50%, -50%);
  cursor: pointer;
}

.form-group .delete-cover-picture {
  width: 20px;
  height: 20px;
  position: absolute;
  left: 250px;
  top: 100px;
  transform: translate(50%, -50%);
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

.avatar-container .avatar {
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
.row input,
.row textarea {
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
.input:focus,textarea:focus {
    outline: none
}
</style>