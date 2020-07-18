<template>
      <div class="ProfileUpdate">
        <nav>
            <div class="nav-wrapper">
            <a href="#" class="brand-logo center">Profile Update</a>
            <ul id="nav-mobile" class="left">
                <li><a v-on:click="$router.go(-1)"><i class="material-icons">arrow_back_ios</i></a></li>
            </ul>
            </div>
        </nav>
        <ProfileTabComponent />
      </div>
</template>

<script>

import ProfileTabComponent from '../components/tabMenu/ProfileTabComponent.vue'

export default {
    name : 'ProfileUpdate',
    components : {
        ProfileTabComponent
    }
}
</script>


<style scoped>

.nav-wrapper {
    background: #0D47A1;
}

.ProfileUpdate {
  background: #ffffff; /* fallback for old browsers */
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;      
}

#navigation-header {
    background-color: #0D47A1; /* fallback for old browsers */
    font-family: "Roboto", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

a {
    cursor: pointer;
}
</style>