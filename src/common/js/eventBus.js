import Vue from 'vue'
var global = new Vue({
  data: {
    path: '我是全局变量',
    isCollapse: false,
    tabsItem: null, //当前点击的侧边栏信息
    userData: null, //用户信息
  },
  methods: {},
})
export default global
