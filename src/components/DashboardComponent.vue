<template>
  <div class="DashboardComponent">
      <!--- header ---> 
      <HeaderComponent v-bind:student="student" @onTabSelected="changeContent"/>
        <div v-if="content == 'home'" v-bind:key="'home'">
          
              <TopMenuMenuComponent v-bind:hint_search="'Search Course....'" v-on:on-category-click="filterCourse"  v-on:on-search-typing="filterCourse" />
              <CoursesComponent ref="courses_list" v-on:on-course-click="onCourseClick"/>
          
          </div>

          <div v-else-if="content == 'class'" v-bind:key="'class'">

                <div class="container">
                  <div class="icon-block ">
                    <h2 class="center "><img src="construct.png" /></h2>
                    <div class="row center">
                        <h5 class="header col s12 light black-text">This feature currently under Construction, please be patient</h5>
                    </div>
                </div>
              </div>

          </div>
          
          
          <div v-else-if="content == 'profile'" v-bind:key="'profile'">

                <div class="container">
                  <div class="icon-block ">
                    <h2 class="center "><img src="construct.png" /></h2>
                    <div class="row center">
                        <h5 class="header col s12 light black-text">This feature currently under Construction, please be patient</h5>
                    </div>
                </div>
              </div>
              
          </div>
      </div>
</template>
<script>

import HeaderComponent from './dashboard/HeaderComponent.vue'
import TopMenuMenuComponent from './dashboard/TopMenuComponent.vue'
import CoursesComponent from './dashboard/CoursesComponent.vue'

export default {
  name: 'Dashboard',
  components : {
      HeaderComponent,
      TopMenuMenuComponent,
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
    },
    onCourseClick(course){
        console.log(course)
    },
  }
}
</script>

<style scoped>

</style>
