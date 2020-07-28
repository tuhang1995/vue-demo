<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <router-view />
    </transition>
  </section>
</template>

<script>
export default {
  name: '',
  props: [''],
  data() {
    return {
      activeIndex: this.$route.path,
    }
  },

  components: {},

  computed: {},

  beforeMount() {},

  mounted() {},

  methods: {
    tabClick() {
      let path = this.activeIndex
      console.log(this.$route)
      // 用户详情页的时候，对应了二级路由，需要拼接添加第二级路由
      // if (this.activeIndex === '/userInfo') {
      //   path = this.activeIndex + '/' + this.$store.state.userInfo.name
      // }
      this.$router.push({ path: path })
    },
    tabRemove(targetName) {
      if (targetName == '/') {
        return
      }

      if (this.activeIndex === targetName) {
        // 设置当前激活的路由
        if (this.options && this.options.length >= 1) {
          this.$router.push({ path: this.activeIndex })
        } else {
          this.$router.push({ path: '/' })
        }
      }
    },
  },

  watch: {},
}
</script>
<style lang="stylus" scoped>
.app-main
  flex 1
</style>
