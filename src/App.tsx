import React from 'react';
import { HashRouter, Route } from "react-router-dom";
import { Layout } from 'antd';
import { SideMenu } from "./components/LayoutWidgets";
import IndexPage from "./pages/IndexPage";
import Settings from "./pages/Settings";
import { getSettings, getCategories } from "./services/DataService";

class App extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    let settingJson = getSettings();
    this.state = {
      settings: settingJson,
    };
  }

  render() {
    const { Footer } = Layout;
    const categories = getCategories();
    return (
      <HashRouter>
        <Layout style={{ minHeight: '100vh' }}>
          <SideMenu categories={categories}/>
          <Layout>
            {categories.map((item: any, index: any) => {
              return (
                <Route path={item.linkPath}>
                  <IndexPage url={this.state.settings.rootUrl} category={item} />
                </Route>
              );
            })}
            <Route path="/setting" component={Settings} />
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
          </Layout>
        </Layout>
      </HashRouter>
    );
  }
}

export default App;
