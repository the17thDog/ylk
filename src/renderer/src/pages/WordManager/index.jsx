import { useEffect, useState } from "react"
import { Table, Form, Button, Input } from "antd"
import { SearchOutlined, PlusCircleTwoTone } from '@ant-design/icons'
import { requestWords, requestDeleteWord } from "@/apis/wordManager"
import { filterEmptyField, showConfirm } from '@/utils'

import WordEditor, { EditType } from "./components/WordEditor"

const WordManager = () => {
  const [form] = Form.useForm()
  const [list, setList] = useState([])
  const [editor, setEditor] = useState({
    visible: false,
    type: EditType.Create,
    data: {}
  })
  const [pagin, setPagin] = useState({
    pageNo: 1,
    pageSize: 10,
    total: 0
  })

  useEffect(() => {
    fetchList()
  }, [pagin.pageNo])

  const fetchList = async () => {
    const filter = form.getFieldsValue()
    const params = { ...pagin, ...filter }

    const { data } = await requestWords(filterEmptyField(params))

    setList(data.list)
    setPagin({
      ...pagin,
      total: data.total
    })
  }

  const handleDelete = async (row) => {
    await showConfirm({ content: '确认删除该单词吗？' })
    await requestDeleteWord()

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
      pageNo: current
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

  const columns = [
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
      dataIndex: 'time',
      key: 'time',
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
  ]

  return (
    <div style={{ padding: 10 }}>
      <div style={{ marginBottom: 20 }}>
        <Form form={form} layout="inline">
          <Form.Item label="单词" name="english">
            <Input
              style={{ width: 180 }}
              allowClear
              placeholder="请输入单词"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" icon={<SearchOutlined />} onClick={fetchList}>搜索</Button>
          </Form.Item>
          <Form.Item>
            <Button icon={<PlusCircleTwoTone />} onClick={handleCreate}>添加</Button>
          </Form.Item>
        </Form>
      </div>

      <Table
        columns={columns}
        dataSource={list}
        pagination={{
          pageSize: pagin.pageSize,
          total: pagin.total,
          showSizeChanger: false
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
