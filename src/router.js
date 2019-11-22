import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";

Vue.use(VueRouter);

const routes = [{
        path: "/",
        name: "home",
        component: Home
    },
    {
        path: "/page",
        name: "page",
        component: () =>
            import ("@/views/layout/index"),
        children: [{
                path: "/page/header",
                name: "header",
                component: () =>
                    import ("@/views/page-header/index")
            },
            {
                path: "/page/base",
                name: "base",
                component: () =>
                    import ("@/views/page-base/index"),
                children: [{
                    path: '/page/base/jinshan',
                    name: 'jinshan',
                    component: () =>
                        import ("@/views/page-base/jinshan"),
                }, {
                    path: '/page/base/nowVideo',
                    name: 'nowVideo',
                    component: () =>
                        import ("@/views/page-base/nowVideo"),
                }, {
                    path: '/page/base/test3',
                    name: 'test3',
                    component: () =>
                        import ("@/views/page-base/test3"),
                }]
            }
        ]
    }
];

const router = new VueRouter({
    mode: "hash",
    base: process.env.BASE_URL,
    routes
});

export default router;