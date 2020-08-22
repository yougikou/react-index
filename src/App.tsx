import React from 'react';
import { HashRouter, Route } from "react-router-dom";
import { Layout } from 'antd';
import { SideMenu } from "./components/LayoutWidgets";
import Settings from "./pages/Settings";

class App extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
    };
  }

  

  render() {
    const { Footer } = Layout;
    return (
      <HashRouter>
        <Layout style={{ minHeight: '100vh' }}>
          <SideMenu />
          <Layout>
            <Route path="/" component={Settings} />
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
          </Layout>
        </Layout>
      </HashRouter>
    );
  }
}

export default App;
