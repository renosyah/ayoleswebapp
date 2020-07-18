<template>
    <div class="ClassRoom">
        <nav>
            <div class="nav-wrapper">
            <a href="#" class="brand-logo center">{{ classroom_detail.course.course_name }}</a>
            <ul id="nav-mobile" class="left">
                <li><a v-on:click="$router.go(-1)"><i class="material-icons">arrow_back_ios</i></a></li>
            </ul>
            </div>
        </nav>

        <h5></h5>
        <div v-show="!is_loading && !is_error">
            <div class="row">
                <div class="container center col s12 m6 l4">
                    <img id="image-course" class="col s12" :src="classroom_detail.course.image_url" />
                </div>
                <div class="container col s12 m6 l8"> 
                    <div id="text-description">
                        <h5><b>{{ classroom_detail.course.course_name }}</b></h5>
                        <p v-for="detail in classroom_detail.course.course_details" v-bind:key="detail.id">
                            {{ detail.description_text }}
                        </p>
                        <br />
                        <h6 id="teacher-name">By : {{ classroom_detail.course.teacher.name }}</h6>
                    </div>
                </div>
            </div>            
        </div>

        <CourseMaterialsComponent ref="course_material" />

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

      </div>
</template>

<script>

import LoadingComponent from '../components/util/LoadingComponent.vue';
import CourseMaterialsComponent from '../components/listViewer/CourseMaterialsComponent.vue';

export default {
    name : 'ClassRoom',
    components : {
        LoadingComponent,
        CourseMaterialsComponent
    },
    data() {
        return {
            is_loading : false,
            is_error : false,
            classroom_detail : {
                id : '',
                course : {
                    id : '',
                    course_name : 'Detail Classroom',
                    image_url : '',
                    teacher : {id : '', name : '', email : '' },
                    category : {id : '', name : '', image_url : ''},
                    course_details: {id:'' ,course_id : '' , overview_text : '', description_text : '',image_url : '' }
                },
                student_id : ''
            }
        }
    },
    created() {
        this.classroom_detail.id = this.$route.query.id
        this.getClassRoomDetail()
    },
    methods : {
        getClassRoomDetail(){

            this.is_loading = true
            this.is_error = false

            this.$apollo.query({
                query : require('../graphql/detailClassRoom.gql'),
                variables : { id : this.classroom_detail.id }
                }).then(result => {
                    
                    // load other result if offset not 0
                    // and new if offset is 0
                    this.classroom_detail = result.data.classroom_detail
                    this.$refs.course_material.setCourseMaterialData(
                        this.classroom_detail.student_id,
                        this.classroom_detail.course.id,
                        this.classroom_detail.id
                    )
                    this.$refs.course_material.getCourseMaterials()
                    this.is_loading = false

                }).catch(error => {

                    this.is_loading  = false
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

.ClassRoom {
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