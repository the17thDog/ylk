import request from './request'
import { getUuid } from '@/utils'

export function requestSearch(data) {
  return request({
    url: '/word/search',
    data
  })
}

export function requestPhraseList() {
  const length = parseInt(Math.random() * 100)

  const list = Array.from({ length }).map((_, i) => ({
    id: getUuid(),
    title: `ant design part ${i}`,
    isPrivate: Math.random() > 0.8,
    isShow: Math.random() > 0.5,
    description:
      `${i} Ant Design, a design language for background applications, is refined by Ant UED Team.`,
    content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  }))

  return Promise.resolve({
    code: 0,
    msg: '',
    data: {
      list,
      total: length
    },
  })
}

export function requestArticles() {
  const length = parseInt(Math.random() * 100)

  const list = Array.from({ length }).map((_, i) => ({
    id: getUuid(),
    title: `${i} ant design part`,
    times: length,
  }))

  return Promise.resolve({
    code: 0,
    msg: '',
    data: {
      list,
      total: length
    },
  })
}

export function requestArticle() {
  const text = 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.'

  return Promise.resolve({
    code: 0,
    msg: '',
    data: Array(50).fill(text).join(),
  })
}
