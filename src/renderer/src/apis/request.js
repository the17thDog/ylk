
import axios from 'axios'
import { message } from 'antd'

const baseURL = localStorage.getItem('url')
// create an axios instance
const service = axios.create({
  baseURL,
  method: 'post',
  withCredentials: true,
  timeout: 100000 // request timeout
})

service.interceptors.request.use(
  config => {
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
      window.location.href = '#/login'
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
