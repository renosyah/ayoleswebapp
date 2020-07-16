<template>
    <div class="CompletedCourse">
        <nav>
            <div class="nav-wrapper">
            <a href="#" class="brand-logo center">Completed Course</a>
            <ul id="nav-mobile" class="left">
                <li><a v-on:click="$router.go(-1)"><i class="material-icons">arrow_back_ios</i></a></li>
            </ul>
            </div>
        </nav>
    </div>
</template>
<script>


export default {
    name : 'CompletedCourse',
    components : {
      
    }
}
</script>
<style scoped>
.nav-wrapper {
    background: #0D47A1;
}

.CompletedCourse {
  background: #ffffff; /* fallback for old browsers */
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