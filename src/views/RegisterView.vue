<template>
    <div class="Register">
        <nav>
            <div class="nav-wrapper">
            <a href="#" class="brand-logo center">Sign Up</a>
            <ul id="nav-mobile" class="left">
                <li><a href="/">Back</a></li>
            </ul>
            </div>
        </nav>
        <RegisterComponent />
    </div>
</template>
<script>

import RegisterComponent from '../components/RegisterComponent.vue'

export default {
    name : 'Register',
    components : {
        RegisterComponent
    }
}
</script>
<style scoped>
.nav-wrapper {
    background: #0D47A1;
}

.Register {
  background: #ffffff; /* fallback for old browsers */
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