import { Outlet, useNavigate, useLocation } from "react-router-dom"
import React, { useEffect, useState } from 'react'
import { Layout, Menu } from 'antd';

import Header from "@/components/Header";

const { Content, Sider } = Layout;

import styles from './index.module.less'

const menuItems = [
  {
    key: `class`,
    label: `班级管理`,
  },
  {
    key: `account`,
    label: `账号管理`,
  },
  {
    key: `word`,
    label: `单词管理`,
  },
  {
    key: `phrase`,
    label: `短语管理`,
  },
  {
    key: `article`,
    label: `文章管理`,
  },
]

const ManagerDashboard = () => {
  const [activeKey, setActiveKey] = useState('')

  const navigate = useNavigate()
  const location = useLocation()

  const handleClick = ({ key }) => {
    navigate(key)
  }

  useEffect(() => {
    menuItems.forEach(x => {
      if (location.pathname.includes(x.key)) {
        setActiveKey(x.key)
      }
    })
  }, [location.pathname])

  return (
    <Layout className={styles.layout_wrapper}>
      <Header useBack title="后台管理" />

      <Content>
        <Layout className={styles.container}>
          <Sider width={200} style={{ paddingTop: 16, background: '#fff' }}>
            <Menu
              mode="inline"
              selectedKeys={[activeKey]}
              style={{ height: '100%' }}
              items={menuItems}
              onClick={handleClick}
            />
          </Sider>
          <Content className={styles.content_wrapper}>
            <Outlet/>
          </Content>
        </Layout>
      </Content>
    </Layout>
  );
};

export default ManagerDashboard;
