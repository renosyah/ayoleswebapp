<template>
    <div class="RegisterComponent">
            <div class="container">
            <div class="row center">
                <div class="container col s3"></div>
                <div class="container form col s12 m8 l6">
                    <form class="register-form" @submit.prevent="doRegister">
                    <div class="input-field">
                        <label for="name" class="gray-text">Name</label>
                        <input id="name" v-model="name" type="text" required/>
                    </div>
                    <div class="input-field">
                        <label for="email" class="gray-text">Email</label>
                        <input id="email" v-model="email" type="text" required/>
                    </div>
                    <div class="input-field white-text">
                        <label for="password" class="gray-text">Password</label>
                        <input id="password" v-model="password" type="password" required/>
                    </div>
                    <button type="submit" id="download-button" class="btn-large waves-effect waves-light green col s12">Apply</button>
                    </form>
                </div> 
            </div>
             <div class="container col s3"></div>
        </div>
    </div>
</template>

<script>
export default {
    name : 'RegisterComponent',
    data(){
        return {
            name : '',
            email : '',
            password : ''
        }
    },
    methods : {
        doRegister(){
            
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