import { Card } from 'antd'
import Notes from './components/Notes'
import styles from './index.module.less'

const Word = () => {
  return (
    <div className={styles.word_wrapper}>
      <Card className={styles.word_text}>Word</Card>
      <Notes />
    </div>
  )
}

export default Word
