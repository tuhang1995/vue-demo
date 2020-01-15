import api from '@/common/js/serve'
let commnoApi = {
    getData(data) {
        return api('/user/all', data, 'get')
    },
    //添加用户
    addUser(data) {
        return api("/user/add", data, 'post')
    },
    //获取地图数据
    getMap(data) {
        return api("/map/all", data, 'get')
    },
    searchData(data) {
        return api("/user/search", data, 'get')
    },
    //注册
    register(data) {
        return api("/user/register", data, 'post')
    },
    //登陆
    login(data) {
        return api("/user/login", data, 'post')
    }

}
export default commnoApi