<template>
    <div class="SideMenu">
        <div id="search-form" class="nav-wrapper card">
            <div class="input-field grey-text">
                <input id="search" v-model="category_query.search_value" v-on:keyup="onSearchTyping" placeholder="Search Course.." type="search">
                <label class="label-icon" for="search"><i class="material-icons blue-text">search</i></label>
            </div>
            
        </div> 

        <div class="card-panel">
        
        <div class="center">
                <div class="preloader-wrapper small active" v-show="categories.length == 0">
                    <div class="spinner-layer spinner-orange-only">
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
                <a id="category-radio">
                    <label>
                        <input checked class="with-gap" name="group_category" type="radio" v-on:click="onCategoryClick('')" />
                        <span>No Category</span>
                    </label>
                </a>
                <a id="category-radio" v-for="category in categories" v-bind:key="category.id">
                    <label>
                        <input class="with-gap" name="group_category" type="radio" v-on:click="onCategoryClick(category.id)" />
                        <span>{{ category.name }}</span>
                    </label>
                </a>
            </a>

        </div>
    </div>
</template>

<script>
export default {
    name : 'SideMenu',
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
            }

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
    padding: 1px;
}

</style>