import request from './request'
import { getUuid } from '@/utils'

export function requestLogin() {
  return request({
    url: ''
  })
}

export function requestNotes() {
  const list = Array.from({ length: 23 }).map((_, i) => ({
    id: getUuid(),
    title: `ant design part ${i}`,
    isPrivate: Math.random() > 0.8,
    isShow: Math.random() > 0.5,
    description:
      'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  }))


  return Promise.resolve({
    code: 0,
    msg: '',
    data: list.sort((a, b) => {
      if (a.isPrivate && !b.isPrivate) {
        return -1;
      } else if (!a.isPrivate && b.isPrivate) {
        return 1;
      } else {
        // 如果isShow都为true或者都为false，则按照默认顺序排序
        return 0;
      }
    })
  })
}

export function requestDeleteNote(id) {
  return request({
    url: '',
    data: {
      id
    }
  })
}

export function requestHideOrShowNote({ id, type }) {
  return request({
    url: '',
    data: {
      id,
      type
    }
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
