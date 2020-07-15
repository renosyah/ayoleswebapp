<template>
    <div class="classTab">
        <TopMenuMenuComponent v-bind:hint_search="'Search Class....'" v-on:on-category-click="filterClassRoomByCategory"  v-on:on-search-typing="filterClassRoomByCourseName" />
        <ClassRoomComponent ref="classroom" v-bind:student_id="loadSession.id" v-on:on-class-click="onClassRoomClick"/>
    </div>
</template>

<script>

import TopMenuMenuComponent from '../input/TopMenuComponent.vue'
import ClassRoomComponent from '../listViewer/ClassRoomComponent.vue'

export default {
    name : 'classTab',
    components : {
        TopMenuMenuComponent,
        ClassRoomComponent    
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
        filterClassRoomByCategory(filter){
            this.$refs.classroom.getClassRoomByCategory(filter.category_id)
        },
        filterClassRoomByCourseName(filter){
            this.$refs.classroom.getClassRoomBySearch(filter.search_value)
        },
        onClassRoomClick(classroom){
            console.log(classroom)
        }
    }
}
</script>