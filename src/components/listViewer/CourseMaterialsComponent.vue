<template>
    <div class="CourseMaterials">

        <div v-show="!status.error && !status.loading && course_materials.length == 0">
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


        <div v-show="!status.error && course_materials.length > 0">
            <!--- for mobile --->
            <div id="course-data" class="row hide-on-med-and-up">
                <div class="container col s12">
                    <h5><b>Course Materials</b></h5>
                    <ul class="collapsible">
                        <li v-for="course_material in course_materials" v-bind:key="course_material.id">
                            <div class="collapsible-header">{{ course_material.title }}</div>
                            <div class="collapsible-body">
                                <span>
                                    <CourseMaterialDetailsComponent v-bind:course_material_id="course_material.id" />
                                </span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <!--- for web --->
            <div id="course-data" class="row hide-on-small-only">
                <div class="container col m4 l3">
                    <h5><b>Course Materials</b></h5>
                    <div v-for="course_material in course_materials" v-bind:key="course_material.id">
                        <a v-on:click="loadMaterialDetails(course_material.id)">
                            <div class="card-panel">
                                <span class="black-text"> {{ course_material.title }} </span>
                            </div> 
                        </a>
                    </div>                                                                             
                </div>                
                <div class="container col m8 l9">
                    <br />
                    <CourseMaterialDetailsComponent ref="course_material_details" />
                </div> 
            </div>
        </div>
    </div>
</template>

<script>

import CourseMaterialDetailsComponent from './CourseMaterialDetailsComponent.vue';

export default {
    name : 'CourseMaterials',
    components : {
        CourseMaterialDetailsComponent
    },
    data(){
        return {
            course_materials : [],
            query : {
                course_id : '',
                search_by: 'title',
                search_value: '',
                order_by:'material_index',
                order_dir:'asc',
                offset:0,
                limit:10
            },
            status : {
                loading : true,
                error : false
            },
            student_id : '',
            course_id : '',
            classroom_id : ''
        }
    },
    mounted(){
        window.$('.collapsible').collapsible();
    },
    methods : {
        loadMaterialDetails(material_id){
            this.$refs.course_material_details.getCourseMaterialDetails(material_id)
        },
        setCourseMaterialData(student_id,course_id,classroom_id){
            this.student_id = student_id
            this.course_id = course_id
            this.classroom_id = classroom_id
            this.query.course_id = course_id
        },
        getCourseMaterials(){

            this.status.loading = true

            this.$apollo.query({
                query : require('../../graphql/listCourseMaterials.gql'),
                variables : this.query
                }).then(result => {
                    
                    // load other result if offset not 0
                    // and new if offset is 0
                    this.course_materials = this.query.offset > 0 ? this.course_materials.concat(result.data.course_material_list) : result.data.course_material_list
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

<style scoped>
#course-data {
    margin: 30px 0 0;
}

.CourseMaterials {
  background: #ffffff; /* fallback for old browsers */
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;      
}

a {
    cursor: pointer;
}

</style>