import Vue from 'vue'
var global = new Vue({
    data: {
        path: "我是全局变量",
        editableTabs: [{
            title: '组件',
            name: 'components',
            pageUrl: '/components'
        }],
        editableTabsValue: "1",
        tabIndex: 1,
    },
    methods: {

    }
})
export default global