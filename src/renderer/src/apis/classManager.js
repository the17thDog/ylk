import request from './request'

export function requestClasses(params) {
  return request({
    url: '/class/list',
    data: {
      ...params
    }
  })
}

export function requestCreateClass(params) {
  return request({
    url: '/class/add',
    method: 'post',
    data: {
      ...params
    }
  })
}

export function requestDeleteClass(id) {
  return request({
    url: '/class/delete',
    data: {
      id
    }
  })
}

export function requestDisableClass(id) {
  return request({
    url: '/class/updateStatus',
    data: {
      id,
      status: 0
    }
  })
}

export function requestEnableClass(id) {
  return request({
    url: '/class/updateStatus',
    data: {
      id,
      status: 1
    }
  })
}
