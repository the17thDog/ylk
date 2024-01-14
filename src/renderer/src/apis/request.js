
import axios from 'axios'
import { message } from 'antd'
// create an axios instance
const service = axios.create({
  baseURL:'/',
  timeout: 1000000 // request timeout
})

service.interceptors.request.use(

  config => {
    config.withCredentials = true
    return config
  },
  error => {
  }
)

service.interceptors.response.use(
  response => {
    const res = response.data
    //未登录的状态下跳转至统一平台
    if(res.code === 4){
      window.location.href=
        process.env.NODE_ENV === 'production'
        ? 'https://uop.imgo.tv/'
        : 'https://duop.imgo.tv/'
      return
    }
    if (res.code !== 200 && res.code !== 0) {
      message.error(res.msg || 'error', 5 * 1000)
      return res
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    message.error(error.msg, 5 * 1000)
    return Promise.reject(error)
  }
)

export default service
