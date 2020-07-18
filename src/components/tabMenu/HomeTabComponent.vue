<template>
    <div class="homeTab">
        <TopMenuMenuComponent v-bind:hint_search="'Search Course....'" v-on:on-category-click="filterCourse"  v-on:on-search-typing="filterCourse" />
        <CoursesComponent ref="courses_list" v-bind:student_id="loadSession.id" v-on:on-course-click="onCourseClick"/>
    </div>
</template>

<script>

import TopMenuMenuComponent from '../input/TopMenuComponent.vue'
import CoursesComponent from '../listViewer/CoursesComponent.vue'

export default {
    name : 'HomeTab',
    components : {
        TopMenuMenuComponent,
        CoursesComponent
    },
    computed : {
        loadSession(){
            let data = {
                id : '',
                name : '',
                email : ''
            }
            if (localStorage.getItem('student_session')) {
                try {
                   data = JSON.parse(localStorage.getItem('student_session'));
                } catch(e) {
                    console.log(e)
                }
            }

            return data
        }
    },
    methods : {
        filterCourse(filter){
            this.$refs.courses_list.getCourseWithFilter(filter.category_id,filter.teacher_id,filter.search_value)
        },
        onCourseClick(course){
           this.$router.push({name: "CourseDetail", query : { id : course.id }})
        }
    }
}
</script>