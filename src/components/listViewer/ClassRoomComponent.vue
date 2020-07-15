<template>
    <div class="ClassRoomComponent">
        <div v-show="!status.error && !status.loading && classrooms.length == 0">
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

        <div class="center" v-show="!status.error && classrooms.length > 0"> 
            <div class="row">
                <div v-for="c in classrooms" v-bind:key="c.id">
                    <div class="col s12 m4 l2">
                        <a v-on:click="onClassroomsClick(c)">
                            <div class="card">
                                <div class="card-image">
                                    <img width="120" height="180" :src="c.course.image_url">
                                </div>
                                <div class="card-content">
                                    <h6 class="black-text">{{ c.course.course_name }}</h6>
                                </div>
                            </div>
                        </a>
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
    name : 'ClassRoomComponent',
    props : {
        student_id : String
    },
    data() {
        return {
            classrooms : [],
            query : {
                student_id : this.$props.student_id,
                search_by:'course.category_id::TEXT',
                search_value: '',
                order_by:"classroom.create_at",
                order_dir: 'asc',
                offset:0,
                limit:10
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
            this.getClassroomsList()
        }
    },
    created(){
        this.getClassroomsList()
    },
    mounted(){
        this.scroll()
    },
    methods : {
        onClassroomsClick(class_data){
            this.$emit('on-class-click',class_data)
        },
        scroll () {
            window.onscroll = () => {
                this.scrolled_to_bottom = this.classrooms.length > 0 && Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop) + window.innerHeight === document.documentElement.offsetHeight
            }
        },
        getClassRoomBySearch(search_value){
            this.classrooms = []
            this.query.search_by = 'course.course_name'
            this.query.search_value = search_value
            this.query.offset = 0
            this.getClassroomsList()
        },
        getClassRoomByCategory(search_value){
            this.classrooms = []
            this.query.search_by = 'course.category_id::TEXT'
            this.query.search_value = search_value
            this.query.offset = 0
            this.getClassroomsList()
        },
        getClassroomsList(){

            // disable loading if offset is not 0
            // because use want other data
            // not refreshing it
            this.status.loading = true
            this.status.error = false

            this.$apollo.query({
                query : require('../../graphql/listClassRoom.gql'),
                variables : this.query
                }).then(result => {
                    
                    // load other result if offset not 0
                    // and new if offset is 0
                    this.classrooms = this.query.offset > 0 ? this.classrooms.concat(result.data.classroom_list) : result.data.classroom_list
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

.ClassRoomComponent{
    margin-right: 15px;
    margin-left: 15px;
}

</style>