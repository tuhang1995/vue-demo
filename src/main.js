import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './registerServiceWorker'
import echarts from 'echarts'
import '@/common/css/common.styl'
import animated from 'animate.css'
import global from '@/common/js/eventBus'
//import store from '@/store.js';
//  ### 在main.js中引入
Vue.prototype.$global = global
//地图css
import 'leaflet/dist/leaflet.css'
//引入Leaflet对象 挂载到Vue上，便于全局使用，也可以单独页面中单独引用
import * as L from 'leaflet'

//修改icon图标路径
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
})
Vue.L = Vue.prototype.$L = L
import '@/common/js/map.js'
Vue.use(animated)
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
  router,
  store,
  render: function (h) {
    return h(App)
  },
}).$mount('#app')
