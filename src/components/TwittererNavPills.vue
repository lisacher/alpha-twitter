<template>
  <ul class="nav nav-tabs">
    <li
      v-for="tab in tabs"
      :key="tab.id"
      class="nav-item"
    >
      <router-link
        :to="tab.path"
        class="nav-link"
      >
        {{tab.title}}
      </router-link>
    </li>

  </ul>
</template>

<script>
import {v4 as uuidv4} from 'uuid'

export default {
  name: 'TwittererNavPills',
  data() {
    return {
      tabs: [
        {
          id: uuidv4(),
          title: '推文',
          path: { name: 'user-tweets', params: { id: 1}}
        },
        {
          id:uuidv4(),
          title: '推文與回覆',
          path: '/',

        },
        {
          id:uuidv4(),
          title: '喜歡的內容',
          path: { name: 'user-likes', params: { id: 1}}
        }
      ]
    }
  },
}
</script>

<style scoped>
  .nav-item {
    width: 130px;
    font-size: 15px;
    text-align: center;
    margin-bottom: 0px;
  }

  .nav-item .nav-link {
    font-size: 15px;
    border: none;
    color: #657786;
  }

  .nav-item:hover .nav-link{
    color: #f60;
    border: none;
    border-bottom: 2px solid #f60;
  }

  .nav-item .active {
    color: #f60;
    border: none;
    border-bottom: 2px solid #f60;
  }
</style>