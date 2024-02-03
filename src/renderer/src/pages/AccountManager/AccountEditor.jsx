import { useEffect } from "react"
import { isNil, pick } from "lodash"
import { Modal, Form, Input, Switch, Select, message } from "antd"
import { requireRule } from "@/utils/rules"
import { requestCreateAccount, requestModifyAccount } from "@/apis/accountManager"

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
  const { data, editType, classList, ...modalProps } = props
  const { onOk, open } = modalProps

  const [form] = Form.useForm();

  const isModify = editType === EditType.Modify

  useEffect(() => {
    if (open) {
      if (isModify) {
        const fields = pick(data, [
          'notePermission',
          'backendPermission',
          'studentId',
          'classId'
        ])

        form.setFieldsValue(fields)
      }
    } else {
      form.resetFields()
    }
  }, [open])

  const handleOk = async () => {
    await form.validateFields()

    const api = isModify ? requestModifyAccount : requestCreateAccount
    let params = { ...form.getFieldsValue(), id: data.id }

    Object.keys(params).forEach(k => {
      if (isNil(params[k])) {
        params[k] = false
      }
    })

    if (!isModify) {
      delete params.id
    }

    await api(params)

    message.success(isModify ? '编辑成功' : '创建成功')

    onOk()
  }

  return (
    <Modal
      {...modalProps}
      title={isModify ? '编辑账号' : '创建账号'}
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
        <Form.Item label="班级" name="classId" rules={[requireRule('班级不能为空')]}>
          <Select
            style={{ width: 180 }}
            allowClear
            placeholder="请选择"
            options={classList.map(x => ({ value: x.id, label: x.className  }))}
          />
        </Form.Item>

        <Form.Item
          name="studentId"
          label="账号"
          rules={[requireRule('账号不能为空'), accountRule()]}
        >
          <Input.TextArea
            disabled={isModify}
            placeholder="请输入账号，多个账号用英文逗号隔开"
            style={{ width: 360 }}
            rows={6}
          />
        </Form.Item>

        <Form.Item
          name="backendPermission"
          label="后台权限"
        >
          <Switch
            checkedChildren="开"
            unCheckedChildren="关"
          />
        </Form.Item>

        <Form.Item
          name="notePermission"
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
