import { Link, Outlet, useNavigate } from "react-router-dom"
import React from 'react'
import { Layout, Menu } from 'antd';
const { Header, Content, Sider } = Layout;

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
  const navigate = useNavigate()

  const handleClick = ({ key }) => {
    navigate(key)
  }

  return (
    <Layout className={styles.layout_wrapper}>
      <Header>
        <Link to='/'>返回</Link>
      </Header>
      <Content>
        <Layout className={styles.container}>
          <Sider width={200}>
            <Menu
              mode="inline"
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
