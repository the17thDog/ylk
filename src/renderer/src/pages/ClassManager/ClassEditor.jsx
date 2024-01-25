import { useEffect } from "react"
import { Modal, Form, Input } from "antd"
import { requireRule } from "@/utils/rules"
import { requestCreateClass } from "@/apis/classManager"

export const EditType = {
  Create: 'create',
  Modify: 'modify'
}

/**
 * @returns {import("antd/es/form").Rule}
 */
export function classRule() {
  return {
    message: '请输入正确的班级，4个字以内',
    validator(_, val) {

      if (!val) {
        return Promise.resolve()
      }

      const pattern = /^(\w{1,4})(,\w{1,4})*$/
      const match = val.match(pattern)

      return match ? Promise.resolve() : Promise.reject()
    }
  }
}

const ClassEditor = (props) => {
  const { content, editType, ...modalProps } = props
  const { onOk, open } = modalProps

  const [form] = Form.useForm()

  const isModify = editType === EditType.Modify

  useEffect(() => {
    if (open) {
      if (isModify) {
        form.setFieldValue('content', content)
      }
    } else {
      form.setFieldsValue(['content'])
    }
  }, [open])

  const handleOk = async () => {
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
      cancelText="取消"
      keyboard={false}
      width={600}
      centered
      destroyOnClose
      onOk={handleOk}
    >
      <Form form={form}>
        <Form.Item
          name="class"
          label="班级"
          rules={[requireRule('班级不能为空'), classRule()]}
        >
          <Input.TextArea
            placeholder="请输入班级"
            rows={8}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default ClassEditor
