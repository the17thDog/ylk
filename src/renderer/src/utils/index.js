import { v4 } from 'uuid'
import { isNil } from 'lodash'
import { Modal } from 'antd'
import dayjs from 'dayjs'

export const getUuid = () => v4().replace('-', '')

export const markTextWithFlag = (text, flag) => {
  if (!text) {
    return ''
  }

  // 使用正则表达式查找文本中需要标记的部分
  const regex = new RegExp(flag, 'gi');

  const markedText = text.replace(regex, match => `<mark>${match}</mark>`);

  return markedText;
}

export const filterEmptyField = (obj) => {
  const res = {}

  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      const element = obj[key]

      if (!isNil(element)) {
        res[key] = element
      }
    }
  }

  return res
}

/**
 * @param {import('antd').ModalFuncProps} props
 * @returns
 */
export const showConfirm = (props) => {
  const { title = '提示' } = props

  return new Promise((resolve) => {
    Modal.confirm({
      title,
      okText: '确定',
      centered: true,
      cancelText: '取消',
      okType: 'danger',
      ...props,
      onOk() {
        resolve()
      },
    })
  })
}

export const formatTime = v => {
  if (!v) return '-'

  return dayjs(v).format('YYYY-MM-DD')
}
