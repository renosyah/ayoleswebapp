<template>
    <div class="profileTab">
            <div class="container">
                <h5 class="center">Update Your Profile Here Whenever You Want</h5>
                <br />
                <div class="row center">
                    <div class="container col s3"></div>
                    <div class="container form col s12 m8 l6">
                        <form class="register-form" @submit.prevent="doUpdate">
                        <div class="input-field">
                            <label for="name" class="gray-text">New Name</label>
                            <input id="name" v-model="field.name" type="text" />
                        </div>
                        <div class="input-field">
                            <label for="email" class="gray-text">New Email</label>
                            <input id="email" v-model="field.email" type="text" />
                        </div>
                        <div class="input-field white-text">
                            <label for="password" class="gray-text">New Password</label>
                            <input id="password" v-model="field.password" type="password"/>
                        </div>
                        <button type="submit" id="download-button" class="btn-large waves-effect waves-light green col s12">Update Profile</button>
                        </form>
                    </div> 
                </div>
             <div class="container col s3"></div>
        </div>
        <div id="logout-button">
            <div class="container">
                <div class="row center">
                    <div class="container col s3"></div>
                    <div class="container form col s12 m8 l6">
                        <button class="btn-large waves-effect waves-light red white-text col s12" v-on:click="doLogout">Logout</button>
                    </div>
                    <div class="container col s3"></div>
                </div>          
            </div>
        </div>


        <ModalMessageComponent ref="update_profile_modal" v-bind="{ title : 'Fail Update Profile',message : 'Unfortunately we cannot update your account right now, please try again latter!'}"/>
        <div v-if="is_loading"> <LoadingComponent /> </div>

    </div>
</template>

<script>

import ModalMessageComponent from '../util/ModalMessageComponent.vue';
import LoadingComponent from '../util/LoadingComponent.vue';

export default {
    name : 'profileTab',
    components : {
        ModalMessageComponent,
        LoadingComponent
    },
    data() { 
        return {
            is_loading : false,
            field : {
                id:'',
                name:'',
                email:'',
                password:''
            },
            student : {
                id:'',
                name:'',
                email:'',
                password:''
            },
            mutation : {
                id:'',
                name:'',
                email:'',
                password:''    
            }
        }
    },
    created(){
        this.loadSession()
    },
    methods : {
        doUpdate(){

            this.is_loading = true

            this.mutation.id = this.student.id
            this.mutation.name = this.field.name == '' ? this.student.name : this.field.name 
            this.mutation.email = this.field.email == '' ? this.student.email: this.field.email
            this.mutation.password = this.field.password

            // request api graphql with apolo
            this.$apollo.mutate({
                mutation : require('../../graphql/updateStudent.gql'),
                variables : this.mutation
                }).then(result => {
                    
                    // save data student
                    localStorage.setItem('student_session', this.mutation);

                    // dismiss loading
                    this.is_loading = false
                    this.field.password = ''

                    console.log(result)

                }).catch(error => {

                    // show modal reset password
                    this.$refs.update_profile_modal.showModal()

                    // dismiss loading
                    this.is_loading = false
                    console.log(error)

                })
        },
        loadSession(){
            if (localStorage.getItem('student_session')) {
                try {
                    this.student = JSON.parse(localStorage.getItem('student_session'));
                } catch(e) {
                    console.log(e)
                }
            }

            this.field.name = this.student.name
            this.field.email = this.student.email
        },
        doLogout(){
            localStorage.removeItem('student_session');
            this.$router.push({name: "Login"})
      },
    }
}
</script>

<style scoped>
#logout-button{
    margin-top: 100px;
}
</style>