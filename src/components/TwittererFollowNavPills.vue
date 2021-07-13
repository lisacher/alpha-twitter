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
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  watch: {
    id: {
      handler: function changePathId() {
       this.tabs.map(tab => tab.path.params.id = this.id)
     }
    },
  },
  data() {
    return {
      tabs: [
        {
          id: uuidv4(),
          title: '跟隨者',
          path: { name: 'user-followers', params: { id: this.id}}
        },
        {
          id: uuidv4(),
          title: '正在跟隨',
          path: { name: 'user-followings', params: { id: this.id}}
        }
      ]
    }
  }
}
</script>

<style scoped>
  .nav-item {
    width: 130px;
    height: 54px;
    font-size: 15px;
    text-align: center;
    padding-top: 15px;
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