import request from './request'

export function requestPhrases(params) {
  const data = [
    {
      key: '1',
      english: 'good',
      chinese: '好',
      time: '2018-12-13',
    },
    {
      key: '2',
      english: 'good',
      chinese: '好',
      time: '2018-12-13',
    },
    {
      key: '3',
      english: 'good',
      chinese: '好',
      time: '2018-12-13',
    },{
      key: '1111',
      english: 'good',
      chinese: '好',
      time: '2018-12-13',
    },
    {
      key: '2111',
      english: 'good',
      chinese: '好',
      time: '2018-12-13',
    },
    {
      key: '3111',
      english: 'good',
      chinese: '好',
      time: '2018-12-13',
    },
  ]

  return Promise.resolve({
    code: 0,
    data: {
      list: data,
      total: parseInt(Math.random() * 100)
    }
  })
}

export function requestCreatePhrase(params) {
  return Promise.resolve()

  return request({
    url: '',
    method: 'post',
    data: {
      ...params
    }
  })
}

export function requestDeletePhrase(id) {
  return Promise.resolve()

  return request({
    url: '',
    data: {
      id
    }
  })
}
