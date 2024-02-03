import { useState } from 'react'
import { Button, Tooltip, Popover } from 'antd'
import { HomeTwoTone, UserOutlined, LeftOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useUserInfo } from '@/hooks/useUserInfo'

import styles from './index.module.less'

import NicknameEditor from './components/NicknameEditor'

const Header = props => {
  const { useBack = false } = props

  const { setUserInfo } = useUserInfo()

  const [open, setOpen] = useState(false)
  const [editor, setEditor] = useState({ visible: false })
  const user = useSelector((state) => state.user?.userInfo);
  const navigate = useNavigate()

  const handleSetNickname = () => {
    setOpen(false)
    setEditor({ visible: true })
  }

  const closeEditor = () => {
    setEditor({ visible: false })
  }

  const handleOk = () => {
    closeEditor()
    setUserInfo()
  }

  return (
    <div className={styles.header}>
      <div className={styles.logo}>
      <Button
          shape='circle'
          icon={<LeftOutlined />}
          style={{ marginRight: 16 }}
          onClick={() => { navigate('/login') }}
        />

        {useBack &&
          <Tooltip title="返回首页">
            <Button
              shape='circle'
              icon={<LeftOutlined />}
              style={{ marginRight: 16 }}
              onClick={() => { navigate('/') }}
            />
          </Tooltip>
        }

        <img src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" height="32" width="32" alt="logo" />
        <span>语料库</span>
      </div>

      <div className={styles.info}>
        <Tooltip title='后台管理'>
          <Button
            shape='circle'
            icon={<HomeTwoTone />}
            style={{ marginRight: 12 }}
            onClick={() => { navigate('/settings') }}
          />
        </Tooltip>

        <Popover
          content={
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <Button type='link' onClick={handleSetNickname}>修改昵称</Button>
              <Button type='link'>我的笔记</Button>
              <Button type='link'>退出登录</Button>
            </div>
          }
          placement='bottomRight'
          trigger="click"
          open={open}
        >
          <Button
            shape='circle'
            icon={<UserOutlined />}
            style={{ marginRight: 6, color: '#3479f6' }}
            onClick={() => setOpen(!open)}
          />
        </Popover>
        <span>{user.nickName}</span>
      </div>

      <NicknameEditor
        open={editor.visible}
        user={user}
        top="30vh"
        onOk={handleOk}
        onCancel={closeEditor}
      />
    </div>
  )
}

export default Header
