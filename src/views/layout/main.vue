<template>
  <section class="app-main">
    <el-tabs
      v-model="activeIndex"
      type="border-card"
      closable
      @tab-click="tabClick"
      v-if="options.length"
      @tab-remove="tabRemove"
    >
      <el-tab-pane
        :key="item.name"
        v-for="(item, index) in options"
        :label="item.title"
        :name="item.route"
      >
      </el-tab-pane>
    </el-tabs>
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
    <!-- <transition name="fade-transform"
                mode="out-in">
      <router-view :key="key" />
    </transition> -->
  </section>
</template>

<script>
export default {
  name: '',
  props: [''],
  data() {
    return {
      activeIndex: this.$route.path
    }
  },

  components: {},

  computed: {
    key() {
      return this.$route.path
    },
    options() {
      return this.$store.state.options
    }
  },

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
      this.$store.commit('delete_tabs', targetName)
      if (this.activeIndex === targetName) {
        // 设置当前激活的路由
        if (this.options && this.options.length >= 1) {
          this.$store.commit(
            'set_active_index',
            this.options[this.options.length - 1].route
          )
          this.$router.push({ path: this.activeIndex })
        } else {
          this.$router.push({ path: '/' })
        }
      }
    }
  },

  watch: {}
}
</script>
<style lang="stylus" scoped>
.app-main
  flex 1
</style>
