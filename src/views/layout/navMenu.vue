<template>
  <div class="navMenus">
    <template v-for="(item, index) in navMenus">
      <el-menu-item v-if="!item.childs"
                    :key="index"
                    @click="handle_menuItem(item)"
                    :index="item.pageUrl">
        <i :class="item.icon"></i>
        <span slot="title">{{item.name}}</span>
      </el-menu-item>
      <!-- 此菜单下还有子菜单 -->
      <el-submenu v-if="item.childs"
                  :key="index+'child'"
                  :index="item.pageUrl">
        <template slot="title">
          <img class="icon"
               :src="item.imgUrl" />
          <i :class="item.icon"></i>
          <span> {{item.name}}</span>
        </template>
        <!-- 递归 -->
        <NavMenu @click="handle_menuItem(item.childs)"
                 :navMenus="item.childs"></NavMenu>
      </el-submenu>
    </template>
  </div>
</template>

<script>

export default {
  name: 'NavMenu',
  props: ['navMenus'],
  data () {
    return {

    };
  },

  components: {},

  computed: {},

  beforeMount () { },

  mounted () { },

  methods: {
    handle_menuItem (item) {
      this.$router.push(item.pageUrl);
    }
  },

  watch: {}

}

</script>
<style lang='stylus' scoped>































//  















</style>