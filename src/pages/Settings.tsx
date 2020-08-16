import React from 'react';
import { Layout } from 'antd';
import "./css/Pages.css";

class Settings extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {};
  }

  render() {
    const { Header, Content, Footer } = Layout;
    return(
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: '16px 16px' }}>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            Bill is a setting.
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    );
  }
}

export default Settings;