import { List } from 'antd'
import { useEffect, useState } from 'react'

import { requestPhraseList } from '@/apis/dashboard'

const Phrase = () => {
  const [phrases, setPhrases] = useState([])
  const [pagin, setPagin] = useState({
    pageNo: 1,
    pageSize: 5,
    total: 0
  })

  useEffect(() => {
    fetchPhrases()
  }, [])

  const fetchPhrases = async () => {
    const res = await requestPhraseList()

    const { list, total } = res.data

    setPhrases(list)
    setPagin({
      ...pagin,
      total
    })
  }

  const handlePageChange = (pageNo) => {
    setPagin({
      ...pagin,
      pageNo
    })

    fetchPhrases({
      pageNo,
      pageSize: pagin.pageSize
    })
  }

  return (
    <div>
      <List
        itemLayout="vertical"
        dataSource={phrases}
        bordered
        pagination={{
          onChange: handlePageChange,
          pageSize: pagin.pageSize,
          showSizeChanger: false,
          total: pagin.total,
        }}
        renderItem={(item) => (
          <List.Item
            key={item.id}
          >
            {item.content}
            <List.Item.Meta
              description={item.description}
            />
          </List.Item>
        )}
      />
    </div>
  )
}

export default Phrase
