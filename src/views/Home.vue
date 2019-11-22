<template>
  <div class="home">
    <!-- <sliderBar></sliderBar> -->
    <!-- <main-con>

    </main-con> -->
    <home-con></home-con>
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'
import sliderBar from '@/components/sliderBar'
import mainCon from '@/views/page-home/index'
import homeCon from '@/views/layout/index'
export default {
  name: 'home',
  components: {
    sliderBar,
    mainCon,
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
