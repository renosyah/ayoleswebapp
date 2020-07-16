<template>
  <div id="app">
    <router-view />
    <OfflineWarningView />
    <AddToHomeScreenView />
  </div>
</template>

<script>

import OfflineWarningView from './views/OfflineWarningView.vue'
import AddToHomeScreenView from './views/AddToHomeScreenView.vue'

export default {
  components : {
    OfflineWarningView,
    AddToHomeScreenView
  }
}
</script>
