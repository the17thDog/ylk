import { useEffect, useState } from "react"
import { Table, Form, Button, Upload, message } from "antd"
import { SearchOutlined, PlusCircleTwoTone, FolderAddTwoTone } from '@ant-design/icons'
import { requestPhrases, requestDeletePhrase, requestUploadPhrase } from "@/apis/phraseManager"
import { filterEmptyField, formatTime, showConfirm } from '@/utils'

import PhraseEditor, { EditType } from "./components/PhraseEditor"
import PhraseViewer from './components/PhraseViewer'

const PhraseManager = () => {
  const [form] = Form.useForm()
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [editor, setEditor] = useState({
    visible: false,
    type: EditType.Create,
    data: {}
  })
  const [viewer, setViewer] = useState({
    visible: false,
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

      const { data } = await requestPhrases(filterEmptyField(params))

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

  const handleDeleteBatch = async () => {
    try {
      await showConfirm({ content: '确认删除选中的短语吗？' })
      setDeleteLoading(true)
      await requestDeletePhrase(selectedRowKeys)

      fetchList()
      message.success('删除成功')
      setSelectedRowKeys([])
    } catch (error) {
      console.error(error)
    } finally {
      setDeleteLoading(false)
    }
  }

  const handleDelete = async (row) => {
    await showConfirm({ content: '确认删除该短语吗？' })
    await requestDeletePhrase([row.id])

    fetchList()
    message.success('删除成功')
  }

  const handleView = (row) => {
    setViewer({
      visible: true,
      data: row
    })
  }

  const handleChange = ({ current }) => {
    setSelectedRowKeys([])

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

  const handleUpload = async (data) => {
    const formData = new FormData()
    formData.append('file', data.file)

    await requestUploadPhrase(formData)

    message.success('上传成功')
    fetchList()
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
      dataIndex: 'createTime',
      key: 'createTime',
      render: (_, row) => formatTime(row.createTime)
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render(_, row) {
        return <>
          <Button type="link" onClick={() => handleView(row)}>查看</Button>
          <Button type="link" onClick={() => handleDelete(row)}>删除</Button>
        </>
      }
    }
  ]

  const rowSelection = {
    selectedRowKeys,
    onChange: setSelectedRowKeys,
  }
  const hasSelected = selectedRowKeys.length > 0


  return (
    <div style={{ padding: 10 }}>
      <div style={{ marginBottom: 20 }}>
        <Form form={form} layout="inline">
          {/* <Form.Item label="短语" name="english">
            <Input
              style={{ width: 180 }}
              allowClear
              placeholder="请输入短语"
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

      <div style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          danger
          onClick={handleDeleteBatch}
          disabled={!hasSelected}
          loading={deleteLoading}
        >
          删除
        </Button>
        <span style={{ marginLeft: 8 }}>
          {hasSelected ? `已选择 ${selectedRowKeys.length} 列` : ''}
        </span>
      </div>

      <Table
        columns={columns}
        rowSelection={rowSelection}
        dataSource={list}
        rowKey="id"
        loading={loading}
        pagination={{
          pageSize: pagin.pageSize,
          total: pagin.total,
          showSizeChanger: false,
          showTotal: (total) => `总共 ${total} 条`
        }}
        bordered
        onChange={handleChange}
      />

      <PhraseEditor
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

      <PhraseViewer
        open={viewer.visible}
        data={viewer.data}
        top="30vh"
        onCancel={() => setViewer({
          visible: false,
          data: {}
        })}

      />
    </div>
  )
}

export default PhraseManager
