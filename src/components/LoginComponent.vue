<template>
    <div class="LoginComponent">
            <div class="container">
            <div class="row center">
              <h5 class="white-text center">See What We Can Learn Today</h5>
            </div>
            <br>
            <div class="row center">
                <div class="container col s3"></div>
                <div class="container form col s12 m8 l6">
                    <form class="login-form" @submit.prevent="doLogin">
                    <div class="input-field">
                        <label for="email" class="white-text">Email</label>
                        <input id="email" v-model="email" type="text" required/>
                    </div>
                    <div class="input-field white-text">
                        <label for="password" class="white-text">Password</label>
                        <input id="password" v-model="password" type="password" required/>
                    </div>
                    <button type="submit" id="download-button" class="btn-large waves-effect waves-light green col s12">Login</button>
                    </form>
                </div> 
            </div>
             <div class="container col s3"></div>
            <p class="header center white-text"><a v-on:click="doResetPassword" class="header center white-text">Forgot Password?</a> </p>
        </div>

        <ModalMessageComponent ref="error_modal" v-bind="{ title : 'Login Failed', message : 'Invalid email or password!' }"/>
        <ModalMessageComponent ref="reset_password_modal" v-bind="{ title : 'Forgot Password',message : 'Unfortunately we cannot reset the password on your account, please create a new account!'}"/>

        <div v-if="is_loading"> <LoadingComponent /> </div>
    </div>
</template>

<script>

import ModalMessageComponent from './util/ModalMessageComponent.vue';
import LoadingComponent from './util/LoadingComponent.vue';

export default {
    name : 'LoginComponent',
    components : {
        LoadingComponent,
        ModalMessageComponent
    },
    data(){
        return {
            email : '',
            password : '',
            is_loading : false
        }
    },
    methods : {
        doLogin(){

            this.is_loading = true

            // request api graphql with apolo
            this.$apollo.query({
                query : require('../graphql/login.gql'),
                variables : {
                    email :this.email,
                    password :this.password
                }
                }).then(result => {
                    
                    // save data student
                    const parsed = JSON.stringify(result.data.student_login);
                    localStorage.setItem('student_session', parsed);

                    // dismiss loading
                    this.is_loading = false
                    console.log(result)

                    this.$router.push({name: "Dashboard"})

                }).catch(error => {

                    // show modal reset password
                    this.$refs.error_modal.showModal()

                    // dismiss loading
                    this.is_loading = false
                    console.log(error)

                })
            
            this.email = ''
            this.password = ''
        },
        doResetPassword(){
            this.$refs.reset_password_modal.showModal()
        },
    }
}
</script>

<style scoped>

a {
    cursor:pointer;
}

#login_modal h4 {
    color: black;
}
.LoginComponent {
   margin: 150px 0 0;
}

.login-form input, select, textarea{
    color: white;
}

#download-button {
    text-transform: none;
    font-size: 18px;
    margin: 10px 0 0;
}

</style>