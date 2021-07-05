<template>
  <div class="container">
    <LoginForm />
  </div>
</template>

<script>
import LoginForm from '../components/LoginForm.vue'
export default {
    name: 'UserLogin',
    components : {
        LoginForm
    }
    
}
</script>