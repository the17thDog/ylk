import { useEffect, useState } from 'react'
import { List } from 'antd'
import { requestArticles } from '@/apis/dashboard'

import ArticleViewer from '@/components/ArticleViewer'

const Article = () => {
  const [articles, setArticles] = useState([])
  const [viewerInfo, setViewerInfo] = useState({
    visible: false,
    title: '',
  })
  const [pagin, setPagin] = useState({
    pageNum: 1,
    pageSize: 5,
    total: 0
  })

  useEffect(() => {
    fetchArticles()
  }, [])

  const fetchArticles = async () => {
    const res = await requestArticles()

    const { list, total } = res.data

    setArticles(list)
    setPagin({
      ...pagin,
      total
    })
  }

  const handlePageChange = (pageNum) => {
    setPagin({
      ...pagin,
      pageNum
    })

    fetchArticles({
      pageNum,
      pageSize: pagin.pageSize
    })
  }

  const handleClickArticle = (row) => {
  console.log('row :', row);
    setViewerInfo({
      visible: true,
      title: row.title
    })
  }

  return (
    <div>
      <List
        itemLayout="vertical"
        dataSource={articles}
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
            <List.Item.Meta
              title={
                <a
                  href={item.href}
                  onClick={() => handleClickArticle(item)}
                >{item.title}</a>
              }
              description={'文章中出现 ' + item.times + ' 次'}
            />
          </List.Item>
        )}
      />

      <ArticleViewer
        open={viewerInfo.visible}
        title={viewerInfo.title}
        onCancel={() => {
          setViewerInfo({ visible: false, title: '' })
        }}
      />
    </div>
  )
}

export default Article
