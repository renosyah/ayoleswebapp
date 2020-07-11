<template>
    <div class="ModalMessageComponent">

        <!---- each modal MUST have unique id html tag ---->
        <div v-bind:id="id" class="modal">
            <div class="modal-content">
            <h4>{{ title }}</h4>
            <p> {{ message }} </p>
            </div>
            <div class="modal-footer">
            <a href="#!" class="modal-close waves-effect waves-green btn-flat">Close</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name : 'ModalMessageComponent',
    props : {
        id : String,
        title : String,
        message : String
    },
    mounted : function(){
        window.$('.modal').modal();
    },
    methods : {
        showModal(){
            window.$('#' + this.id).modal('open');
        },
    }
}
</script>

<style scoped>



</style>