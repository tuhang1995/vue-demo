<template>
  <div class="sliderBar">
    <el-menu background-color="#545c64"
             text-color="#fff"
             active-text-color="#ffd04b"
             :default-active="activeIndex"
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
          pageUrl: "/page/header"
        },
        {
          name: "工作总结",
          icon: "el-icon-tickets",
          pageUrl: "/page/base",
          childs: [
            {
              name: '模态框左边进入',
              pageUrl: "/page/base/jinshan",
              icon: "el-icon-news",
            },
            {
              name: '实时视频播放',
              pageUrl: "/page/base/nowVideo",
              icon: "el-icon-eleme",
            },
            {
              name: '子页面3',
              pageUrl: "/page/base/test3",
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
      // if (this.$route.path == '/warn/carWarn/addUser') {
      //   return '/warn/carWarn'
      // }

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
</style>