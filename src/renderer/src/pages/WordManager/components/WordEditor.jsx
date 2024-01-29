import { useEffect } from "react"
import { CloseOutlined, PlusCircleTwoTone } from '@ant-design/icons';
import { Modal, Form, Input, Card, Button, Space } from "antd"
import { requestCreateWord } from "@/apis/wordManager"

import styles from './index.module.less'
import { requireRule } from "@/utils/rules";

export const EditType = {
  Create: 'create',
  Modify: 'modify'
}

const AccountEditor = (props) => {
  const { content, editType, ...modalProps } = props
  const { onOk, open } = modalProps

  const [form] = Form.useForm();

  const isModify = editType === EditType.Modify

  useEffect(() => {
    if (open) {
      if (isModify) {
      }
    } else {
      form.resetFields()
    }
  }, [open])

  const handleOk = async () => {
    console.log(' form.getFieldsValue():', form.getFieldsValue());

    await form.validateFields()
    const data = form.getFieldsValue()
    await requestCreateWord({
      ...data
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
      width={640}
      centered
      wrapClassName={styles.word_wrapper}
      destroyOnClose
      onOk={handleOk}
    >

      <Form
        labelCol={{ span: 3 }}
        wrapperCol={{ span: 22 }}
        form={form}
        name="dynamic_form_complex"
        style={{ maxWidth: 640 }}
        autoComplete="off"
        initialValues={{ words: [{ english: '', chinese: '' }] }}
      >
        <Card
          size="small"
        >
          <Form.Item label="英/中">
            <Form.List name='words'>
              {(field, opt) => (
                <div>
                  {field.map((f) => (
                    <Space
                      key={f.key}
                      className={styles.cont_wrapper}
                    >
                      <Form.Item
                        name={[f.name, 'english']}
                        rules={[requireRule()]}
                      >
                        <Input placeholder="请添加英文" maxLength={20} showCount />
                      </Form.Item>

                      <Form.Item
                        name={[f.name, 'chinese']}
                        rules={[requireRule()]}
                      >
                        <Input placeholder="请添加中文" maxLength={40} showCount />
                      </Form.Item>

                      {field.length > 1 &&
                        <CloseOutlined
                          className={styles.close}
                          onClick={() => { opt.remove(f.name) }}
                        />
                      }
                    </Space>
                  ))}

                  <Button
                    icon={<PlusCircleTwoTone />}
                    onClick={() => { opt.add() }}
                  >添加</Button>
                </div>
              )}
            </Form.List>
          </Form.Item>
        </Card>
      </Form >
    </Modal >
  )
}

export default AccountEditor
