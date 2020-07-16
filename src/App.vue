<template>
  <div id="app">
    <router-view />
    <OfflineWarningView />
  </div>
</template>

<script>

import OfflineWarningView from './views/OfflineWarningView.vue'

export default {
  components : {
    OfflineWarningView
  }
}
</script>
