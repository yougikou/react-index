import React, { useState } from 'react';
import { Menu, Layout } from 'antd';
import {
  UserOutlined,
  VideoCameraOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import "./css/LayoutWidgets.css";

function SideMenu(props: any) {

  const [collapsed, setCollapsed] = useState(Boolean);
  const { Sider } = Layout;

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)}>
      <div className="logo" />
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
        <Menu.Item key="1" icon={<UserOutlined />}>
          nav 1
        </Menu.Item>
        <Menu.Item key="2" icon={<VideoCameraOutlined />}>
          nav 2
        </Menu.Item>
        <Menu.Item key="-1" icon={<SettingOutlined />}>
          Settings
        </Menu.Item>
      </Menu>
    </Sider>
  );
}

export { SideMenu };