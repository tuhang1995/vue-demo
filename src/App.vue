<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import homeCon from '@/views/layout/index'
export default {
  name: 'home',
  components: {
    homeCon,
  },
}
</script>
<style lang="stylus">
#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  height 100vh
  width 100vw
</style>
