import { useEffect } from "react"
import { Modal, Form, Input, message } from "antd"
import { requireRule } from "@/utils/rules"
import { requestModifyNickname } from '@/apis/users'

const NicknameEditor = (props) => {
  const { user, ...modalProps } = props
  const { onOk, open } = modalProps

  const [form] = Form.useForm()

  useEffect(() => {
    if (open) {
      form.setFieldValue('nickName', user.nickName)
    } else {
      form.resetFields()
    }
  }, [open])

  const handleOk = async () => {
    await form.validateFields()
    const field = form.getFieldsValue()


    await requestModifyNickname({ ...field })

    message.success('编辑成功')

    onOk()
  }

  return (
    <Modal
      {...modalProps}
      title="编辑昵称"
      okText="确认"
      cancelText="取消"
      keyboard={false}
      forceRender
      width={400}
      centered
      destroyOnClose
      onOk={handleOk}
    >
      <Form form={form}>
        <Form.Item
          name="nickName"
          rules={[requireRule('昵称不能为空')]}
        >
          <Input
            placeholder="请输入笔记"
            showCount
            maxLength={10}
          />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default NicknameEditor
