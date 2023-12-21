import { Link, Outlet } from "react-router-dom"
import React from 'react'
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
const { Header, Content, Sider } = Layout;

import styles from './index.module.less'

const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
  (icon, index) => {
    const key = String(index + 1);

    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `subnav ${key}`,

      children: new Array(4).fill(null).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: `option${subKey}`,
        };
      }),
    };
  },
);

const items = [{
  key: ''
}]

const ManagerDashboard = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout className={styles.layout_wrapper}>
      <Header style={{ display: 'flex', alignItems: 'center' }}>
        <Link to='/'>to home</Link>
      </Header>
      <Content>
        <Layout
          className={styles.container}
          style={{ background: colorBgContainer }}
        >
          <Sider style={{ background: colorBgContainer }} width={200}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{ height: '100%' }}
              items={items2}
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
