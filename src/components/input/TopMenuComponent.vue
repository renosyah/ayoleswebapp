<template>
    <div class="TopMenu">
        <div id="search-form" class="nav-wrapper card">
            <div class="input-field grey-text">
                <input id="search" v-model="category_query.search_value" v-on:keyup="onSearchTyping" :placeholder="hint_search" type="search">
                <label class="label-icon" for="search"><i class="material-icons blue-text">search</i></label>
            </div>
            
        </div> 

        <div id="category-chooser">
        
        <div class="center">
                <div class="preloader-wrapper small active" v-show="categories.length == 0">
                    <div class="spinner-layer spinner-blue-only">
                    <div class="circle-clipper left">
                        <div class="circle"></div>
                    </div><div class="gap-patch">
                        <div class="circle"></div>
                    </div><div class="circle-clipper right">
                        <div class="circle"></div>
                    </div>
                    </div>
                </div>
            </div>

            <a v-show="categories.length > 0">
                <a>
                    <div v-bind:class="[ {'green':selected_chip == 'NO_CATEGORY'},{'white-text':selected_chip == 'NO_CATEGORY'} ]" id="category-chip" class="chip center" v-on:click="onCategoryClick('');selected_chip = 'NO_CATEGORY'">
                        <span>No Category</span>
                    </div>
                </a>
                <a v-for="category in categories" v-bind:key="category.id">
                    <div v-bind:class="[ {'green':selected_chip == category.id},{'white-text':selected_chip == category.id} ]" id="category-chip" class="chip center" v-on:click="onCategoryClick(category.id);selected_chip = category.id">
                        <span>{{ category.name }}</span>
                    </div>
                </a>
            </a>

        </div>
    </div>
</template>

<script>
export default {
    name : 'TopMenu',
    props : {
        hint_search : String
    },
    data(){
        return {
            categories : [],
            category_query : {
                search_value : '',
                search_by: 'name',
                order_by : 'name',
                order_dir : 'asc',
                offset : 0,
                limit : 10
            },
            filter : {
                category_id : '',
                search_value : '',
                teacher_id : ''
            },
            selected_chip : 'NO_CATEGORY'

        }
    },
    created(){
        this.getCategories()
    },
    methods : {
        onCategoryClick(id){
            this.filter.category_id = id
            this.$emit('on-category-click',this.filter)
        },
        onSearchTyping(){
            this.filter.search_value = this.category_query.search_value
            this.$emit('on-search-typing',this.filter)
        },
        getCategories(){

            // request api graphql with apolo
            this.$apollo.query({
                query : require('../../graphql/listCategory.gql'),
                variables : this.category_query
                }).then(result => {

                    this.categories = result.data.category_list

                }).catch(error => {

                    console.log(error)

                })
        }
    }
}
</script>

<style scoped>
a {
    cursor: pointer;
}

#category-radio {
    margin-right: 15px;
}

#search-form {
    border-radius: 15px;
    padding: 1px;
}

.TopMenu {
    margin-left:30px;
    margin-right: 30px; 
}

#category-chooser {
    margin-bottom: 15px;
    margin-top:20px;
}

#category-chip:hover {
    cursor: pointer;
}

#category-chip {
    font-size: 15px;

}
</style>