import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'

const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch((error) => error)
}
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('@/views/login/index'),
    meta: {
      needLogin: false,
    },
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/node/leanRouter'),
  },

  {
    path: '/index',
    name: 'page',
    component: () => import('@/views/layout/index'),
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/index/index'),
      },
      {
        path: '/components',
        name: 'components',
        title: '组件',
        component: () => import('@/views/page-header/index'),
      },
      {
        path: '/base',
        name: 'base',
        component: () => import('@/views/page-base/index'),
        children: [
          {
            path: '/base/jinshan',
            name: 'jinshan',
            title: '模态框左边进入',
            component: () => import('@/views/page-base/jinshan'),
          },
          {
            path: '/base/nowVideo',
            name: 'nowVideo',
            component: () => import('@/views/page-base/nowVideo'),
          },
          {
            path: '/base/mergeTable',
            name: 'mergeTable',
            component: () => import('@/views/page-base/merge-table'),
          },
          {
            path: '/base/tabs',
            name: 'tabs',
            component: () => import('@/views/page-base/tabs'),
          },
        ],
      },
      {
        path: '/char',
        name: 'char',
        component: () => import('@/views/char/index'),
      },
      {
        path: '/map',
        name: 'map',
        component: () => import('@/views/map/index'),
      },
      {
        path: '/node',
        name: 'node',
        component: () => import('@/views/node/index'),
        children: [
          {
            path: '/node/leanRouter',
            name: 'leanRouter',
            component: () => import('@/views/node/leanRouter'),
          },
        ],
      },
      {
        path: '/tabs',
        name: 'tabs',
        component: () => import('@/views/tabs/index'),
      },
    ],
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
})

// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
// router.beforeEach((to, from, next) => {
//   if (to.path === '/' || to.path === '/register') {
//     next()
//   } else {
//     let token = sessionStorage.getItem('token')
//     if (
//       token === 'null' ||
//       token === '' ||
//       typeof token == 'undefined' ||
//       token === null
//     ) {
//       next('/')
//     } else {
//       next()
//     }
//   }
// })
export default router
