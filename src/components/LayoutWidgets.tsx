import React, { useState } from 'react';
import { HashRouter, Link } from "react-router-dom";
import { Typography, Menu, Layout, Row, Col, Card } from 'antd';
import {
  SettingOutlined,
  ContainerOutlined,
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
  const { Title } = Typography;
  const IconFont = createFromIconfontCN({
    scriptUrl: [
      props.scriptUrl
    ],
  });

  let logo = collapsed ? 
    <Title level={3} style={{textAlign: 'center', color: "white"}}>R.I.</Title> :
    <Title level={3} style={{textAlign: 'center', color: "white"}}>React Index</Title>;

  return (
    <HashRouter>
      <Sider collapsible collapsed={collapsed} onCollapse={() => setCollapsed(!collapsed)}>
        <div className="logo">{logo}</div>
        <Menu theme="dark" mode="inline">
          {props.categories.map((item: CategoryType, index: any) => {
              return(
                <Menu.Item 
                  key={index} 
                  icon={item.iconStr ? <IconFont type={ item.iconStr } /> : <ContainerOutlined />}>
                  <Link to={ item.linkPath ? item.linkPath:"#" }>{item.name}</Link>
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
  let linkUrl = "/" + props.title + "/" + props.category;
  return(
    <div style={{ padding: '8px 0' }}>
      <HashRouter>
        <Card 
          size="small" 
          title={ props.title } 
          extra={ <Link to={ linkUrl }>開く</Link> }
          style={{ width: 250 }}>
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