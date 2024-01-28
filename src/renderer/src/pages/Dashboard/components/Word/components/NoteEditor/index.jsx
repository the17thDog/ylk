import { useEffect } from "react"
import { Modal, Form, Input } from "antd"
import { requireRule } from "@/utils/rules"

const { TextArea } = Input

export const EditType = {
  Create: 'create',
  Modify: 'modify'
}

const NoteEditor = (props) => {
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
      form.resetFields()
    }
  }, [open])

  const handleOk = async () => {
    await form.validateFields()

    onOk()
  }

  return (
    <Modal
      {...modalProps}
      title={isModify ? '编辑笔记' : '创建笔记'}
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
          name="content"
          rules={[requireRule('笔记不能为空')]}
        >
          <TextArea
            placeholder="请输入笔记"
            rows={8}
            showCount
            maxLength={300}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default NoteEditor
