import React, { useRef, useState } from "react"
import { Tabs, Input, message, Button } from "antd"
import { useNavigate } from "react-router-dom"

import Header from '@/components/Header'

import { TAB_LABEL, TAB_TYPE } from "./constants"
import Word from "./components/Word"
import Article from "./components/Article"
import Phrase from "./components/Phrase"

import styles from './index.module.less'

const DashBoard = () => {
  const [tabType, setTabType] = useState(TAB_TYPE.Word)
  const [currentText, setCurrentText] = useState('')
  const searchRef = useRef(null)
  const navigate = useNavigate()


  const handleSearch = async (word) => {
    if (word) {
      word = word.trim()
    }

    setCurrentText(word)

    if (!word) {
      message.warning('请输入查询文本')
    }
  }

  const handleClick = () => {
    navigate('/settings')
  }

  const handleSetTab = (tab) => {
    let text = searchRef.current?.input.value

    if (text) {
      text = text.trim()
    }

    setCurrentText(text)
    setTabType(tab)
  }

  const onSearch = (v) => {
    if (!v) return
    localStorage.setItem('url', v)

    message.success('设置成功')
  }

  return (
    <div className={styles.dashboard_wrapper}>
      <Header />

      <div style={{ position: 'absolute', bottom: 10, left: 10 }}>
        <Input.Search placeholder="input server host" onSearch={onSearch} style={{ width: 200 }} />

        <Button type='primary' style={{ marginLeft: 10 }} onClick={() => { location.reload() }}>刷新</Button>
      </div>


      <div className={styles.search_wrapper}>
        <Input.Search
          ref={searchRef}
          placeholder="请输入查询文本"
          size="large"
          enterButton
          style={{ width: 304 }}
          onSearch={handleSearch}
        />
      </div>
      <div className={styles.cont}>
        <Tabs
          activeKey={tabType}
          destroyInactiveTabPane
          items={[{
            key: TAB_TYPE.Word,
            label: TAB_LABEL.Word,
            children: <Word
              isCurrent={tabType === TAB_TYPE.Word}
              text={currentText}
            />,
            destroyInactiveTabPane: true
          },
          {
            key: TAB_TYPE.Phrase,
            label: TAB_LABEL.Phrase,
            children: <Phrase
              isCurrent={tabType === TAB_TYPE.Phrase}
              text={currentText}
            />,
            destroyInactiveTabPane: true
          },
          {
          key: TAB_TYPE.Article,
            label: TAB_LABEL.Article,
            children: <Article
              isCurrent={tabType === TAB_TYPE.Article}
              text={currentText}
            />,
            destroyInactiveTabPane: true
          }]}
          onChange={handleSetTab}
        />
      </div>
    </div>
  )
}

export default DashBoard
