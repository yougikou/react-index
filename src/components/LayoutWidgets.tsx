import React, { useState } from 'react';
import { HashRouter, Link } from "react-router-dom";
import { Menu, Layout } from 'antd';
import {
  SettingOutlined,
  createFromIconfontCN,
} from '@ant-design/icons';
import { CategoryType } from "../services/DataService";
import "./css/LayoutWidgets.css";

export interface PropsType {
  scriptUrl: string;
  categories: CategoryType[];
}

function SideMenu(props: PropsType) {

  const [collapsed, setCollapsed] = useState(Boolean);
  const { Sider } = Layout;
  const IconFont = createFromIconfontCN({
    scriptUrl: [
      props.scriptUrl
    ],
  });

  return (
    <HashRouter>
      <Sider collapsible collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          {props.categories.map((item: any, index: any) => {
            return(
              <Menu.Item 
                key={index} 
                icon={<IconFont type={ item.iconStr } />}>
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