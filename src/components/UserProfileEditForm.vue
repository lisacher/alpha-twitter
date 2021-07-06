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
          <div class="modal-header justify-content-start align-items-center py-2">
            <button
              type="button"
              class="btn close-btn p-0 d-flex align-items-center"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <img src="./../assets/icon_close@2x.png" alt=""/>
            </button>
            <p class="ms-4">編輯個人資料</p>
            <button
              class="btn save ms-auto"
            >
              儲存
            </button>
          </div>
          <form class="modal-body">
            <div class="d-flex">
              <img src="./../assets/Logo.png" alt="" />
              <textarea
                name=""
                id=""
                cols="50"
                rows="5"
                placeholder="currentUser.name | adjustAddTweetPlaceholder"
                maxlength="140"
              >
              </textarea>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserProfileEditForm",
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

.modal-body {
  padding-top: 15px;
}

form img {
  width: 50px;
  height: 50px;
}

.modal-body textarea {
  border: 0;
  resize: none;
  transform: translateY(10px);
}

.modal-body textarea:focus {
  outline: 0;
}

.modal-footer {
  border-top: 0;
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
</style>