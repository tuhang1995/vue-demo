import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'

const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(error => error)
}
Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'login',
        component: () =>
            import ('@/views/login/index'),
        meta: {
            needLogin: false
        }
    },
    {
        path: '/register',
        name: 'register',
        component: () =>
            import ('@/views/node/leanRouter'),
        meta: {
            needLogin: false
        }
    },
    {
        path: '/index',
        name: 'page',
        component: () =>
            import ('@/views/layout/index'),
        children: [{
                path: '/components',
                name: 'components',
                title: "组件",
                component: () =>
                    import ('@/views/page-header/index')
            },
            {
                path: '/base',
                name: 'base',
                component: () =>
                    import ('@/views/page-base/index'),
                children: [{
                        path: '/base/jinshan',
                        name: 'jinshan',
                        title: "模态框左边进入",
                        component: () =>
                            import ('@/views/page-base/jinshan')
                    },
                    {
                        path: '/base/nowVideo',
                        name: 'nowVideo',
                        component: () =>
                            import ('@/views/page-base/nowVideo')
                    },
                    {
                        path: '/base/mergeTable',
                        name: 'mergeTable',
                        component: () =>
                            import ('@/views/page-base/merge-table')
                    }, {
                        path: '/base/tabs',
                        name: 'tabs',
                        component: () =>
                            import ('@/views/page-base/tabs')
                    }
                ]
            },
            {
                path: '/char',
                name: 'char',
                component: () =>
                    import ('@/views/char/index')
            },
            {
                path: '/map',
                name: 'map',
                component: () =>
                    import ('@/views/map/index')
            },
            {
                path: '/node',
                name: 'node',
                component: () =>
                    import ('@/views/node/index'),
                children: [{
                    path: '/node/leanRouter',
                    name: 'leanRouter',
                    component: () =>
                        import ('@/views/node/leanRouter')
                }, {
                    path: '/node/test',
                    name: 'test',
                    component: () =>
                        import ('@/views/node/test')
                }]
            },
            {
                path: '/tabs',
                name: 'tabs',
                component: () =>
                    import ('@/views/tabs/index')
            }
        ]
    }
]

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
})

export default router