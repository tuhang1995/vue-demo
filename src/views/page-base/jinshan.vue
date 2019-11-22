<template>
  <div class="main-warp">
    <div class="child-warp">
      <el-button @click.native='showModel'>显示模态框</el-button>
    </div>
    <transition name="slide">
      <animation-demo @close='close'
                      v-if="modelVis"></animation-demo>
    </transition>
  </div>
</template>

<script>
import animationDemo from './animationDemo'
export default {
  name: '',
  props: [''],
  data () {
    return {
      modelVis: false
    };
  },

  components: {
    animationDemo
  },

  computed: {},

  beforeMount () { },

  mounted () { },

  methods: {
    showModel () {
      this.modelVis = true
    },
    close () {
      this.modelVis = false
    }
  },

  watch: {}

}

</script>
<style lang='stylus' scoped>
.slide-enter-active, .slide-leave-active
  transition all 0.3s
.slide-enter, .slide-leave-to
  transform translate3d(100%, 0, 0)
</style>