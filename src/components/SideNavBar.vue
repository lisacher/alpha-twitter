<template>
  <div>
    <nav class="container">
      <div class="nav-logo mb-4">
        <img src="./../assets/Logo.png" alt="" />
      </div>
      <div class="nav-list">
        <ul class="nav flex-column me-3 pe-5">
          <li class="nav-item mb-2">
            <router-link to="/main" class="nav-link">
              <img class="me-3 home" src="./../assets/home@2x.png" alt="">
              <span>首頁</span>
            </router-link>
          </li>
          <li class="nav-item mb-2">
            <router-link to="/" class="nav-link">
              <img class="me-3 profile" src="./../assets/profile@2x.png" alt="">
              <span>個人資料</span>
            </router-link>
          </li>
          <li class="nav-item mb-2">
            <router-link to="/" class="nav-link">
              <img class="me-3 setting" src="./../assets/Setting@2x.png" alt="">
              <span>設定</span>
            </router-link>
          </li>
          <li class="nav-item mt-2">
            <div class="d-grid gap-2">
              <button
                class="btn tweet-button"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#tweetModal"
              >
                推文
              </button>
            </div>
          </li>
          <li class="nav-item mb-3 nav-item-logout">
            <router-link to="/" class="nav-link">
              <img class="me-3 logout" src="./../assets/logout@2x.png" alt="">
              <span>登出</span>
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
    <!-- tweet modal -->
    <div
      class="modal fade"
      id="tweetModal"
      tabindex="-1"
      aria-labelledby="tweet-modal"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <button
              type="button"
              class="btn-close mx-0"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body d-flex">
            <img src="./../assets/Logo.png" alt="">
            <textarea 
              name="" 
              id="" 
              cols="50" 
              rows="10" 
              placeholder="有什麼新鮮事？">

            </textarea>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary">推文</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.container  {
  height: 100%
}

img {
  width: 50px;
  height: 50px;
}

.nav {
  position: relative;
}

.nav-list {
  height: calc(100% - 74px);
}

.nav-list ul {
  height: 100%;
}

.nav-item span {
  font-size: 14px;
  font-weight: 700;
  color: #000;
}

.nav-item:hover span{
  color: #ff6600;
}

.active span {
  color: #ff6600;
}

.nav-item button.tweet-button {
  background: #ff6600;
  color: #fff;
  border-radius: 100px;
  font-size: 14px;
  margin-left: 20px;
}

.nav-item-logout {
  position: absolute;
  bottom: 10px;
  left: 0px;
}

img.profile {
  height: 20.34px;
  width: 16.7px;
}

img.home {
  width: 22.2px;
  height: 20.25px;
}

img.setting {
  height: 20.75px;
  width: 20.75px;
}

img.logout {
  width: 18px;
  height: 16px;
}

.modal-content {
  border-radius: 14px;
  border: 0;
}

.modal-body {
  padding-top: 15px;
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

.modal-footer button {
  background: #FF6600;
  border: 0 solid #000;
  border-radius: 100px;
}
</style>