<template>
  <div class="home">
    <home-con></home-con>
  </div>
</template>

<script>  
import homeCon from '@/views/layout/index'
export default {
  name: 'home',
  components: {
    homeCon
  }
}
</script>
<style lang="stylus">
.home
  display flex
  width 100%
  height 100%
  .main
    flex 1
</style>
