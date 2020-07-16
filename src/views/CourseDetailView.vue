<template>
    <div class="CourseDetail">
        <nav>
            <div class="nav-wrapper">
                <a class="brand-logo center">{{ course_detail.course_name }}</a>
                <ul id="nav-mobile" class="left">
                    <li><a v-on:click="$router.go(-1)">Back</a></li>
                </ul>
            </div>
        </nav>
        <div id="course-data" v-show="!is_loading && !is_error">
            <div class="row">
                <div class="container center col s12 m6 l4">
                    <img class="col s12" :src="course_detail.image_url" />
                </div>
                <div class="container col s12 m6 l8"> 
                    <h6 v-for="detail in course_detail.course_details" v-bind:key="detail.id">
                        {{ detail.description_text }}
                    </h6>
                    <br />
                    <button class="btn-large waves-effect waves-light green hide-on-small-only col s4 ">Enroll</button>
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
        <div class="container" v-show="!is_loading && !is_error">
            <div class="row center">
                <div class="container col s3"></div>
                <div class="container form col s12 m8 l6">
                    <button id="bottom-enroll-buttonn" class="btn-large waves-effect waves-light green col s12 hide-on-med-and-up">Enroll</button>
                </div>
                <div class="container col s3"></div>
            </div>          
        </div>
        <div v-if="is_loading"> <LoadingComponent /> </div>
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
            }
        }
    },
    created() {
        this.course_detail.id = this.$route.query.id
        this.getCourseDetail()
    },
    methods : {
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
    bottom: 0;
    z-index: 10;
    width: 100%;
}

.CourseDetail {
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