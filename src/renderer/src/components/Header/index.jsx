import { Button, Tooltip, Popover } from 'antd'
import { HomeTwoTone, UserOutlined, LeftOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import styles from './index.module.less'
import { useState } from 'react'

const Header = props => {
  const { useBack = false } = props

  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <div className={styles.header}>
      <div className={styles.logo}>
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
              <Button type='link'>修改昵称</Button>
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
        <span>章三</span>
      </div>
    </div>
  )
}

export default Header
