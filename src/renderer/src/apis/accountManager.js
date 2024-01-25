import request from './request'

export function requestAccounts(params) {
  const data = [
    {
      key: '1',
      classNo: '一班',
      account: 'Gouzi@gmal.com',
      status: 1,
      time: '2018-12-13',
      password: '1111',
      checkCode: '669242',
      nickname: 'bens',
      auth: '笔记,后台'
    },
    {
      key: '2',
      classNo: '一班',
      account: 'Gouzi@gmal.com',
      status: 1,
      time: '2018-12-13',
      password: '1111',
      checkCode: '669242',
      nickname: 'bens',
      auth: '笔记,后台'
    },
    {
      key: '3',
      classNo: '一班',
      account: 'Gouzi@gmal.com',
      status: 0,
      time: '2018-12-13',
      password: '1111',
      checkCode: '669242',
      nickname: 'bens',
      auth: '笔记,后台'
    },{
      key: '1111',
      classNo: '一班',
      account: 'Gouzi@gmal.com',
      status: 1,
      time: '2018-12-13',
      password: '1111',
      checkCode: '669242',
      nickname: 'bens',
      auth: '笔记,后台'
    },
    {
      key: '2111',
      classNo: '一班',
      account: 'Gouzi@gmal.com',
      status: 1,
      time: '2018-12-13',
      password: '1111',
      checkCode: '669242',
      nickname: 'bens',
      auth: '笔记,后台'
    },
    {
      key: '3111',
      classNo: '一班',
      account: 'Gouzi@gmal.com',
      status: 0,
      time: '2018-12-13',
      password: '1111',
      checkCode: '669242',
      nickname: 'bens',
      auth: '笔记,后台'
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

export function requestCreateAccount(params) {
  return Promise.resolve()

  return request({
    url: '',
    method: 'post',
    data: {
      ...params
    }
  })
}

export function requestDeleteAccount(id) {
  return Promise.resolve()

  return request({
    url: '',
    data: {
      id
    }
  })
}

export function requestDisableAccount(id) {
  return Promise.resolve()

  return request({
    url: '',
    data: {
      id
    }
  })
}

export function requestEnableAccount(id) {
  return Promise.resolve()

  return request({
    url: '',
    data: {
      id
    }
  })
}
