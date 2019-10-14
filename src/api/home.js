/* 使用方法
 在页面引入该文件 
 import api from '@/api/home
 @example  api.getInit().then(()=>{
   
 })
*/

import api from '@/common/js/serve'
let commnoApi = {
    getInit(data) {
        return api('/接口地址', data, 'get')
    }
}
export default commnoApi