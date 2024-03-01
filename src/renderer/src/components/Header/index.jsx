import { useEffect, useState } from 'react'
import { Button, Tooltip, Popover, message, Breadcrumb } from 'antd'
import { HomeTwoTone, UserOutlined, LeftOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useUserInfo } from '@/hooks/useUserInfo'

import styles from './index.module.less'

import NicknameEditor from './components/NicknameEditor'
import { requestLogout } from '@/apis/users'

const Header = props => {
  const { useBack = false, title, hideInfo = false, bgColor = '#f8f8f8' } = props

  const { setUserInfo } = useUserInfo(hideInfo)

  const [open, setOpen] = useState(false)
  const [editor, setEditor] = useState({ visible: false })
  const user = useSelector((state) => state.user?.userInfo);
  const navigate = useNavigate()


  useEffect(() => {
    const handler = () => setOpen(false)

    document.body.addEventListener('click', handler)

    return () => {
      document.body.removeEventListener('click', handler)
    }
  }, [])

  const handleSetNickname = (e) => {
    setEditor({ visible: true })
  }

  const handleLogout = async () => {
    await requestLogout()
    setUserInfo({})

    message.success('退出登陆成功')
  }

  const closeEditor = () => {
    setEditor({ visible: false })
  }

  const handleOk = () => {
    closeEditor()
    setUserInfo()
  }

  return (
    <div className={styles.header} style={{ backgroundColor: bgColor }}>
      <div className={styles.logo}>
        <img src="data:image/jpeg;base64,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" height="32" width="32" alt="logo" />
        <span>铜仁学院</span>

        {useBack &&
          <Breadcrumb
            style={{ marginLeft: 24 }}
            items={[
              { title: <span className={styles.back}><LeftOutlined />首页</span>, onClick() { navigate('/') } },
              { title }
            ]}
          />
        }
      </div>

      {!hideInfo &&
        <div className={styles.info}>
          <Tooltip title='后台管理'>
            {user?.backendPermission &&
              <Button
                shape='circle'
                icon={<HomeTwoTone />}
                style={{ marginRight: 12 }}
                onClick={() => { navigate('/settings/class') }}
              />
            }
          </Tooltip>

          <Popover
            content={
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <Button type='link' onClick={handleSetNickname}>修改昵称</Button>
                <Button type='link' onClick={() => navigate('/note')}>我的笔记</Button>
                <Button type='link' onClick={handleLogout}>退出登录</Button>
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
              onClick={(e) => {
                e.stopPropagation()
                setOpen(!open)
              }}
            />
          </Popover>
          <span className={styles.name}>{user.nickName}</span>
        </div>
      }

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
