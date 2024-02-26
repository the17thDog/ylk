import { useEffect, useState } from 'react'
import { List, Spin } from 'antd'
import { requestSearch } from '@/apis/dashboard'
import { requestWords } from '@/apis/wordManager'

import ArticleViewer from '@/components/ArticleViewer'
import { BACK_TYPE, TAB_TYPE } from '../../constants'

const Article = (props) => {
  const { text, isCurrent } = props

  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(false)
  const [viewerInfo, setViewerInfo] = useState({
    visible: false,
    title: '',
    data: {}
  })
  const [pagin, setPagin] = useState({
    pageNum: 1,
    pageSize: 5,
    total: 0,
    totalTimes: 0
  })

  useEffect(() => {
    if (isCurrent && text) {
      fetchArticles(text)
    }
  }, [text, isCurrent, pagin.pageNum])

  const fetchArticles = async () => {
    try {
      setLoading(true)

      const res = await requestSearch({
        ...pagin,
        word: text,
        type: BACK_TYPE[TAB_TYPE.Article]
      })

      const { list, total, totalTimes } = res.data

      setArticles(list)
      setPagin({
        ...pagin,
        total,
        totalTimes
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

  const handleClickArticle = async (row) => {
    const res = await requestSearch({
      word: text,
      type: 1
    })


    const { english } = res?.data ?? {}

    setViewerInfo({
      visible: true,
      title: row.title,
      data: {
        list: row.articles,
        markEnglish: english,
      }
    })
  }

  return (
    <Spin spinning={loading}>
      {pagin.total !== 0 &&
        <div style={{ marginBottom: 12, fontSize: 13 }}>总共出现{pagin.total}篇，总共出现{pagin.totalTimes}次</div>
      }

      <List
        itemLayout="vertical"
        dataSource={articles}
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
            style={{ cursor: 'pointer' }}
            onClick={() => handleClickArticle(item)}
          >
            <List.Item.Meta
              title={
                <a
                  href={item.href}
                >{item.title}</a>
              }
              description={item.times + ' 次'}
            />
          </List.Item>
        )}
      />

      {viewerInfo.visible &&
        <ArticleViewer
          open={viewerInfo.visible}
          title={viewerInfo.title}
          data={viewerInfo.data}
          text={text}
          onCancel={() => {
            setViewerInfo({ visible: false, title: '', data: {} })
          }}
        />
      }
    </Spin>
  )
}

export default Article
