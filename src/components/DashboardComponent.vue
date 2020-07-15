<template>
  <div class="DashboardComponent">
      <!--- header ---> 
        <TabSelectorComponent v-bind:student="student" @onTabSelected="changeContent"/>
        <HomeTabComponent v-show="content == 'home'" />
        <ClassTabComponent v-show="content == 'class'" />
        <ProfileTabComponent v-show="content == 'profile'" />
        
      </div>
</template>
<script>

import TabSelectorComponent from './input/TabSelectorComponent.vue'
import HomeTabComponent from './tabMenu/HomeTabComponent.vue'
import ClassTabComponent from './tabMenu/ClassTabComponent.vue'
import ProfileTabComponent from './tabMenu/ProfileTabComponent.vue'

HomeTabComponent.vue
export default {
  name: 'Dashboard',
  components : {
      TabSelectorComponent,
      HomeTabComponent,
      ClassTabComponent,
      ProfileTabComponent
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

</style>
