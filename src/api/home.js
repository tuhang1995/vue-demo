/* 使用方法
 在页面引入该文件 
 import api from '@/api/home
 @example  api.getInit().then(()=>{
   
 })
*/

import api from '@/common/js/serve'
let commnoApi = {
    getTable(data) {
        return api('/comments', data, 'get')
    },
    postTable(data) {
        return api('/testTable', data, 'get')
    },
    addTable(data) {
        return api('/testTable', data, 'post')
    },
    //修改
    editTable(data) {
        console.log(data)
        return api(`/testTable/${data.id}`, data, 'put')
    }
}
export default commnoApi