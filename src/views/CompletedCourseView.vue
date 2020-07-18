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
        <br /><br />
        <CompletedClassComponent v-bind:student_id="loadSession.id" v-on:on-class-cert-click="onCompletedClassRoomClick" />
    </div>
</template>
<script>

import CompletedClassComponent from '../components/listViewer/CompletedClassComponent.vue';

export default {
    name : 'CompletedCourse',
    components : {
        CompletedClassComponent
    },    
    computed : {
        loadSession(){
            let data = {
                id : '',
                name : '',
                email : ''
            }
            if (localStorage.getItem('student_session')) {
                try {
                   data = JSON.parse(localStorage.getItem('student_session'));
                } catch(e) {
                    console.log(e)
                }
            }

            return data
        }
    },
    methods : {
        onCompletedClassRoomClick(classroom_completed){
            console.log(classroom_completed)
        }
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
  width:100%;
  height:100%;
  top:0px;
  left:0px;
  z-index:-1;
}
</style>