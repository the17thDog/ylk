
import axios from 'axios'
import { message } from 'antd'
// create an axios instance
const service = axios.create({
  baseURL: 'https://49e4-183-128-117-119.ngrok-free.app/',
  method: 'post',
  timeout: 100000 // request timeout
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
    if(res.errno === 2110){
      window.location.href = '/login'
      return
    }

    if (res.errno !== 200 && res.errno !== 0) {
      const msg = res.errmsg || '请求失败'

      message.error(msg)

      return Promise.reject(msg)
    } else {
      return res
    }
  },
  error => {
    if(error?.response.data.errno === 2110){
      window.location.href = '/login'
      message.error('未登录')
      return
    }
    console.log('err' + error) // for debug
    message.error(error?.message)
    return Promise.reject(error)
  }
)

export default service
