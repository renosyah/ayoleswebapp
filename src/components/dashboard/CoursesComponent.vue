<template>
    <div class="CoursesComponent">
        <div v-show="status.error || !status.loading && courses.length == 0">
            <div class="container">
                <br><br>
                <div class="row">
                    <div class="col s12 m4 "></div>
                    <div class="col s12 m4 ">
                        <div class="icon-block ">
                            <h2 class="center "><img src="notfound.png " /></h2>
                            <div class="row center">
                                <h5 class="header col s12 light black-text">No Result Found</h5>
                            </div>
                        </div>
                    </div>
                    <div class="col s12 m4 "></div>
                </div>
                <br><br>
            </div>
        </div>
        <div v-show=" !status.error  && courses.length > 0"> 
        <div class="row">
                <div class="col s12 m6 l4" v-for="course in courses" v-bind:key="course.id">
                    <div class="card">
                        <div class="card-image waves-effect waves-block waves-light">
                            <img class="activator" width="180" height="150" v-bind:src="course.image_url">
                        </div>
                        <div class="card-content">
                            <span class="card-title activator grey-text text-darken-4">{{ course.course_name }}<i class="material-icons right">more_vert</i></span>
                            <div class="row">
                                <div class="input-field col s12 m12 l12">
                                    <button class="btn-small waves-effect waves-light green">Detail</button>
                                </div>
                            </div>
                        </div>
                        <div class="card-reveal">
                            <span class="card-title grey-text text-darken-4">{{ course.course_name }}<i class="material-icons right">close</i></span>
                            <p v-for="detail in course.course_details" v-bind:key="detail.id"> {{ detail.overview_text }} </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="loading-layout">
            <div class="container">    
                <div class="row">
                    <div class="col s12 m4 "></div>
                    <div class="col s12 m4 ">
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
                    <div class="col s12 m4 "></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name : 'CoursesComponent',
    props : {
        courses_query : Object
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
                limit : 6
            },
            status : {
                loading : true,
                error : false
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
        scroll () {
            window.onscroll = () => {
                this.scrolled_to_bottom = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop) + window.innerHeight === document.documentElement.offsetHeight
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

    },
    }
}
</script>

<style scoped>
#loading-layout {
    margin-top: 100px;
    height: 200px
}
</style>