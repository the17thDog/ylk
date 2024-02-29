import { useEffect, useState } from "react"
import { Table, Select, Form, Button, Tag, Badge, Input, message, Upload} from "antd"
import { SearchOutlined, PlusCircleTwoTone, FolderAddTwoTone } from '@ant-design/icons'
import { requestAccounts, requestDeleteAccount, requestDisableAccount, requestEnableAccount, requestUploadAccounts } from "@/apis/accountManager"
import { filterEmptyField, formatTime, showConfirm } from '@/utils'

import AccountEditor, { EditType } from "./AccountEditor"
import { requestClasses } from "@/apis/classManager"

const Status = {
  Disabled: 0,
  Open: 1
}

const StatusLabel = {
  [Status.Disabled]: '禁用',
  [Status.Open]: '启用',
}

const AccountManager = () => {
  const [form] = Form.useForm()
  const [list, setList] = useState([])
  const [classList, setClassList] = useState([])
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
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

  useEffect(() => {
    const fn = async () => {
      try {
        const res = await requestClasses({ pageNum: 1, pageSize: 99 })

        setClassList(res.data.list)
      } catch (error) {
        console.error(error)
      }
    }

    fn()
  }, [])

  const fetchList = async () => {
    try {
      setLoading(true)

      const filter = form.getFieldsValue()
      const params = { ...pagin, ...filter }

      if (params.studentId === '') {
        delete params.studentId
      }

      const { data } = await requestAccounts(filterEmptyField(params))

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
    await requestEnableAccount(row.id)

    message.success('启用成功')

    fetchList()
  }

  const handleDisabled = async (row) => {
    await requestDisableAccount(row.id)

    message.success('禁用成功')

    fetchList()
  }

  const handleDelete = async (row) => {
    await showConfirm({ content: '确认删除该账号吗？' })
    await requestDeleteAccount([row.id])

    message.success('删除成功')

    fetchList()
  }

  const handleDeleteBatch = async () => {
    try {
      await showConfirm({ content: '确认删除选中的账号吗？' })
      setDeleteLoading(true)
      await requestDeleteAccount(selectedRowKeys)

      message.success('删除成功')
      setSelectedRowKeys([])
      fetchList()
    } catch (error) {
      console.error(error)
    } finally {
      setDeleteLoading(false)
    }
  }

  const handleEdit = (row) => {
    setEditor({
      visible: true,
      type: EditType.Modify,
      data: { ...row }
    })
  }

  const handleChange = ({ current }) => {
    setSelectedRowKeys([])

    setPagin({
      ...pagin,
      pageNum: current
    })
  }

  const handleUpload = async (data) => {
    const formData = new FormData()
    formData.append('file', data.file)

    await requestUploadAccounts(formData)

    message.success('上传成功')
    fetchList()
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
      title: '昵称',
      dataIndex: 'nickName',
      key: 'nickName',
      render: v => v || '-'
    },
    {
      title: '班级',
      dataIndex: 'className',
      key: 'className',
    },
    {
      title: '账号',
      dataIndex: 'account',
      key: 'account',
    },
    {
      title: '密码',
      dataIndex: 'password',
      key: 'password',
    },
    {
      title: '验证码',
      dataIndex: 'code',
      key: 'code',
      render: v => v || '-'
    },
    {
      title: '后台权限',
      dataIndex: 'backendPermission',
      key: 'backendPermission',
      render: (v) => <Tag color={v ? 'success' : 'default'}>{v ? '开启' : '关闭'}</Tag>,
    },
    {
      title: '笔记权限',
      dataIndex: 'notePermission',
      key: 'notePermission',
      render: (v) => <Tag color={v ? 'success' : 'default'}>{v ? '开启' : '关闭'}</Tag>,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: v => <Badge status={v === Status.Disabled ? 'error' : 'success'} text={StatusLabel[v]} />
    },
    {
      title: '添加时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render: v => formatTime(v)
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
          <Button type="link" onClick={() => handleEdit(row)}>编辑</Button>
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
          <Form.Item label="状态" name="status">
            <Select
              style={{ width: 140 }}
              allowClear
              placeholder="请选择"
              options={[
                { value: Status.Open, label: '启用' },
                { value: Status.Disabled, label: '禁用' },
              ]}
            />
          </Form.Item>

          <Form.Item label="班级" name="classId">
            <Select
              style={{ width: 140 }}
              allowClear
              placeholder="请选择"
              options={classList.map(x => ({ value: x.id, label: x.className  }))}
            />
          </Form.Item>

          <Form.Item label="账号" name="studentId">
            <Input
              style={{ width: 140 }}
              allowClear
              placeholder="请输入账号"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" icon={<SearchOutlined />} onClick={fetchList}>搜索</Button>
          </Form.Item>
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
        loading={loading}
        rowKey="id"
        pagination={{
          pageSize: pagin.pageSize,
          total: pagin.total,
          showSizeChanger: false,
          showTotal: (total) => `总共 ${total} 条`
        }}
        bordered
        onChange={handleChange}
      />

      <AccountEditor
        open={editor.visible}
        editType={editor.type}
        classList={classList}
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

export default AccountManager
