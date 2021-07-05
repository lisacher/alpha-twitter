<template>
  <div class="nav-top d-flex align-items-center">
    <div class="back">
      <button 
        type="button" 
        class="btn back-button" 
        :class="{none: !show}"
        @click="$router.back()">
          &#8592;
        
        </button>
    </div>
    <div class="title ps-4">
      <div class="page-name">{{ msg }}</div>
      <div 
        v-show="tweetsCount"
        class="follows-count"
      > {{ tweetsCount }} 推文 </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TopNavBar",
  props: {
    msg : String,
    show: {
      type: Boolean,
      default: false
    },
    tweetsCount: {
      type: Number,
      required: false
    }
  },
};
</script>

<style scoped>

  .nav-top {
    height: 55px ;
  }

  .back-button {
    font-size: 20px;
  }

  .none {
    display: none;
  }
  .page-name {
    font-size: 18px;
    font-weight: 700;
  }

  .follows-count {
    font-size: 12px;
  }
</style>