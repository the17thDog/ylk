import { List, Spin } from 'antd'
import { useEffect, useState } from 'react'

import { requestSearch } from '@/apis/dashboard'
import { getMarkedText } from '@/utils'
import { BACK_TYPE, TAB_TYPE } from '../../constants'

const Phrase = (props) => {
  const { text, isCurrent } = props

  const [phrases, setPhrases] = useState([])
  const [loading, setLoading] = useState(false)
  const [pagin, setPagin] = useState({
    pageNum: 1,
    pageSize: 5,
    total: 0
  })

  useEffect(() => {
    if (isCurrent && text) {
      fetchPhrases(text)
    }
  }, [text, isCurrent, pagin.pageNum])

  const fetchPhrases = async () => {
    try {
      setLoading(true)

      const res = await requestSearch({
        ...pagin,
        word: text,
        type: BACK_TYPE[TAB_TYPE.Phrase]
      })

      const { list, total } = res.data

      setPhrases(list)
      setPagin({
        ...pagin,
        total
      })
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }

  }

  const handlePageChange = (pageNum) => {
    setPagin({
      ...pagin,
      pageNum
    })
  }

  return (
    <Spin spinning={loading}>
      <List
        itemLayout="vertical"
        dataSource={phrases}
        bordered
        pagination={{
          onChange: handlePageChange,
          pageSize: pagin.pageSize,
          showSizeChanger: false,
          total: pagin.total,
          showTotal: (total) => `总共 ${total} 条`
        }}
        renderItem={(item) => (
          <List.Item
            key={item.id}
          >
            <div dangerouslySetInnerHTML={{ __html: getMarkedText(item.english, [text]) }} />
            <List.Item.Meta
              description={
                <div dangerouslySetInnerHTML={{ __html: getMarkedText(item.chinese, [text]) }} />
              }
            />
          </List.Item>
        )}
      />
    </Spin>
  )
}

export default Phrase
