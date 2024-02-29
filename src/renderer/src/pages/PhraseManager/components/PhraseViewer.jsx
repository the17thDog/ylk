import { Modal, Card, Button } from "antd"

const PhraseViewer = (props) => {
  const { data, ...modalProps } = props

  return (
    <Modal
      {...modalProps}
      title='查看短语'
      forceRender
      maskClosable={false}
      width={660}
      centered
      destroyOnClose
      footer={
        <Button type="primary" onClick={modalProps.onCancel}>关闭</Button>
      }
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '30px 0' }}>
        <Card style={{ width: 300, background: 'rgba(0, 0, 0, 0.01)' }}>
          {data?.chinese}
        </Card>

        <Card style={{ width: 300, background: 'rgba(0, 0, 0, 0.01)' }}>
          {data?.english}
        </Card>
      </div>
    </Modal>
  )
}

export default PhraseViewer
