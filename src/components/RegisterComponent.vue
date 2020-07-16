<template>
    <div class="RegisterComponent">
            <h5 class="center">Hello, New Student!</h5>
            <br />
            <div class="container">
                <div class="row center">
                    <div class="container col s3"></div>
                    <div class="container form col s12 m8 l6">
                        <form class="register-form" @submit.prevent="doRegister">
                        <div class="input-field">
                            <label for="name" class="gray-text">Name</label>
                            <input id="name" v-model="field.name" type="text" required/>
                        </div>
                        <div class="input-field">
                            <label for="email" class="gray-text">Email</label>
                            <input id="email" v-model="field.email" type="text" required/>
                        </div>
                        <div class="input-field white-text">
                            <label for="password" class="gray-text">Password</label>
                            <input id="password" v-model="field.password" type="password" required/>
                        </div>
                        <button type="submit" id="download-button" class="btn-large waves-effect waves-light green col s12">Apply</button>
                        </form>
                    </div> 
                </div>
             <div class="container col s3"></div>
        </div>


    <ModalMessageComponent ref="register_modal" v-bind="{ title : 'Fail Register Profile',message : 'Unfortunately we cannot adding your account right now, please try again latter!'}"/>
    <div v-if="is_loading"> <LoadingComponent /> </div>
    </div>
</template>

<script>

import ModalMessageComponent from './util/ModalMessageComponent.vue';
import LoadingComponent from './util/LoadingComponent.vue';

export default {
    name : 'RegisterComponent',
    components : {
        ModalMessageComponent,
        LoadingComponent
    },
    data(){
        return {
            field : {
               name : '',
               email : '',
               password : '',
           },
           mutation : {
               name : '',
               email : '',
               password : '',
           }
        }
    },
    methods : {
        doRegister(){

            this.is_loading = true

            this.mutation.name = this.field.name 
            this.mutation.email = this.field.email
            this.mutation.password = this.field.password

            // request api graphql with apolo
            this.$apollo.mutate({
                mutation : require('../graphql/registerStudent.gql'),
                variables : this.mutation
                }).then(result => {
                    
                    // save data student
                    localStorage.setItem('student_session', result.data.student_register);

                    // dismiss loading
                    this.is_loading = false
                    this.$router.push({name: "Dashboard"})

                }).catch(error => {

                    // show modal reset password
                    this.$refs.register_modal.showModal()

                    // dismiss loading
                    this.is_loading = false
                    console.log(error)

                })
        }
    }
}
</script>

<style scoped>

.RegisterComponent {
   margin: 20px 0 0;
}

.register-form input, select, textarea{
    color: black;
}

#download-button {
    text-transform: none;
    font-size: 18px;
    margin: 10px 0 0;
}
</style>