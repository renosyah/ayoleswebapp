<template>
    <div class="CoursesComponent">
        <div v-show="!status.error && !status.loading && courses.length == 0">
            <div class="container">
                <div class="icon-block ">
                    <h2 class="center "><img src="notfound.png " /></h2>
                    <div class="row center">
                        <h5 class="header col s12 light black-text">No Result Found</h5>
                    </div>
                </div>
            </div>
        </div>

        <div v-show="status.error">
            <div class="container">
                <div class="icon-block ">
                    <h2 class="center "><img src="error.png " /></h2>
                    <div class="row center">
                        <h5 class="header col s12 light black-text">Something Wrong Happend!</h5>
                    </div>
                </div>
            </div>
        </div>

        <div class="center" v-show="!status.error && courses.length > 0"> 
            <div class="row">
                <div v-for="course in courses" v-bind:key="course.id">
                    <div class="col s12 m6 l4">
                        <div class="card">
                            <div class="card-image">
                                <a v-on:click="onCourseClick(course)">
                                    <img width="120" height="220" :src="course.image_url">
                                </a>
                                <a v-on:click="onSelectCourse(course)" class="btn-floating halfway-fab waves-effect waves-light green"><i class="material-icons">add</i></a>
                            </div>
                            <div class="card-content">
                                <a v-on:click="onCourseClick(course)">
                                    <h6 class="black-text">{{ course.course_name }}</h6>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div id="loading-layout">
            <div class="container">    
                <div class="center" v-show="status.loading">
                    <div class="preloader-wrapper big active">
                        <div class="spinner-layer spinner-blue-only">
                        <div class="circle-clipper left">
                            <div class="circle"></div>
                        </div><div class="gap-patch">
                            <div class="circle"></div>
                        </div><div class="circle-clipper right">
                            <div class="circle"></div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <ModalChoiceComponent
            ref="modal_selected_course"
            v-bind="{
                title : 'Add ' + selected_course.course_name,
                message : 'are you sure want to enroll ' + selected_course.course_name + ',this course will be added to your classroom list',
                positive_button : 'Enroll',
                negative_button : 'Cancel',
            }"
            v-on:on-positive-click="checkIsClassIsExist(selected_course)"
        />

        <ModalMessageComponent ref="modal_selected_course_already_added" v-bind="{ title : 'Atention',message : 'the Course you have chosen is already in the class'}"/>

    </div>
</template>

<script>


import ModalChoiceComponent from '../util/ModalChoiceComponent.vue'
import ModalMessageComponent from '../util/ModalMessageComponent.vue'

export default {
    name : 'CoursesComponent',
    components:{
        ModalChoiceComponent,
        ModalMessageComponent
    },
    props : {
        student_id :String
    },
    data() {
        return {
            courses : [],
            query : {
                category_id : '',
                teacher_id : '',
                search_value : '',
                search_by: 'course_name',
                order_by : 'course_name',
                order_dir : 'asc',
                offset : 0,
                limit : 10
            },
            status : {
                loading : true,
                error : false
            },
            selected_course : {
                id : '',
                course_name : ''
            },
            scrolled_to_bottom: false
        }
    },
    watch : {
        scrolled_to_bottom : function(){
            this.query.offset += this.query.limit 
            this.getCourseList()
        }
    },
    created(){
        this.getCourseList()
    },
    mounted(){
        this.scroll()
    },
    methods : {
        onSelectCourse(course){
            this.selected_course.id = course.id
            this.selected_course.course_name = course.course_name
            this.$refs.modal_selected_course.showModal()
        },
        checkIsClassIsExist(selected_course){
            this.$apollo.query({
                query : require('../../graphql/detailClassRoomById.gql'),
                variables : {
                    course_id : selected_course.id,
                    student_id : this.$props.student_id
                }
                }).then(result => {

                    if (result.data.classroom_detail_by_id.id){
                        this.$refs.modal_selected_course_already_added.showModal()
                        return
                    }
                    this.onEnrollCourse()

                }).catch(error => { console.log(error) })
        },
        onEnrollCourse(){
            // add course to classroom
        },
        onCourseClick(course){
            this.$emit('on-course-click',course)
        },
        scroll () {
            window.onscroll = () => {
                this.scrolled_to_bottom = this.courses.length > 0 && Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop) + window.innerHeight === document.documentElement.offsetHeight
            }
        },
        getCourseWithFilter(category_id,teacher_id,search_value){
            this.courses = []
            this.query.category_id = category_id
            this.query.teacher_id = teacher_id
            this.query.search_value = search_value
            this.query.offset = 0
            this.getCourseList()
        },
        getCourseList(){

            // disable loading if offset is not 0
            // because use want other data
            // not refreshing it
            this.status.loading = true
            this.status.error = false

            this.$apollo.query({
                query : require('../../graphql/listCourse.gql'),
                variables : this.query
                }).then(result => {
                    
                    // load other result if offset not 0
                    // and new if offset is 0
                    this.courses = this.query.offset > 0 ? this.courses.concat(result.data.course_list) : result.data.course_list
                    this.status.loading = false

                }).catch(error => {

                    this.status.loading = false
                    this.status.error = true
                    console.log(error)

                })

        }
    }
}
</script>

<style scoped>
#loading-layout {
    margin-top: 50px;
    height: 100px
}

a {
    cursor: pointer;
}

#course-image {
    border-radius: 25px;
}

.CoursesComponent{
    margin-right: 15px;
    margin-left: 15px;
}

</style>