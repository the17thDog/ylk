import { useEffect } from "react"
import { CloseOutlined, PlusCircleTwoTone } from '@ant-design/icons';
import { Modal, Form, Input, Card, Button, Space, message } from "antd"
import { requestCreatePhrase } from "@/apis/phraseManager"

import styles from './index.module.less'
import { requireRule } from "@/utils/rules";

export const EditType = {
  Create: 'create',
  Modify: 'modify'
}

const PhraseEditor = (props) => {
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
    await form.validateFields()
    await requestCreatePhrase({
      ...form.getFieldsValue()
    })

    message.success('添加成功')

    onOk()
  }

  return (
    <Modal
      {...modalProps}
      title={isModify ? '编辑短语' : '添加短语'}
      okText="确认"
      forceRender
      cancelText="取消"
      maskClosable={false}
      width={810}
      centered
      wrapClassName={styles.phrase_wrapper}
      destroyOnClose
      onOk={handleOk}
    >

      <Form
        form={form}
        name="dynamic_form_complex"
        style={{ maxWidth: 810 }}
        autoComplete="off"
        initialValues={{ phrases: [{ english: '', chinese: '' }] }}
      >
        <Card
          size="small"
        >
          <Form.Item label="英/中">
            <Form.List name='phrases'>
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
                        <Input.TextArea
                          placeholder="请添加英文"
                          rows={4}
                          style={{ width: 320, resize: 'none' }}
                          maxLength={50}
                          showCount
                        />
                      </Form.Item>

                      <Form.Item
                        name={[f.name, 'chinese']}
                        rules={[requireRule()]}
                      >
                        <Input.TextArea
                          placeholder="请添加中文"
                          rows={4}
                          style={{ width: 320, resize: 'none' }}
                          maxLength={50}
                          showCount
                        />
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

export default PhraseEditor
