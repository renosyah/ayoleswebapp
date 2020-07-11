<template>
      <div class="NotFound">
        <div class=" section no-pad-bot " id="index-banner ">
        <div class="container ">
            <br><br>
            <div class="row ">
                <div class="col s12 m4 "></div>
                <div class="col s12 m4 ">
                    <div class="icon-block ">
                        <h2 class="center "><img src="notfound.png " /></h2>
                        <div class="row center">
                            <h5 class="header col s12 light black-text">Page Not Found</h5>
                            <a href="#" v-on:click="$router.go(-1)">Back</a>
                        </div>
                    </div>
                </div>
                <div class="col s12 m4 "></div>
            </div>
            <br><br>
        </div>
    </div>
      </div>
</template>



<style scoped>
.NotFound {
  background: #ffffff; /* fallback for old browsers */
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;      
}
</style>