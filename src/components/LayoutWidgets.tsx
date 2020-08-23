import React, { useState } from 'react';
import { HashRouter, Link } from "react-router-dom";
import { Menu, Layout } from 'antd';
import {
  UserOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { CategoryType } from "../services/DataService";
import "./css/LayoutWidgets.css";

export interface propsType {
  categories: CategoryType[]
}

function SideMenu(props: propsType) {

  const [collapsed, setCollapsed] = useState(Boolean);
  const { Sider } = Layout;

  return (
    <HashRouter>
      <Sider collapsible collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          {props.categories.map((item: any, index: any) => {
            return(
              <Menu.Item 
                key={index} 
                icon={<UserOutlined />}>
                <Link to={ item.linkPath }>{item.name}</Link>
              </Menu.Item>
            );
          })}
          <Menu.Item key="-1" icon={<SettingOutlined />}>
          <Link to="/setting">Settings</Link>
          </Menu.Item>
        </Menu>
      </Sider>
    </HashRouter>
  );
}

export { SideMenu };