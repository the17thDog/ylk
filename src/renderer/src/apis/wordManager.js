import request from './request'

export function requestWords(data) {
  return request({
    url: '/word/simpleList',
    method: 'post',
    data
  })
}

export function requestCreateWord(data) {
  return request({
    url: '/word/add',
    method: 'post',
    data
  })
}

export function requestDeleteWord(id) {
  return request({
    url: '/word/delete',
    data: {
      id
    }
  })
}


export function requestUploadWord(data) {
  return request({
    url: '/word/upload',
    data
  })
}
