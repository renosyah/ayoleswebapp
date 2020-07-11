<template>
    <div class="Login">
        <LoginComponent />
    </div>
</template>
<script>

import LoginComponent from '../components/LoginComponent.vue'

export default {
    name : 'Login',
    components : {
        LoginComponent
    }
}
</script>
<style scoped>
.Login {
  background: #0D47A1; /* fallback for old browsers */
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position:fixed;
  width:100%;
  height:100%;
  top:0px;
  left:0px;
  z-index:-1;
}
</style>