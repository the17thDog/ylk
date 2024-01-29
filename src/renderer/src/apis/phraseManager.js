import request from './request'

export function requestPhrases(data) {
  return request({
    url: '/phrase/list',
    data
  })
}

export function requestCreatePhrase(data) {
  return request({
    url: '/phrase/add',
    data
  })
}

export function requestDeletePhrase(id) {
  return request({
    url: '/phrase/delete',
    data: {
      id
    }
  })
}
