import { useState } from 'react'
import { Button, Card } from 'antd'
import NoteEditor, { EditType } from '../NoteEditor'
import styles from './index.module.less'

const Notes = (props) => {
  const { hasWord = false } = props
  const [editor, setEditor] = useState({
    visible: false,
    type: EditType.Create,
    data: ''
  })

  const handleRecord = () => {
    setEditor({
      visible: true,
      type: EditType.Create,
      data: ''
    })
  }

  const handleOk = () => {}

  const handleCancel = () => {
    setEditor({ ...editor, visible: false })
  }

  return (
    <div className={styles.note_wrapper}>
      <Card
        type="inner"
        className={styles.note_wrapper}
        title="笔记"
        extra={
          <Button
            type='link'
            // disabled={!hasWord}
            onClick={handleRecord}
          >记笔记</Button>
        }
      >
        Inner Card content
      </Card>

      <NoteEditor
        open={editor.visible}
        editType={editor.type}
        content={editor.data}
        top="30vh"
        onOk={handleOk}
        onCancel={handleCancel}
      />
    </div>
  )
}

export default Notes
