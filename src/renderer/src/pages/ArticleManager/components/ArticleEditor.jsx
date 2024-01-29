import { useEffect } from "react"
import { CloseOutlined, PlusCircleTwoTone } from '@ant-design/icons';
import { Modal, Form, Input, Card, Button, Space } from "antd"
import { requestCreateArticle } from "@/apis/articleManager"

import styles from './index.module.less'
import { requireRule } from "@/utils/rules";

export const EditType = {
  Create: 'create',
  Modify: 'modify'
}

const ArticleEditor = (props) => {
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
    await requestCreateWord({
      ...form.getFieldsValue()
    })

    onOk()
  }

  return (
    <Modal
      {...modalProps}
      title={isModify ? '编辑文章' : '添加文章'}
      okText="确认"
      forceRender
      cancelText="取消"
      maskClosable={false}
      width={810}
      centered
      wrapClassName={styles.article_wrapper}
      destroyOnClose
      onOk={handleOk}
    >

      <Form
        form={form}
        name="dynamic_form_complex"
        style={{ maxWidth: 810 }}
        autoComplete="off"
        initialValues={{ items: [{ english: '', chinese: '' }] }}
      >
        <Form.Item
          label="文章标题"
          name="title"
          rules={[requireRule()]}
        >
          <Input
            placeholder="请输入"
            style={{ width: 300 }}
            maxLength={20}
            showCount
          />
        </Form.Item>

        <Card
          size="small"
          type="inner"
          title="添加段落"
        >
          <Form.Item>
            <Form.List name='items'>
              {(field, opt) => (
                <div>
                  {field.map((f, index) => (
                    <Space
                      key={f.key}
                      className={styles.cont_wrapper}
                    >
                      <Form.Item
                        label={`段落${index + 1}`}
                        name={[f.name, 'english']}
                        rules={[requireRule()]}
                      >
                        <Input.TextArea
                          placeholder="请添加英文"
                          rows={4}
                          style={{ width: 320, resize: 'none' }}
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

export default ArticleEditor
