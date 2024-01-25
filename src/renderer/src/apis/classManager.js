import request from './request'

export function requestClasses(params) {
  console.log('params :', params);
  const data = [
    {
      key: '1',
      classNo: '一班',
      account: 'Gouzi@gmal.com',
      status: 1,
      time: '2018-12-13',
    },
    {
      key: '2',
      classNo: '一班',
      account: 'Gouzi@gmal.com',
      status: 1,
      time: '2018-12-13',
    },
    {
      key: '3',
      classNo: '一班',
      account: 'Gouzi@gmal.com',
      status: 0,
      time: '2018-12-13',
    },{
      key: '1111',
      classNo: '一班',
      account: 'Gouzi@gmal.com',
      status: 1,
      time: '2018-12-13',
    },
    {
      key: '2111',
      classNo: '一班',
      account: 'Gouzi@gmal.com',
      status: 1,
      time: '2018-12-13',
    },
    {
      key: '3111',
      classNo: '一班',
      account: 'Gouzi@gmal.com',
      status: 0,
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
