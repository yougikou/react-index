import React from 'react';
import { Typography, Layout } from 'antd';
import "./css/Pages.css";

export interface categoryType {
  name: string;
  iconStr: string;
  linkPath: string;
}

export interface propsType {
  url: string,
  category: categoryType
}

class IndexPage extends React.Component<any, any> {
  constructor(props: propsType) {
    super(props);
    this.state = {
      url: props.url,
      category: props.category,
      items: [],
    };
  }

  render() {
    const { Title } = Typography
    const { Header, Content } = Layout;

    return(
      <Layout className="site-layout">
        <Header className="site-layout-header">
          <Title level={1}>{this.state.category.name}</Title>
        </Header>
        <Content className="site-layout-content">
          <div className="site-layout-content-div">
            content
          </div>
        </Content>
      </Layout>
    );
  }
}

export default IndexPage;