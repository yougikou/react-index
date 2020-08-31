import React from 'react';
import { HashRouter, Route } from "react-router-dom";
import { Layout } from 'antd';
import { SideMenu } from "./components/LayoutWidgets";
import IndexPage from "./pages/IndexPage";
import Settings from "./pages/settings";
import { getSettings, getCategories, CategoryType } from "./services/DataService";

interface StateType {
  rootUrl: string;
  scriptUrl: string;
  categories: CategoryType[];
}
class App extends React.Component<any, StateType> {

  constructor(props: any) {
    super(props);
    this.state = {
      rootUrl: "",
      scriptUrl: "",
      categories: []
    };
  }

  componentDidMount(){
    const {rootUrl, scriptUrl} = getSettings();
    this.setState({
      rootUrl: rootUrl,
      scriptUrl: scriptUrl,
      categories: getCategories()
    })
  }

  render() {
    const { Footer } = Layout;
    const {rootUrl, scriptUrl, categories} = this.state;
    return (
      <HashRouter>
        <Layout style={{ minHeight: '100vh' }}>
          <SideMenu scriptUrl={scriptUrl} categories={categories}/>
          <Layout>
            {categories.map((item: any, index: any) => {
              return (
                <Route path={item.linkPath} key={index}>
                  <IndexPage url={rootUrl} category={item} />
                </Route>
              );
            })}
            <Route path="/setting" component={Settings} key="setting" />
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
          </Layout>
        </Layout>
      </HashRouter>
    );
  }
}

export default App;
