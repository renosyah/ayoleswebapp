<template>
  <div class="Dashboard">
        <TabSelectorComponent v-bind:student="student" @onTabSelected="changeContent"/>
        <HomeTabComponent v-show="content == 'home'" />
        <ClassTabComponent v-show="content == 'class'" />
        <ProfileTabComponent v-show="content == 'profile'" />
        <LogoutButtonComponent v-show="content == 'profile'" />
        <AddToHomeScreenView />
  </div>
</template>
<script>

import TabSelectorComponent from '../components/input/TabSelectorComponent.vue'
import HomeTabComponent from '../components/tabMenu/HomeTabComponent.vue'
import ClassTabComponent from '../components/tabMenu/ClassTabComponent.vue'
import ProfileTabComponent from '../components/tabMenu/ProfileTabComponent.vue'
import LogoutButtonComponent from '../components/input/LogoutButtonComponent.vue'
import AddToHomeScreenView from './AddToHomeScreenView.vue'

export default {
  name: 'Dashboard',
  components : {
    TabSelectorComponent,
    HomeTabComponent,
    ClassTabComponent,
    ProfileTabComponent,
    LogoutButtonComponent,
    AddToHomeScreenView
  },
  data(){
      return {
           student : {
               id : '',
               name : '',
               email : ''
           },
          content : 'home'
      }
  },
  created(){
    this.loadSession()
  },
  methods : {
    loadSession(){
      if (localStorage.getItem('student_session')) {
        try {
          this.student = JSON.parse(localStorage.getItem('student_session'));
        } catch(e) {
          console.log(e)
        }
      } else {
          this.$router.push({name: "Index"})
      }
    },
    changeContent(pageName){
      this.content = pageName
    }
  }
}
</script>

<style scoped>

.Dashboard {
    background: #ffffff; /* fallback for old browsers */
    font-family: "Roboto", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    width:100%;
    height:100%;
    top:0px;
    left:0px;
    z-index:-1;
}
</style>
