<template>
    <div class="CourseMaterialDetails">

        <div v-show="!status.error && !status.loading && course_material_details.length == 0">
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

        <div v-show="!status.error && course_material_details.length > 0">
            <div v-for="course_material_detail in course_material_details" v-bind:key="course_material_detail.id">
                
                <h6> <b>{{  course_material_detail.title }}</b> </h6>
                
                <!-- for text -->
                <div v-if="course_material_detail.type_material == 0">
                    <p> {{ course_material_detail.content }} </p>
                </div>

                <!-- for image -->
                <div v-else-if="course_material_detail.type_material == 1">
                    <img class="responsive-img" :src="course_material_detail.image_url" />
                </div>

                <!-- for dunno -->
                <div v-else>
                
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name : 'CourseMaterialDetails',
    props : {
        course_material_id : String
    },
    data(){
        return {
            course_material_details : [],
            query : {
                course_material_id : '',
                search_by:"title",
                search_value:"",
                order_by:"position",
                order_dir:"asc",
                offset:0,
                limit:10
            },
            status : {
                loading : true,
                error : false
            },
        }
    },
    created(){
        if (this.$props.course_material_id){
            this.getCourseMaterialDetails(this.$props.course_material_id)
        }
    },
    methods : {
        getCourseMaterialDetails(course_material_id){

            this.query.course_material_id = course_material_id
            this.status.loading = true
            
            this.$apollo.query({
                query : require('../../graphql/listCourseMaterialDetails.gql'),
                variables : this.query
                }).then(result => {
                    
                    // load other result if offset not 0
                    // and new if offset is 0
                    this.course_material_details = this.query.offset > 0 ? this.course_material_details.concat(result.data.course_material_detail_list) : result.data.course_material_detail_list
                    this.status.loading = false

                }).catch(error => {

                    console.log(error)
                    this.status.loading = false
                    this.status.error = true
                })
        }
    }
}
</script>