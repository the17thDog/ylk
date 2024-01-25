import { useEffect, useState } from 'react'
import { Modal } from 'antd'
import { markTextWithFlag } from '@/utils'
import { requestArticle } from '@/apis/dashboard'
import styles from './index.module.less'

const ArticleViewer = (props) => {
  const { title, searchText, id, ...modalProps } = props

  const [articleInfo, setArticleInfo] = useState({
    title: '',
    content: ''
  })

  useEffect(() => {
    const fn = async () => {
      const res = await requestArticle()

      setArticleInfo({
        ...articleInfo,
        content: markTextWithFlag(res.data, 'supply')
      })
    }

    fn()
  }, [props.open])

  const handleOk = () => {

  }

  return (
    <Modal
      {...modalProps}
      width={'100vw'}
      style={{
        top: 0,
      }}
      styles={{
        body: {
          height: "calc(100vh - 55px - 53px)"
        }
      }}
      title={title}
      footer={false}
      centered
      destroyOnClose
      onOk={handleOk}
    >
      <div
        className={styles.article_viewer}
        dangerouslySetInnerHTML={{ __html: articleInfo.content }}
      />
    </Modal>
  )
}

export default ArticleViewer
