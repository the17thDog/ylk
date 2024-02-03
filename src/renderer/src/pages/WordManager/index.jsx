import { useEffect, useState } from "react"
import { Table, Form, Button, Upload, message } from "antd"
import { SearchOutlined, PlusCircleTwoTone, FolderAddTwoTone } from '@ant-design/icons'
import { requestWords, requestDeleteWord, requestUploadWord } from "@/apis/wordManager"
import { filterEmptyField, formatTime, showConfirm } from '@/utils'

import WordEditor, { EditType } from "./components/WordEditor"

const WordManager = () => {
  const [form] = Form.useForm()
  const [loading, setLoading] = useState(false)
  const [list, setList] = useState([])
  const [editor, setEditor] = useState({
    visible: false,
    type: EditType.Create,
    data: {}
  })
  const [pagin, setPagin] = useState({
    pageNum: 1,
    pageSize: 10,
    total: 0
  })

  useEffect(() => {
    fetchList()
  }, [pagin.pageNum])

  const fetchList = async () => {
    try {
      setLoading(true)

      const filter = form.getFieldsValue()
      const params = { ...pagin, ...filter }

      const { data } = await requestWords(filterEmptyField(params))

      setList(data.list)
      setPagin({
        ...pagin,
        total: data.total
      })
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpload = async (data) => {
    const formData = new FormData()
    formData.append('file', data.file)

    await requestUploadWord(formData)

    message.success('上传成功')
    fetchList()
  }

  const handleDelete = async (row) => {
    await showConfirm({ content: '确认删除该单词吗？' })
    await requestDeleteWord(row.id)

    message.success('删除成功')
    fetchList()
  }

  const handleEdit = (row) => {
    setEditor({
      visible: true,
      type: EditType.Modify,
      data: {
        content: row.content
      }
    })
  }

  const handleChange = ({ current }) => {
    setPagin({
      ...pagin,
      pageNum: current
    })
  }

  const handleClose = () => {
    setEditor({
      ...editor,
      visible: false,
    })
  }

  const handleCreate = () => {
    setEditor({
      visible: true,
      type: EditType.Create,
      data: {}
    })
  }

  return (
    <div style={{ padding: 10 }}>
      <div style={{ marginBottom: 20 }}>
        <Form form={form} layout="inline">
          {/* <Form.Item label="单词" name="word">
            <Input
              style={{ width: 180 }}
              allowClear
              placeholder="请输入单词"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" icon={<SearchOutlined />} onClick={fetchList}>搜索</Button>
          </Form.Item> */}
          <Form.Item>
            <Button icon={<PlusCircleTwoTone />} onClick={handleCreate}>添加</Button>
          </Form.Item>
          <Form.Item>
            <Upload
              showUploadList={false}
              maxCount={1}
              customRequest={handleUpload}
            >
              <Button icon={<FolderAddTwoTone />}>上传</Button>
            </Upload>
          </Form.Item>
        </Form>
      </div>

      <Table
        rowKey="id"
        columns={[
          {
            title: '英文',
            dataIndex: 'english',
            key: 'english',
          },
          {
            title: '中文',
            dataIndex: 'chinese',
            key: 'chinese',
          },
          {
            title: '添加时间',
            dataIndex: 'createTime',
            key: 'createTime',
            render: (_, row) =>  formatTime(row.createTime)
          },
          {
            title: '操作',
            dataIndex: 'action',
            key: 'action',
            render(_, row) {
              return <>
                {/* <Button type="link" onClick={() => handleEdit(row)}>编辑</Button> */}
                <Button type="link" onClick={() => handleDelete(row)}>删除</Button>
              </>
            }
          }
        ]}
        loading={loading}
        dataSource={list}
        pagination={{
          pageSize: pagin.pageSize,
          total: pagin.total,
          showSizeChanger: false,
          showTotal: (total) => `总共 ${total} 条`
        }}
        bordered
        onChange={handleChange}
      />

      <WordEditor
        open={editor.visible}
        editType={editor.type}
        data={editor.data}
        top="30vh"
        onOk={() => {
          fetchList()
          handleClose()
        }}
        onCancel={handleClose}
      />
    </div>
  )
}

export default WordManager
