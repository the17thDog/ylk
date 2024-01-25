import { useEffect, useState } from "react"
import { Table, Select, Form, Button, Tag } from "antd"
import { SearchOutlined, PlusCircleTwoTone } from '@ant-design/icons'
import { requestClasses } from "@/apis/classManager"
import { filterEmptyField } from '@/utils'

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
  const [pagin, setPagin] = useState({
    pageNo: 1,
    pageSize: 10,
    total: 0
  })

  useEffect(() => {
    fetchList()
  }, [pagin.pageNo])

  const fetchList = async (filter) => {
    const params = { ...pagin, ...filter }

    const { data } = await requestClasses(filterEmptyField(params))

    setList(data.list)
    setPagin({
      ...pagin,
      total: data.total
    })
  }

  const handleSearch = async () => {
    const params = form.getFieldsValue()

    fetchList(params)
  }

  const handleOpen = (row) => {
    console.log('row :', row);
  }

  const handleDisabled = (row) => {
    console.log('row :', row);
  }

  const handleDelete = (row) => {
    console.log('row :', row);
  }

  const handleChange = ({ current }) => {
    setPagin({
      ...pagin,
      pageNo: current
    })
  }

  const columns = [
    {
      title: '班级',
      dataIndex: 'classNo',
      key: 'classNo',
    },
    {
      title: '账号',
      dataIndex: 'account',
      key: 'account',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: v => <Tag color={ v === Status.Disabled ? 'default' : 'success' }>{StatusLabel[v]}</Tag>
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
          { row.status === Status.Disabled
            ? <Button type="link" onClick={() => handleOpen(row)}>启用</Button>
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
              style={{ width: 200 }}
              placeholder="请选择"
              options={[
                { value: Status.Open, label: '启用' },
                { value: Status.Disabled, label: '禁用' },
              ]}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" icon={<SearchOutlined />} onClick={handleSearch}>搜索</Button>
          </Form.Item>
          <Form.Item>
            <Button icon={<PlusCircleTwoTone />}>添加</Button>
          </Form.Item>
        </Form>
      </div>

      <Table
        columns={columns}
        dataSource={list}
        pagination={{
          pageSize: pagin.pageSize,
          total: pagin.total
        }}
        bordered
        onChange={handleChange}
      />
    </div>
  )
}

export default ClassManager
