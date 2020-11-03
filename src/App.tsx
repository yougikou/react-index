import React from 'react';
import { HashRouter, Route } from "react-router-dom";
import { Layout } from 'antd';
import { SideMenu } from "./components/LayoutWidgets";
import IndexPage from "./pages/IndexPage";
import CollapsableCatePage from "./pages/CollapsableCatePage";
import Settings from "./pages/settings";
import { getSettings, getCategories, CategoryType } from "./services/DataService";

interface StateType {
  rootUrl: string;
  scriptUrl: string;
  categories: CategoryType[];
}
class App extends React.Component<any, StateType> {

  constructor(props: Readonly<any>) {
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
            {categories.map((_item: CategoryType, _index: number) => {
              if (_item.subCategoryStr && _item.subCategoryStr.length > 0) {
                return (
                  <Route path={_item.linkPath} key={_index}>
                    <CollapsableCatePage url={rootUrl} category={_item} />
                  </Route>
                );
              } else {
                return (
                  <Route path={_item.linkPath} key={_index}>
                    <IndexPage url={rootUrl} category={_item} />
                  </Route>
                );
              }
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
