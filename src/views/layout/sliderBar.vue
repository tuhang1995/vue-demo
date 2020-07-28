<template>
  <div class="sliderBar">
    <div class="user">
      <el-avatar :src="circleUrl"></el-avatar>
      <h5>{{ admin }}</h5>
    </div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      @open="handleOpen"
      @close="handleClose"
    >
      <NavMenu :navMenus="menuItem" :isCollapse="isCollapse"></NavMenu>
    </el-menu>
  </div>
</template>

<script>
import NavMenu from './navMenu.vue'
export default {
  name: '',
  props: [''],
  data() {
    return {
      admin: this.$global.userData || sessionStorage.getItem('userName'),
      circleUrl: require('@/assets/avatar.jpg'),
      menuItem: [
        {
          name: '首页',
          icon: 'el-icon-menu',
          pageUrl: '/home',
        },
        {
          name: '组件',
          icon: 'el-icon-menu',
          pageUrl: '/components',
        },
        {
          name: '工作总结',
          icon: 'el-icon-tickets',
          pageUrl: '/base',
          childs: [
            {
              name: '模态框左边进入',
              pageUrl: '/base/jinshan',
              icon: 'el-icon-news',
            },
            {
              name: '实时视频播放',
              pageUrl: '/base/nowVideo',
              icon: 'el-icon-eleme',
            },
            {
              name: '合并表格',
              pageUrl: '/base/mergeTable',
              icon: 'el-icon-paperclip',
            },
          ],
        },
        {
          name: '响应式echarts',
          icon: 'el-icon-pie-chart',
          pageUrl: '/char',
        },
        {
          name: '地图',
          icon: 'el-icon-position',
          pageUrl: '/map',
        },
        {
          name: 'node学习',
          icon: 'el-icon-monitor',
          pageUrl: '/node',
          childs: [
            {
              name: '学习路由',
              pageUrl: '/node/leanRouter',
              icon: 'el-icon-table-lamp',
            },
          ],
        },
        {
          name: '标签页',
          icon: 'el-icon-position',
          pageUrl: '/tabs',
        },
      ],
    }
  },

  components: {
    NavMenu,
  },

  computed: {
    isCollapse() {
      return this.$global.isCollapse
    },
    activeIndex() {
      //默认显示第一个  总感觉路由配错了... 以后再来改
      if (this.$route.path == '/') {
        this.$router.push('/home')
      }

      return this.$route.path
    },
  },

  beforeMount() {},

  mounted() {},

  methods: {
    handle_menuItem(item) {
      this.$router.push(item.pageUrl)
    },
    handleOpen(key, keyPath) {
      //this.$router.push(keyPath[0]);
      // console.log(keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
  },

  watch: {},
}
</script>
<style lang="stylus" scoped>
.wrap
  width 100%
  display flex
.sliderBar
  overflow hidden
  background-color #2F4051
.user
  height 20vh
  display flex
  color #fff
  flex-direction column
  align-items center
  justify-content center
</style>
