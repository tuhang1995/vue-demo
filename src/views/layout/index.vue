<template>
  <div class="wrap">
    <sliderBar></sliderBar>
    <div class="con">
      <page-head></page-head>

      <main-con> </main-con>
    </div>
  </div>
</template>

<script>
import sliderBar from './sliderBar'
import mainCon from './main'
import pageHead from '@/views/layout/page-head'
export default {
  name: '',
  props: [''],
  data() {
    return {}
  },

  components: {
    sliderBar,
    mainCon,
    pageHead,
  },

  computed: {},

  beforeMount() {},

  mounted() {},

  methods: {},

  watch: {},
}
</script>
<style lang="stylus" scoped>
.con
  flex 1
  display flex
  flex-direction column
.wrap
  display flex
  height  100%
  width  100%
</style>
