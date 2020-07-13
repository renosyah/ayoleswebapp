<template>
    <div class="HeaderComponent">
        <!-- Dropdown Structure -->
        <ul id="profile_dropdown" class="dropdown-content">
            <li><a class="black-text" href="/update_profile">Update Profile</a></li>
            <li><a class="black-text" href="/completed_course">Completed Course</a></li>
            <li class="divider"></li>
            <li><a class="red-text" v-on:click="doLogout">Logout</a></li>
        </ul>
        <nav id="navigation-header" class="navbar-fixed">
            <div class="nav-wrapper">
                <a href="/dashboard" class="brand-logo center">Lets Course</a>
                <ul class="right hide-on-med-and-down">
                    <li><a class="dropdown-trigger" data-target="profile_dropdown">Login As {{ student.name }}<i class="material-icons right">arrow_drop_down</i></a></li>
                </ul>
            </div>
        </nav>
        <div id="tab-menu" class="row">
            <div class="col m3 l3"></div>
            <div class="col s12 m6 l6">
            <ul class="tabs">
                <li id="tab-home" class="tab col s3" v-on:click="doChangeTab('home')"><a>Home</a></li>
                <li id="tab-class" class="tab col s3" v-on:click="doChangeTab('class')"><a>Class</a></li>
                <li id="tab-profile" class="tab col s3" v-on:click="doChangeTab('profile')"><a>Profile</a></li>
            </ul>
            </div>
            <div class="col m3 l3"></div>
        </div>
    </div>
</template>
<script>

export default {
  name: 'HeaderComponent',
  props : {
      student : Object
  },
  mounted() {
      window.$('.dropdown-trigger').dropdown()
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
