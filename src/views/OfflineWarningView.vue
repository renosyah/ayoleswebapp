<template>
    <div class="OfflineWarning" v-show="!is_online">
        <div class="container center">
            <div class="row">
                <div class="col s12 m2"></div>
                <div class="col s12 m8">
                    <div class="chip red white-text center">
                        <span class="white-text">You are currently offline!</span>
                    </div>
                </div>
                <div class="col s12 m2"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name : 'OfflineWarning',
    data(){
        return {
            is_online : true
        }
    },
    created() {
        window.addEventListener('offline', () => {
            this.is_online = false
        })
        window.addEventListener('online', () => {
            this.is_online = true
        })
    }
}
</script>

<style scoped>
.OfflineWarning {
  overflow: hidden;
  position: fixed;
  bottom: 0;
  z-index: 10;
  width: 100%;
  font-size: 14px;
}
</style>