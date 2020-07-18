<template>
    <div class="CompletedClassComponent">
        <div v-show="!status.error && !status.loading && classrooms_cert.length == 0">
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

        <div class="center" v-show="!status.error && classrooms_cert.length > 0"> 
            <div class="row">
                <div v-for="c in classrooms_cert" v-bind:key="c.id">
                    <div class="col s12 m6 l4">

                            <!-- apollo query on HTML -->
                            <ApolloQuery :query="require('../../graphql/detailClassRoom.gql')" :variables="{ id : c.classroom_id }">
                                <template v-slot="{ result: { loading, error, data } }">

                                    <!-- Loading -->
                                    <div v-if="loading" class="loading apollo">Loading...</div>

                                    <!-- Error -->
                                    <div v-else-if="error" class="error apollo">An error occurred</div>

                                    <!-- Result -->
                                    <div v-else-if="data" class="result apollo">

                                        <div class="card">
                                            <div class="card-image">
                                                <img width="120" height="220" :src="data.classroom_detail.course.image_url">
                                            </div>
                                            <div class="card-content">
                                                <h6 class="black-text">{{ data.classroom_detail.course.course_name }}</h6>
                                            </div>
                                            <div class="card-action">
                                                <a v-on:click="onClassroomsCertClick(c)" class="green-text">Result</a>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- No result -->
                                    <div v-else class="no-result apollo"> </div>

                                </template>

                            </ApolloQuery>

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
    name : 'CompletedClassComponent',
    props : {
        student_id : String
    },
    data() {
        return {
            classrooms_cert : [],
            query : {
                student_id : this.$props.student_id,
                order_by:'create_at',
                order_dir:'asc',
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
            this.getClassroomsCertList()
        }
    },
    created(){
        this.getClassroomsCertList()
    },
    mounted(){
        this.scroll()
    },
    methods : {
        onClassroomsCertClick(class_cert){
            this.$emit('on-class-cert-click',class_cert)
        },
        scroll () {
            window.onscroll = () => {
                this.scrolled_to_bottom = this.classrooms.length > 0 && Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop) + window.innerHeight === document.documentElement.offsetHeight
            }
        },

        getClassroomsCertList(){

            // disable loading if offset is not 0
            // because use want other data
            // not refreshing it
            this.status.loading = true
            this.status.error = false

            this.$apollo.query({
                query : require('../../graphql/listClassRoomCert.gql'),
                variables : this.query
                }).then(result => {
                    
                    // load other result if offset not 0
                    // and new if offset is 0
                    this.classrooms_cert = this.query.offset > 0 ? this.classrooms_cert.concat(result.data.classroom_certificate_list) : result.data.classroom_certificate_list
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

.CompletedClassComponent{
    margin-right: 15px;
    margin-left: 15px;
}

</style>