<template>
  <div class="Index">
        <div class="section no-pad-bot" id="index-banner">
        <div class="container">
            <div class="row center">
              <div class="container col m1 l2"></div>
              <h5 class="header white-text col s12 m10 l8">Discover All Knowledge You Can Gain!</h5>
              <div class="container col m1 l2"></div>
            </div>
            <br>
            <div class="row center">
                <div class="container col s3"></div>
                <a href="/login" id="download-button" class="btn-large col s6 waves-effect waves-light green">Login With Email</a>
                <div class="container col s3"></div>
            </div>
           
            <p class="header center white-text">New Student? <a href="/register" class="header center white-text"> <b>Sign Up</b></a> </p>
        </div>
    </div>
  </div>
</template>
<script>

export default {
  name: 'Index'
}
</script>

<style scoped>

#index-banner {
   margin: 150px 0 0;
}

#download-button {
    text-transform: none;
    font-size: 18px;
}

.Index {
  background: #0D47A1; /* fallback for old browsers */
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position:fixed;
  width:100%;
  height:100%;
  top:0px;
  left:0px;
  z-index:-1;
}
</style>
