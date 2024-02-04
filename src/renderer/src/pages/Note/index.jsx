import { useEffect, useState } from "react"
import { Input, Form, Button, List, message, Breadcrumb } from "antd"
import { useNavigate } from "react-router-dom"
import { pick } from "lodash"
import { SearchOutlined, DeleteOutlined } from '@ant-design/icons'
import { requestDeleteNote, requestNotes } from "@/apis/note"
import { filterEmptyField, formatTime, showConfirm } from '@/utils'
import Header from "@/components/Header"

import styles from './index.module.less'

const AccountManager = () => {
  const [form] = Form.useForm()
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(false)
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

      const { data } = await requestNotes(filterEmptyField(params))

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


  const handleDelete = async (row) => {
    await showConfirm({ content: '确认删除该账号吗？' })
    await requestDeleteNote(pick(row, ['id', 'associationId']))

    message.success('删除成功')

    fetchList()
  }

  const handlePageChange = ({ current }) => {
    setPagin({
      ...pagin,
      pageNum: current
    })
  }

  return (
    <div className={styles.note_wrapper}>
      <Header useBack title="我的笔记" />

      <div style={{ marginBottom: 20 }}>
        <Form form={form} layout="inline">
          <Form.Item label="短语" name="word">
            <Input
              style={{ width: 240 }}
              allowClear
              placeholder="请输入笔记内容"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" icon={<SearchOutlined />} onClick={fetchList}>搜索</Button>
          </Form.Item>
        </Form>
      </div>

      <List
        itemLayout="horizontal"
        dataSource={list}
        loading={loading}
        bordered
        pagination={{
          onChange: handlePageChange,
          pageSize: pagin.pageSize,
          showSizeChanger: false,
          total: pagin.total,
          showTotal: (total) => `总共 ${total} 条`
        }}
        renderItem={(item) => (
          <List.Item
            key={item.id}
            actions={[
              <Button
                size="small"
                type="link"
                onClick={() => handleDelete(item)}
              ><DeleteOutlined />删除</Button>]}
          >
            <List.Item.Meta
              title={
                <div className={styles.title_wrapper}>
                  <span>{item.english + ' ' + item.chinese}</span>
                  <div className={styles.time}>{formatTime(item.createTime)}</div>
                </div>
              }
              description={item.content}
            />
          </List.Item>
        )}
      />
    </div>
  )
}

export default AccountManager
