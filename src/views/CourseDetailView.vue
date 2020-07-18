<template>
    <div class="CourseDetail">
        <nav>
            <div class="nav-wrapper">
                <a class="brand-logo center">{{ course_detail.course_name }}</a>
                <ul id="nav-mobile" class="left">
                    <li><a v-on:click="$router.go(-1)"><i class="material-icons">arrow_back_ios</i></a></li>
                </ul>
            </div>
        </nav>
        <div id="course-data" v-show="!is_loading && !is_error">
            <div class="row">
                <div class="container center col s12 m6 l4">
                    <h5> </h5>
                    <img id="image-course" class="col s12" :src="course_detail.image_url" />
                </div>
                <div class="container col s12 m6 l8"> 
                    <div id="text-description">
                        <h5><b>{{ course_detail.course_name }}</b></h5>
                        <p v-for="detail in course_detail.course_details" v-bind:key="detail.id">
                            {{ detail.description_text }}
                        </p>
                        <br />
                        <h6 id="teacher-name">By : {{ course_detail.teacher.name }}</h6>
                    </div>
                </div>
            </div>            
        </div>
        <div v-show="is_error">
            <div class="container">
                <div class="icon-block ">
                    <h2 class="center "><img src="error.png " /></h2>
                    <div class="row center">
                        <h5 class="header col s12 light black-text">Something Wrong Happend!</h5>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="is_loading"> <LoadingComponent /> </div>

        <div  id="bottom-enroll-button" class="container" v-show="!is_loading && !is_error">
            <div class="row center">
                <div class="container col m3 l4"></div>
                <div class="container form col s12 m6 l4">
                    <div v-show="is_class_exist">
                        <p><b>Student Already has Taken This class</b></p>
                        <button class="btn-large waves-effect waves-light green col s12">Go To Class</button>
                    </div>
                    <button v-show="!is_class_exist" v-on:click="onEnrollCourse" class="btn-large waves-effect waves-light green col s12">Enroll</button>
                </div>
                <div class="container col  m3 l4"></div>
            </div>          
        </div>
    </div>
</template>
<script>

import LoadingComponent from '../components/util/LoadingComponent.vue';

export default {
    name : 'CourseDetail',
    components : {
        LoadingComponent  
    },
    data(){
        return {
            is_loading : false,
            is_error : false,
            course_detail : {
                id : '',
                course_name : 'Detail Course',
                image_url : '',
                teacher :{id : '', name : '', email : '' } ,
                category :{id : '', name : '', image_url : ''},
                course_details : []
            },
            is_class_exist : false
        }
    },
    created() {
        this.course_detail.id = this.$route.query.id
        this.getCourseDetail()
        this.checkIsClassIsExist()
    },
    methods : {
        getStudentId(){
            let student = { 
                id : ''
            }
            if (localStorage.getItem('student_session')) {
                try {
                    student = JSON.parse(localStorage.getItem('student_session'));
                } catch(e) {
                    console.log(e)
                }
            }
            return student.id
        },
        checkIsClassIsExist(){

            this.$apollo.query({
                query : require('../graphql/detailClassRoomById.gql'),
                variables : {
                    course_id : this.course_detail.id,
                    student_id : this.getStudentId()
                }
                }).then(result => {
                    
                    if (result.data.classroom_detail_by_id.id){
                        this.is_class_exist = true
                    }

                }).catch(error => { console.log(error) })

        },
        onEnrollCourse(){
            // add course to classroom
        },
        getCourseDetail(){

            this.is_loading = true

            // request api graphql with apolo
            this.$apollo.query({
                query : require('../graphql/courseDetail.gql'),
                variables : {
                    id : this.course_detail.id
                }
                }).then(result => {

                    this.is_loading = false
                    this.course_detail = result.data.course_detail

                }).catch(error => {

                    this.is_loading = false
                    this.is_error = true
                    console.log(error)
                })
        }
    }
}
</script>
<style scoped>
.nav-wrapper {
    background: #0D47A1;
}

#course-data {
    margin: 30px 0 0;
}

#bottom-enroll-button {
    overflow: hidden;
    position: fixed;
    background: #ffffff;
    bottom: 0;
    z-index: 10;
    width: 100%;
}

#text-description {
    margin-bottom: 150px;
}

#image-course {
    border-radius: 15px;
}


.CourseDetail {
  background: #ffffff; /* fallback for old browsers */
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>