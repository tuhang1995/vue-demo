<template>
  <div class="sliderBar">
    <el-menu :default-active="activeIndex"
             class="el-menu-vertical-demo"
             @open="handleOpen"
             @close="handleClose">
      <NavMenu :navMenus="menuItem"></NavMenu>

    </el-menu>
  </div>

</template>

<script>
import NavMenu from "./navMenu.vue";
export default {
  name: '',
  props: [''],
  data () {
    return {
      menuItem: [
        {
          name: "组件",
          icon: "el-icon-menu",
          pageUrl: "/components"
        },
        {
          name: "工作总结",
          icon: "el-icon-tickets",
          pageUrl: "/base",
          childs: [
            {
              name: '模态框左边进入',
              pageUrl: "/base/jinshan",
              icon: "el-icon-news",
            },
            {
              name: '实时视频播放',
              pageUrl: "/base/nowVideo",
              icon: "el-icon-eleme",
            },
            {
              name: '合并表格',
              pageUrl: "/base/mergeTable",
              icon: "el-icon-paperclip",
            }
          ]
        }
      ]

    };
  },

  components: {
    NavMenu
  },

  computed: {
    activeIndex () {
      //默认显示第一个  总感觉路由配错了... 以后再来改
      if (this.$route.path == '/') {
        this.$router.push('/components');
      }

      return this.$route.path
    }
  },

  beforeMount () { },

  mounted () { },

  methods: {
    handle_menuItem (item) {
      this.$router.push(item.pageUrl);
    },
    handleOpen (key, keyPath) {
      //this.$router.push(keyPath[0]);
      // console.log(keyPath);
    },
    handleClose (key, keyPath) {
      // console.log(key, keyPath);
    },
  },

  watch: {}

}

</script>
<style lang='stylus' scoped>
.wrap
  width 100%
  display flex
.sliderBar
  width 240px
  min-height 400px
/deep/.el-menu-vertical-demo
  height 100%
  text-align left
  width 240px
  min-height 400px
/deep/.el-menu-item.is-active
  color #75b9e6
  background-color #EAEEEF
/deep/.el-menu
  background-color #F3F5F6
  color #768399
/deep/.el-menu-item, /deep/.el-submenu__title
  color #768399
/deep/.el-menu-item:focus, /deep/.el-menu-item:hover, /deep/.el-submenu__title:hover
  color #75b9e6
  background-color #EAEEEF
</style>