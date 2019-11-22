<template>
  <div class="animationModel">
    <el-button @click.native="back"> 返回</el-button>
    我是动画demo
  </div>
</template>

<script>

export default {
  name: '',
  props: [''],
  data () {
    return {

    };
  },

  components: {},

  computed: {},

  beforeMount () { },

  mounted () { },

  methods: {
    back () {
      this.$emit('close', false)
    }
  },

  watch: {}

}

</script>
<style lang='stylus' scoped></style>