import { useEffect } from "react"
import { Modal, Form, Input, message } from "antd"
import { requireRule } from "@/utils/rules"
import { requestAddNote, requestModifyNote } from '@/apis/note'

const { TextArea } = Input

export const EditType = {
  Create: 'create',
  Modify: 'modify'
}

const NoteEditor = (props) => {
  const { data, editType, ...modalProps } = props
  const { content, wordId, noteId } = data
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
    const field = form.getFieldsValue()

    const params = {
      ...field,
      associationId: wordId,
      id: noteId
    }

    if (isModify) {
      await requestModifyNote(params)
    } else {
      delete params.id

      await requestAddNote(params)
    }

    message.success(isModify ? '编辑成功' : '添加成功')

    onOk()
  }

  return (
    <Modal
      {...modalProps}
      title={isModify ? '编辑笔记' : '创建笔记'}
      okText="确认"
      cancelText="取消"
      forceRender
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
            maxLength={1000}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default NoteEditor
