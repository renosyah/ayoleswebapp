<template>
    <div class="CoursesComponent">
        <div v-show="status.error || !status.loading && courses.length == 0">
            <div class="container">
                <div class="icon-block ">
                    <h2 class="center "><img src="notfound.png " /></h2>
                    <div class="row center">
                        <h5 class="header col s12 light black-text">No Result Found</h5>
                    </div>
                </div>
            </div>
        </div>


        <div class="center" v-show=" !status.error  && courses.length > 0"> 
            <div class="row">
                <div v-for="course in courses" v-bind:key="course.id">
                    <div class="center col s6 m4 l2">
                        <a v-on:click="onCourseClick(course)">
                            <img class="z-depth-2" id="course-image" width="120" height="100" v-bind:src="course.image_url" />
                        </a>
                        <h6 class="center grey-text"> {{ course.course_name }} </h6>
                        <br />
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
    </div>
</template>

<script>
export default {
    name : 'CoursesComponent',
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
                limit : 12
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

    },
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