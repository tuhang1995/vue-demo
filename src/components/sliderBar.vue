<template>
  <div class="sliderBar">
    <el-menu class="el-menu-vertical-demo"
             :default-active="$route.path">
      <el-menu-item v-for="(item, index) in menuItem"
                    :key="index"
                    :index="item.pageUrl"
                    @click="handle_menuItem(item)">
        <i :class="item.icon"></i>
        <span>{{ item.name }}</span>
      </el-menu-item>
    </el-menu>
  </div>

</template>

<script>

export default {
  name: '',
  props: [''],
  data () {
    return {
      menuItem: [
        {
          name: "多点碰撞",
          icon: "el-icon-star-on",
          pageUrl: "/page/header"
        },
        {
          name: "热点基础查询",
          icon: "el-icon-star-on",
          pageUrl: "/page/base"
        }
      ]

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
.sliderBar
  width 200px
/deep/.el-menu-vertical-demo
  height 100%
</style>