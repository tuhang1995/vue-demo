<template>
  <div class="navMenus">
    <template v-for="(item, index) in navMenus">
      <!-- 不存在子节点 -->
      <el-menu-item
        v-if="!item.childs"
        :key="index"
        @click="handle_menuItem(item)"
        :index="item.pageUrl"
      >
        <i :class="item.icon"></i>
        <span slot="title"> {{ item.name }}</span>
      </el-menu-item>

      <!-- 存在子节点 -->
      <el-submenu
        v-if="item.childs"
        :key="index + 'child'"
        :index="item.pageUrl"
      >
        <template slot="title">
          <i :class="item.icon"></i>
          <span v-show="!isCollapse"> {{ item.name }}</span>
        </template>
        <NavMenu
          @click="handle_menuItem(item.childs)"
          :navMenus="item.childs"
        ></NavMenu>
      </el-submenu>
    </template>
  </div>
</template>

<script>
export default {
  name: 'NavMenu',
  props: ['navMenus', 'isCollapse'],
  data() {
    return {}
  },

  components: {},

  computed: {},

  beforeMount() {},

  mounted() {},

  methods: {
    handle_menuItem(item) {
      this.$global.tabsItem = item
      this.$router.push(item.pageUrl)
    },
  },

  watch: {},
}
</script>
<style lang="stylus" scoped>































//
</style>
