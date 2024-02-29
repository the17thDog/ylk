import request from './request'

export function requestArticles(data) {
  return request({
    url: '/article/list',
    data
  })
}

export function requestCreateArticle(params) {
  return request({
    url: '/article/add',
    method: 'post',
    data: {
      ...params
    }
  })
}

export function requestDeleteArticle(ids) {
  return request({
    url: '/article/delete',
    data: {
      ids
    }
  })
}

export function requestUploadArticle(data) {
  return request({
    url: '/article/upload',
    data
  })
}
