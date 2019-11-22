<template>
  <div class="wrap">
    <page-head></page-head>
    <section class="wrap-con">
      <sliderBar></sliderBar>
      <main-con></main-con>
    </section>

  </div>
</template>

<script>
import sliderBar from './sliderBar'
import mainCon from './main'
import pageHead from '@/views/layout/page-head'
export default {
  name: '',
  props: [''],
  data () {
    return {

    };
  },

  components: {
    sliderBar,
    mainCon,
    pageHead
  },

  computed: {},

  beforeMount () { },

  mounted () { },

  methods: {

  },

  watch: {}

}

</script>
<style lang='stylus' scoped>
.wrap
  display flex
  height 100%
  width 100%
  flex-direction column
.wrap-con
  display flex
  width 100%
  height 100%
</style>