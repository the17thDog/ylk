import { useRef, useState } from "react"
import { Tabs, Button } from "antd"
import { useNavigate } from "react-router-dom"
import { TAB_LABEL, TAB_TYPE } from "./constants"
import SearchBar from "./components/SearchBar"
import Word from "./components/Word"
import Article from "./components/Article"
import Phrase from "./components/Phrase"

import styles from './index.module.less'

const DashBoard = () => {
  const [tabType, setTabType] = useState(TAB_TYPE.Word)
  const [searchInfo, setSearchInfo] = useState({})
  const searchRef = useRef()
  const navigate = useNavigate()

  const handleSearch = () => {

  }

  const handleClick = () => {
    navigate('/settings/class')
  }

  return (
    <div className={styles.dashboard_wrapper}>
      <Button
        type="link"
        style={{ position: 'absolute', top: 0 }}
        onClick={handleClick}
      >to manager</Button>

      <div className={styles.search_wrapper}>
        <SearchBar
          ref={searchRef}
          onSearch={handleSearch}
        />
      </div>
      <div className={styles.cont}>
        <Tabs
          activeKey={tabType}
          items={[{
            key: TAB_TYPE.Word,
            label: TAB_LABEL.Word,
            children: <Word />
          },
          {
            key: TAB_TYPE.Phrase,
            label: TAB_LABEL.Phrase,
            children: <Phrase />
          },
          {
            key: TAB_TYPE.Article,
            label: TAB_LABEL.Article,
            children: <Article />
          }]}
          onChange={setTabType}
        />
      </div>
    </div>
  )
}

export default DashBoard
