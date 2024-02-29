import { useEffect, useState } from 'react'
import { Card, Spin, message } from 'antd'
import Notes from './components/Notes'
import { requestSearch } from '@/apis/dashboard'
import { hasChinese } from '@/utils'
import styles from './index.module.less'
import { BACK_TYPE, TAB_TYPE } from '../../constants'

const Word = (props) => {
  const { text, isCurrent } = props

  const [wordInfo, setWordInfo] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isCurrent && text) {
      fetchWord(text)
    }
  }, [text, isCurrent])

  const fetchWord = async (word) => {
    try {
      setLoading(true)
      const res = await requestSearch({ word, type: BACK_TYPE[TAB_TYPE.Word] })
      const isChinese = hasChinese(text)
      let transformText = ''

      if (res.data) {
        transformText = isChinese ? res.data.english : res.data.chinese
      }

      setWordInfo({ ...res.data, transformText: transformText || 'No Data' })
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.word_wrapper}>
      <Spin spinning={loading}>
        <Card className={styles.word_text}>{ wordInfo.transformText || 'No data' }</Card>
      </Spin>

      <Notes wordId={wordInfo.id} />
    </div>
  )
}

export default Word
