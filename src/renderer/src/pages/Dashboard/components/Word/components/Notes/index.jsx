import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Button, Card, List, Spin, Tag, message } from 'antd'
import { requestNoteByWordId, requestDeleteNote, requestModifyNote } from '@/apis/note'
import NoteEditor, { EditType } from '../NoteEditor'
import styles from './index.module.less'

const PUBLISH_STATUS = {
  PUBLIC: 1,
  UN_PUBLIC: 2
}

const Notes = (props) => {
  const { wordId } = props
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(false)
  const [editor, setEditor] = useState({
    visible: false,
    type: EditType.Create,
    data: {}
  })

  const user = useSelector((state) => state.user?.userInfo);


  useEffect(() => {
    if (wordId) {
      fetchNotes()
    } else {
      setNotes([])
    }
  }, [wordId])

  const fetchNotes = async () => {
    try {
      setLoading(true)

      const res = await requestNoteByWordId(wordId)
      let { myNotes, otherNotes } = res.data

      myNotes = myNotes.map(x => ({
        ...x,
        isPrivate: true,
        isShow: x.status === PUBLISH_STATUS.PUBLIC
      }))
      otherNotes = otherNotes.map(x => ({ ...x, isPrivate: false }))

      let notes = myNotes.concat(otherNotes ?? [])

      setNotes(notes)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleRecord = () => {
    setEditor({
      visible: true,
      type: EditType.Create,
      data: {
        content: '',
        wordId
      }
    })
  }

  const handleOk = () => {
    setEditor({
      visible: false,
      type: EditType.Create,
      data: {}

    })
    fetchNotes()
  }

  const handleEdit = (row) => {
    setEditor({
      visible: true,
      type: EditType.Modify,
      data: {
        content: row.content,
        wordId,
        noteId: row.id
      }
    })
  }

  const handleCancel = () => {
    setEditor({ ...editor, visible: false })
  }

  const ExtraBtn = (
    user.notePermission &&
      <Button
        type='link'
        disabled={!wordId}
        onClick={handleRecord}
      >记笔记</Button>
  )

  const handleDelete = async (row) => {
    await requestDeleteNote({
      id: row.id,
      associationId: wordId
    })

    message.success('删除成功')

    fetchNotes()
  }

  const handleHideOrShow = async (row) => {
    await requestModifyNote({
      id: row.id,
      associationId: wordId,
      status: row.isShow ? PUBLISH_STATUS.UN_PUBLIC : PUBLISH_STATUS.PUBLIC
    })

    message.success(row.isShow ? '隐藏成功' : '公开成功')

    fetchNotes()
  }

  const renderActions = (row) => {
    if (!row.isPrivate) {
      return
    }

    const deleteBtn = <Button
      size='small'
      type='link'
      onClick={() => handleDelete(row)}
    >删除</Button>

    const hideBtn = <Button
      size='small'
      type='link'
      onClick={() => handleHideOrShow(row)}
    >隐藏</Button>

    const editBtn = <Button
      size='small'
      type='link'
      onClick={() => handleEdit(row)}
    >编辑</Button>

    const showBtn = <Button
      size='small'
      type='link'
      onClick={() => handleHideOrShow(row)}
    >公开</Button>

    return [
      row.isShow ? hideBtn : showBtn,
      editBtn,
      deleteBtn
    ]
  }

  return (
    <Spin
      spinning={loading}
      className={styles.note_wrapper}
    >
      <Card
        type="inner"
        className={styles.note_wrapper}
        title="笔记"
        extra={ExtraBtn}
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
                      <span style={{ marginRight: 12 }}>{item.nickname}</span>
                      {item.isShow ? <Tag color='success'>已发布</Tag> : <Tag color='default'>未发布</Tag>}
                    </div>
                  : item.nickname
                }
              />
              <div className={styles.content_text}>{item.content}</div>
              <div className={styles.createTime}>{item.createTime}</div>
            </List.Item>
          )}
        />
      </Card>

      <NoteEditor
        open={editor.visible}
        editType={editor.type}
        data={editor.data}
        top="30vh"
        onOk={handleOk}
        onCancel={handleCancel}
      />
    </Spin>
  )
}

export default Notes
