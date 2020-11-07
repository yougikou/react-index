import React, { useState } from 'react';
import { HashRouter, Link } from "react-router-dom";
import { Menu, Layout, Row, Col, Card } from 'antd';
import {
  SettingOutlined,
  createFromIconfontCN,
} from '@ant-design/icons';
import { CategoryType } from "../services/DataService";
import { DirItemType } from "../services/DirInfo";
import "./css/LayoutWidgets.css";

export interface SideMenuPropsType {
  scriptUrl: string;
  categories: CategoryType[];
}

export interface GroupType {
  subCate: string;
  items: DirItemType[];
}

function SideMenu(props: SideMenuPropsType) {

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
        <Menu theme="dark" mode="inline">
          {props.categories.map((item: CategoryType, index: any) => {
              return(
                <Menu.Item 
                  key={index} 
                  icon={<IconFont type={ item.iconStr?item.iconStr:"empty" } />}>
                  <Link to={ item.linkPath?item.linkPath:"empty" }>{item.name}</Link>
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

export interface CardItemPropsType {
  title: string;
  category: string;
}

function CardItem(props: CardItemPropsType) {
  return(
    <div style={{ padding: '8px 0' }}>
      <HashRouter>
        <Card 
          size="small" 
          title={ props.title } 
          extra={ <Link to={ props.title + "/" + props.category }>開く</Link> }
          style={{ width: 250 }}>
          // TODO add description implementation
        </Card>
      </HashRouter>
    </div>
  )
}

export interface GridLayoutPropsType {
  items: DirItemType[];
  category: string;
}

function GridLayout(props: GridLayoutPropsType) {
  const { items } = props;
  const cardItems: any[] = items.map((_item: DirItemType, _index: number) => {
    return (
      <Col key={ _index }>
        <CardItem 
          title={ _item.title } category={props.category} 
        />
      </Col>
    );
  });

  return(
    <Row gutter={16}>
      { cardItems }
    </Row>
  );
}

export { SideMenu, GridLayout, CardItem };