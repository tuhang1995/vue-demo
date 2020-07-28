/**
 *
 *
 */
//配置api接口
import axios from 'axios'
import router from '../../router'
import { Message } from 'element-ui'
//var rootApi = '/api'; //这里是为了处理跨域
var rootApi = 'http://127.0.0.1:3000'
//设置请求头
const http = axios.create({
  baseURL: rootApi,
  // withCredentials: true,
  // headers: {
  //   'Content-Type': 'application/json;charset=utf-8',
  // },
  // responseType: 'json',
})
//自定义判断元素类型js
function toType(obj) {
  return {}.toString
    .call(obj)
    .match(/\s([a-zA-Z]+)/)[1]
    .toLowerCase()
}
http.interceptors.request.use(
  (config) => {
    if (sessionStorage.getItem('token')) {
      config.headers.token = sessionStorage.getItem('token')
    }
    return config
  },
  (error) => {
    Message({
      message: error.message,
      type: 'error',
      duration: 3 * 1000,
    })
    console.error(error) // for debug
    Promise.reject(error)
  }
)
//响应拦截
http.interceptors.response.use(
  (res) => {
    if (res.data.status === 1) {
      router.replace({
        path: '/',
      })
    }
    return res
  },
  (error) => {
    return Promise.reject(error)
  }
)
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
      method,
    }
    if (method.toLowerCase() === 'get') {
      options.params = data
    } else {
      options.data = data
    }
    http(options)
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject()
        console.log('接口请求失败', err)
      })
  })
}
