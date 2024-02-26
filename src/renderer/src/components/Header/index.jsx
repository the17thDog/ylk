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
        <img src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" height="32" width="32" alt="logo" />
        <span>语料库</span>

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
