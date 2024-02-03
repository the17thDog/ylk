import { useEffect, useState } from "react"
import { Table, Select, Form, Button, Tag, message } from "antd"
import { SearchOutlined, PlusCircleTwoTone } from '@ant-design/icons'
import { requestClasses, requestDeleteClass, requestDisableClass, requestEnableClass } from "@/apis/classManager"
import { filterEmptyField, formatTime, showConfirm } from '@/utils'

import ClassEditor, { EditType } from "./ClassEditor"

const Status = {
  Disabled: 0,
  Open: 1
}

const StatusLabel = {
  [Status.Disabled]: '禁用',
  [Status.Open]: '开启',
}

const ClassManager = () => {
  const [form] = Form.useForm()
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(false)
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

      const { data } = await requestClasses(filterEmptyField(params))

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

  const handleEnable = async (row) => {
    await requestEnableClass(row.id)

    message.success('启用成功')
    fetchList()
  }

  const handleDisabled = async (row) => {
    await requestDisableClass(row.id)

    message.success('禁用成功')
    fetchList()
  }

  const handleDelete = async (row) => {
    await showConfirm({ content: '该班级下所有账号也会被删除，确认要删除该班级吗？' })
    await requestDeleteClass(row.id)

    message.success('删除成功')
    fetchList()
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

  const columns = [
    {
      title: '班级',
      dataIndex: 'className',
      key: 'classNo',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: v => <Tag color={ v === Status.Disabled ? 'default' : 'success' }>{StatusLabel[v]}</Tag>
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
          { row.status === Status.Disabled
            ? <Button type="link" onClick={() => handleEnable(row)}>启用</Button>
            : <Button type="link" onClick={() => handleDisabled(row)}>禁用</Button>
          }
          <Button type="link" onClick={() => handleDelete(row)}>删除</Button>
        </>
      }
    }
  ]

  return (
    <div style={{ padding: 10 }}>
      <div style={{ marginBottom: 20 }}>
        <Form form={form} layout="inline">
          <Form.Item label="状态" name="status">
            <Select
              style={{ width: 180 }}
              placeholder="请选择"
              allowClear
              options={[
                { value: Status.Open, label: '启用' },
                { value: Status.Disabled, label: '禁用' },
              ]}
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

      <ClassEditor
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

export default ClassManager
