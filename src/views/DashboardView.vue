<template>
  <div class="Dashboard">
      <DashboardComponent />
  </div>
</template>
<script>

import DashboardComponent from '../components/DashboardComponent.vue'

export default {
  name: 'Dashboard',
  components : {
      DashboardComponent
  }
}
</script>

<style scoped>

.Dashboard {
    background: #ffffff; /* fallback for old browsers */
    font-family: "Roboto", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    width:100%;
    height:100%;
    top:0px;
    left:0px;
    z-index:-1;
}
</style>
