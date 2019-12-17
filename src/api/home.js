/* 使用方法
 在页面引入该文件 
 import api from '@/api/home
 @example  api.getInit().then(()=>{
   
 })
 改api是json-serve进行增删改查
*/

import api from '@/common/js/serve'
let commnoApi = {
    getTable(data) {
        return api('/comments', data, 'get')
    },
    //获取表格
    postTable(data) {
        return api('/testTable', data, 'get')
    },
    //表格增加
    addTable(data) {
        return api('/testTable', data, 'post')
    },
    //修改
    editTable(data) {
        return api(`/testTable/${data.id}`, data, 'put')
    },
    //删除
    deletTable(data) {
        return api(`/testTable/${data.id}`, "", 'delete')
    },
    //获取地图坐标
    mapData(data) {
        return api('/mapData', data, 'get')
    }
}
export default commnoApi