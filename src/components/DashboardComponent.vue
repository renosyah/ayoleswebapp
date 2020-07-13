<template>
  <div class="DashboardComponent">
      <!--- header ---> 
      <HeaderComponent v-bind:student="student" @onTabSelected="changeContent"/>
        <div v-if="content == 'home'">
          <div class="row">
            <div class="col s12 m4 l2">
              <SideMenuComponent ref="side_menu" v-on:on-category-click="filterCourse"  v-on:on-search-typing="filterCourse" />
            </div>
            <div class="col s12 m8 l10">
              <CoursesComponent ref="courses_list" />
            </div>
           </div>   
          </div>

          <div v-else-if="content == 'class'">
            <!--- class content --->
            <p>Class</p>
          </div>
          
          
          <div v-else-if="content == 'profile'">
            <!--- profile content --->
            <p>Profile</p>
          </div>
      </div>
</template>
<script>

import HeaderComponent from './dashboard/HeaderComponent.vue'
import SideMenuComponent from './dashboard/SideMenuComponent.vue'
import CoursesComponent from './dashboard/CoursesComponent.vue'

export default {
  name: 'Dashboard',
  components : {
      HeaderComponent,
      SideMenuComponent,
      CoursesComponent
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
    filterCourse(filter){
      this.$refs.courses_list.getCourseWithFilter(filter.category_id,filter.teacher_id,filter.search_value)
    },
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
