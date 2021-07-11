<template>
  <ul class="nav nav-tabs">
    <li
      class="nav-item"
    >
      <router-link
        :to="{ name: 'user-tweets', params: { id: this.id }}"
        class="nav-link"
      >
      推文
      </router-link>
    </li>
    <li
      class="nav-item"
    >
      <router-link
        :to="{ name: 'user-reply', params: { id: this.id }}"
        class="nav-link"
      >
      推文與回覆
      </router-link>
    </li>
    <li
      class="nav-item"
    >
      <router-link
        :to="{ name: 'user-likes', params: { id: this.id }}"
        class="nav-link"
      >
      喜歡的內容
      </router-link>
    </li>

  </ul>
</template>

<script>
export default {
  name: 'TwittererNavPills',
  props: {
    initialId: {
      type: Number,
      required: true
    }
  },
  watch: {
    initialId(newValue) {
      this.id = newValue
    }
  },
  created() {
    this.fetchId()
  },
  data() {
    return {
      id: -1
    }
  },
  methods: {
     fetchId() {
      this.id =  this.initialId
    }
  }
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