/**
 * 该文件只是参考, 如果你觉得你的方法更好, 可用自己的
 *
 */
//配置api接口
import axios from 'axios'
var rootApi = "http://15.60.16.86:18080/ksb";
//var rootApi = "http://15.60.16.86:8080/pcs"
//设置请求头 
const http = axios.create({
    baseURL: rootApi,
    // withCredentials: true,
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    responseType: 'json'

});
//自定义判断元素类型js
function toType(obj) {
    return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}
http.interceptors.request.use((config) => {
    return config
});
//响应拦截
http.interceptors.response.use((res) => {
    return res
}, (error) => {
    return Promise.reject(error)
});
//对参数进行处理
function filterNull(o) {
    for (var key in o) {
        if (o[key] === null) {
            delete o[key]
        }
        if (toType(o.key) === 'string') {
            o[key] = o[key].trim()
        } else if (toType(o.key) === 'object') {
            o[key] = filterNull(o[key])
        } else if (toType(o.key) === 'array') {
            o[key] = filterNull(o[key])
        }
    }
    return o
}

export default function commonapi(url, data, method = 'post') {
    if (data) {
        data = filterNull(data)
    }
    return new Promise((resolve, reject) => {
        const options = {
            url,
            method
        };
        if (method.toLowerCase() === 'get') {
            options.params = data
        } else {
            options.data = data
        }
        http(options).then(res => {

            // console.log('成功返回数据');

            resolve(res.data)
        }).catch(err => {
            reject();
            console.log("接口请求失败", err)
        })
    })
}