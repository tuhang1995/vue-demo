<template>
  <section class="app-main">
    <transition name="fade-transform"
                mode="out-in">
      <router-view :key="key" />
    </transition>
  </section>
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

  computed: {
    key () {
      return this.$route.path
    }
  },

  beforeMount () { },

  mounted () { },

  methods: {},

  watch: {}

}

</script>
<style lang='stylus' scoped>
.app-main
  flex 1
</style>