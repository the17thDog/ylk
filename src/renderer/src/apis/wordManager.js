import request from './request'

export function requestWords(data) {
  const data1 = [
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

  // return Promise.resolve({
  //   code: 0,
  //   data: {
  //     list: data,
  //     total: parseInt(Math.random() * 100)
  //   }
  // })

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
