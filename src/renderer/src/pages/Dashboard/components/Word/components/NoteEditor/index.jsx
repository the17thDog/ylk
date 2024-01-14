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
            rows={6}
            maxLength={200}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default NoteEditor
