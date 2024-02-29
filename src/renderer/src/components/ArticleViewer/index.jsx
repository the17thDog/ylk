import { useEffect, useState } from 'react'
import { Modal } from 'antd'
import { getMarkedText } from '@/utils'
import { requestArticle } from '@/apis/dashboard'
import styles from './index.module.less'

const ArticleViewer = (props) => {
  const { title, data, text, searchText, id, ...modalProps } = props
  const { list, transformText } = data

  const [articleInfo, setArticleInfo] = useState({
    title: '',
    content: ''
  })

  useEffect(() => {
    let article = ''

    list?.forEach(({ chinese, english }) => {
      article += `<p style="text-indent: 32px">${english}<p>`
      article += '<br>'
      article += `<p style="text-indent: 32px">${chinese}<p>`
      article += '<br>'
    })

    setArticleInfo({
      ...articleInfo,
      content: getMarkedText(article, [transformText, text].filter(x => x))
    })
  }, [list, text, transformText, props.open])

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
