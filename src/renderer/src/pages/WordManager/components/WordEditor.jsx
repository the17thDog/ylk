import { useEffect } from "react"
import { Modal, Form, Input, Switch, Card } from "antd"
import { requireRule } from "@/utils/rules"
import { requestCreateClass } from "@/apis/classManager"

import styles from './index.module.less'

export const EditType = {
  Create: 'create',
  Modify: 'modify'
}

const formItemLayout = {
  labelCol: {
    sm: { span: 3 },
  },
}

const AccountEditor = (props) => {
  const { content, editType, ...modalProps } = props
  const { onOk, open } = modalProps

  const [form] = Form.useForm();

  const isModify = editType === EditType.Modify

  useEffect(() => {
    if (open) {
      if (isModify) {
        // form.setFieldValue('content', content)
      }
    } else {
      form.resetFields()
    }
  }, [open])

  const handleOk = async () => {
    console.log(' form.getFieldsValue():', form.getFieldsValue());

    await form.validateFields()
    await requestCreateClass({
      ...form.getFieldsValue()
    })

    onOk()
  }

  return (
    <Modal
      {...modalProps}
      title={isModify ? '编辑单词' : '添加单词'}
      okText="确认"
      forceRender
      cancelText="取消"
      maskClosable={false}
      width={580}
      centered
      destroyOnClose
      onOk={handleOk}
    >
      <Form
        form={form}
        {...formItemLayout}
      >
        <Card>
          <Form.Item
            name="english"
            label="英文"
            rules={[requireRule('英文不能为空')]}
          >
            <Input
              placeholder="请输入班级"
              style={{ width: 260 }}
              maxLength={6}
              showCount
            />
          </Form.Item>
          <Form.Item
            name="english"
            label="中文"
            rules={[requireRule('英文不能为空')]}
          >
            <Input
              placeholder="请输入班级"
              style={{ width: 260 }}
              maxLength={6}
              showCount
            />
          </Form.Item>
        </Card>
      </Form>
    </Modal>
  )
}

export default AccountEditor
