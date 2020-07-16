<template>
    <div  id="logout" class="LogoutComponent">
        <div class="container">
            <div class="row center">
                <div class="container col s3"></div>
                <div class="container form col s12 m8 l6">
                <button id="logout-button" class="btn-large waves-effect waves-light red white-text col s12" v-on:click="doLogout">Logout</button>
                </div>
                <div class="container col s3"></div>
        </div>          
    </div>
</div>
</template>


<script>
export default {
    name : 'LogoutComponent',
    methods : {
        doLogout(){
            localStorage.removeItem('student_session');
            this.$router.push({name: "Login"})
      }
    }
}
</script>

<style scoped>
#logout-button {
    text-transform: none;
    font-size: 18px;
    margin: 10px 0 0;
}

#logout {
    overflow: hidden;
    position: fixed;
    bottom: 0;
    z-index: 10;
    width: 100%;
}

</style>