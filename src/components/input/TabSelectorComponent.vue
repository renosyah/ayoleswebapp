<template>
    <div class="TabSelectorComponent">
        <nav id="navigation-header" class="navbar">
            <div class="nav-wrapper">
                <a class="brand-logo center">{{ title }}</a>
                <ul id="nav-mobile" class="right">
                    <li><a href="/completed_course"><i class="material-icons">assignment_turned_in</i></a></li>
                    <li><a href="/update_profile" class="hide-on-med-and-down"><i class="material-icons">account_circle</i></a></li>
                    <li><a v-on:click="doLogout" class="hide-on-med-and-down"> Logout </a></li>
                </ul>
            </div>
        </nav>
        <div id="tab-menu" class="row">
            <div class="col m3 l3"></div>
            <div class="col s12 m6 l6">
            <ul class="tabs">
                <li id="tab-home" class="tab col s3" v-on:click="doChangeTab('home');title='Home'"><a>Home</a></li>
                <li id="tab-class" class="tab col s3" v-on:click="doChangeTab('class');title='Class'"><a>Class</a></li>
                <li id="tab-profile" class="tab col s3" v-on:click="doChangeTab('profile');title='Profile'"><a>Profile</a></li>
            </ul>
            </div>
            <div class="col m3 l3"></div>
        </div>
    </div>
</template>
<script>

export default {
  name: 'TabSelectorComponent',
  props : {
      student : Object
  },
  data() { 
      return {
          title : 'Lets Course'
      }
  },
  mounted() {
      window.$('.tabs').tabs()
  },
  methods : {
      doLogout(){
        localStorage.removeItem('student_session');
        this.$router.push({name: "Login"})
      },
      doChangeTab(x){
        this.$emit('onTabSelected', x)
      }
  }
}
</script>

<style scoped>

ul.tabs {
    background-color: #0D47A1; /* fallback for old browsers */
    display : flex;
}

li.tab {
    font-family: "Roboto", sans-serif;  
}

.tabs .tab a{
    color:white;
} /*Black color to the text*/

.tabs .tab a:hover {
    background-color:rgb(6, 29, 66, 0.5)
} /*Text color on hover*/

.tabs .indicator {
    background-color:orange;
} /*Color of underline*/

#tab-menu {
    background-color: #0D47A1; /* fallback for old browsers */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}  

#navigation-header {
    background-color: #0D47A1; /* fallback for old browsers */
    font-family: "Roboto", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
a {
    cursor: pointer;
}



</style>
