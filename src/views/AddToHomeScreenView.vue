<template>
    <div class="AddToHomeScreen" v-show="show">
        <transition name="bounce">
            <div class="container center">
                <div class="row">
                    <div class="col s12 m2"></div>
                    <div class="col s12 m8">
                        <a v-on:click="addingToHomeScreen">
                            <div class="chip center blue">
                                <span class="white-text">Add to home screen</span>
                            </div>
                        </a>
                    </div>
                    <div class="col s12 m2"></div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
    name : 'AddToHomeScreen',
    data(){
        return {
            status_install : {
                installed : false
            },
            show : false,
            deferredPrompt : null
        }
    },
    created() {

        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            this.deferredPrompt = e;
            this.loadStatusInstalled()
        })
    },
    methods : {
        addingToHomeScreen(){
            this.show = false
            this.deferredPrompt.prompt();
            this.deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {

                    console.log('User accepted the A2HS prompt');
                    this.saveStatusInstalled()

                } else {
                    console.log('User dismissed the A2HS prompt');
                }
                this.deferredPrompt = null;
            });
        },
        saveStatusInstalled(){
            this.status_install.installed = true
            const parsed = JSON.stringify(this.status_install);
            localStorage.setItem('status_install', parsed);
        },
        loadStatusInstalled(){
            if (!localStorage.getItem('status_install')) {
                this.show = true
            }
        }
    }
}
</script>

<style scoped>

a {
    cursor: pointer;
}

.AddToHomeScreen {
  overflow: hidden;
  position: fixed;
  bottom: 0;
  width: 100%;
  font-size: 32px;
}

.bounce-enter-active {
  animation: bounce-in .5s;
}
.bounce-leave-active {
  animation: bounce-in .5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
}

</style>