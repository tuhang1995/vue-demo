<template>
  <div class="wrap">
    <sliderBar></sliderBar>
    <main-con></main-con>
  </div>
</template>

<script>
import sliderBar from './sliderBar'
import mainCon from './main'
export default {
  name: '',
  props: [''],
  data () {
    return {

    };
  },

  components: {
    sliderBar,
    mainCon
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
  height 100%
</style>