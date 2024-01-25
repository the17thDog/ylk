import { useEffect, useState } from 'react'
import { Button, Card, List, Tag } from 'antd'
import { requestNotes, requestDeleteNote, requestHideOrShowNote } from '@/apis/dashboard'
import NoteEditor, { EditType } from '../NoteEditor'
import styles from './index.module.less'

 const NoteType = {
  Private: 'Private',
  Public: 'Public'
 }

const tabList = [
  {
    key: NoteType.Public,
    tab: '全部',
  },
  {
    key: NoteType.Private,
    tab: '我的',
  },
];

const Notes = (props) => {
  const { hasWord = false } = props
  const [tabKey, setTabKey] = useState(NoteType.Public)
  const [notes, setNotes] = useState([])
  const [editor, setEditor] = useState({
    visible: false,
    type: EditType.Create,
    data: ''
  })

  useEffect(() => {
    fetchNotes()
  }, [])

  const fetchNotes = async () => {
    const res = await requestNotes()

    setNotes(res.data)
  }

  const handleRecord = () => {
    setEditor({
      visible: true,
      type: EditType.Create,
      data: ''
    })
  }

  // const handleSetTabKey = (key) => {
  //   setTabKey(key)
  // }

  const handleOk = () => {
    setEditor({
      visible: false,
      type: EditType.Create,
      data: ''

    })
    fetchNotes()
  }

  const handleEdit = (row) => {
    setEditor({
      visible: true,
      type: EditType.Modify,
      data: row.content
    })
  }

  const handleCancel = () => {
    setEditor({ ...editor, visible: false })
  }

  const ExtraBtn = (
    <Button
      type='link'
      // disabled={!hasWord}
      onClick={handleRecord}
    >记笔记</Button>
  )

  const handleDelete = async (row) => {
    await requestDeleteNote(row.id)

    fetchNotes()
  }

  const handleHideOrShow = async (row) => {
    await requestHideOrShowNote({
      id: row.id,
      type: row.isShow ? 'hide' : 'show'
    })

    fetchNotes()
  }

  const renderActions = (row) => {
    if (!row.isPrivate) {
      return
    }

    const deleteBtn = <Button
      size='small'
      type='link'
      onClick={handleDelete}
    >删除</Button>

    const hideBtn = <Button
      size='small'
      type='link'
      onClick={handleHideOrShow}
    >隐藏</Button>

    const editBtn = <Button
      size='small'
      type='link'
      onClick={() => handleEdit(row)}
    >编辑</Button>

    const showBtn = <Button
      size='small'
      type='link'
      onClick={handleHideOrShow}
    >公开</Button>

    return [
      row.isShow ? hideBtn : showBtn,
      editBtn,
      deleteBtn
    ]
  }

  return (
    <div className={styles.note_wrapper}>
      <Card
        type="inner"
        className={styles.note_wrapper}
        title="笔记"
        extra={ExtraBtn}
        // tabList={tabList}
        // tabProps={{ size: 'small' }}
        // activeTabKey={tabKey}
        // onTabChange={handleSetTabKey}
      >
        <List
          itemLayout="vertical"
          dataSource={notes}
          renderItem={(item) => (
            <List.Item
              key={item.id}
              actions={renderActions(item)}
            >
              <List.Item.Meta
                description={item.isPrivate
                  ? <div className={styles.publish_info}>
                    <span style={{ marginRight: 12 }}>我自己</span>
                    {item.isShow ? <Tag color='success'>已发布</Tag> : <Tag color='default'>未发布</Tag>}
                  </div>
                  : item.title
                }
              />
              {item.content}
            </List.Item>
          )}
        />
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
