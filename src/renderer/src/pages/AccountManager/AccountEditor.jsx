import { useEffect } from "react"
import { Modal, Form, Input, Switch } from "antd"
import { requireRule } from "@/utils/rules"
import { requestCreateClass } from "@/apis/classManager"

export const EditType = {
  Create: 'create',
  Modify: 'modify'
}

const formItemLayout = {
  labelCol: {
    sm: { span: 4 },
  },
}

/**
 * @returns {import("antd/es/form").Rule}
 */
export function classRule() {
  return {
    message: '请输入正确的班级，6个字以内',
    validator(_, val) {

      if (!val) {
        return Promise.resolve()
      }

      const pattern = /^(\w{1,6})(,\w{1,6})*$/
      const match = val.match(pattern)

      return match ? Promise.resolve() : Promise.reject()
    }
  }
}

/**
 * @returns {import("antd/es/form").Rule}
 */
export function accountRule() {
  return {
    message: '请输入正确的账号，11个字符以内',
    validator(_, val) {

      if (!val) {
        return Promise.resolve()
      }

      const pattern = /^(\w{1,11})(,\w{1,11})*$/
      const match = val.match(pattern)

      return match ? Promise.resolve() : Promise.reject()
    }
  }
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
      title={isModify ? '编辑班级' : '创建班级'}
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
        <Form.Item
          name="class"
          label="班级"
          rules={[requireRule('班级不能为空'), classRule()]}
        >
          <Input
            placeholder="请输入班级"
            style={{ width: 360 }}
            maxLength={6}
            showCount
          />
        </Form.Item>

        <Form.Item
          name="account"
          label="账号"
          rules={[requireRule('账号不能为空'), accountRule()]}
        >
          <Input.TextArea
            placeholder="请输入账号，多个账号用英文逗号隔开"
            style={{ width: 360 }}
            rows={6}
          />
        </Form.Item>

        <Form.Item
          name="backAuth"
          label="后台权限"
        >
          <Switch
            checkedChildren="开"
            unCheckedChildren="关"
          />
        </Form.Item>

        <Form.Item
          name="noteAuth"
          label="笔记权限"
        >
          <Switch
            checkedChildren="开"
            unCheckedChildren="关"
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default AccountEditor
