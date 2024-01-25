import { v4 } from 'uuid'
import { isNil } from 'lodash'

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
