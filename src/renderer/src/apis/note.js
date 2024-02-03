import request from '@/apis/request'

export function requestNoteByWordId(id) {
  return request({
    url: '/notes/listByWord',
    data: {
      id
    }
  })
}

export function requestAddNote(data) {
  return request({
    url: '/notes/add',
    data
  })
}

export function requestModifyNote(data) {
  return request({
    url: '/notes/update',
    data
  })
}

export function requestDeleteNote(data) {
  return request({
    url: 'notes/delete',
    data
  })
}

