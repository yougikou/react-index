import React from 'react';
import { HashRouter, Route } from "react-router-dom";
import { Layout } from 'antd';
import { SideMenu } from "./components/LayoutWidgets";
import { IndexPage, CollapsablePage } from "./pages/IndexPage";
import Settings from "./pages/settings";
import Content from "./pages/content";
import { getSettings, getCategories, CategoryType } from "./services/DataService";
import { listSubDirs, DirItemType } from "./services/DirInfo";

interface StateType {
  rootUrl: string;
  scriptUrl: string;
  categories: CategoryType[];
  items: DirItemType[];
}
class App extends React.Component<any, StateType> {

  constructor(props: Readonly<any>) {
    super(props);
    this.state = {
      rootUrl: "",
      scriptUrl: "",
      categories: [],
      items: []
    };
  }

  componentDidMount(){
    const {rootUrl, scriptUrl} = getSettings();
    listSubDirs({
      url: rootUrl, 
      showParent: false,
    }).then((items: DirItemType[])=> {
      this.setState({
        items: items
      })
    });
    this.setState({
      rootUrl: rootUrl,
      scriptUrl: scriptUrl,
      categories: getCategories()
    })
  }

  render() {
    const { Footer } = Layout;
    const { folderSettings } = getSettings();
    const { rootUrl, scriptUrl, categories, items } = this.state;
    return (
      <HashRouter>
        <Layout style={{ minHeight: '100vh' }}>
          <SideMenu scriptUrl={scriptUrl} categories={categories}/>
          <Layout>
            {categories.map((_item: CategoryType, _index: number) => {
              if (_item.filterStr !== null && _item.filterStr.length > 0) {
                return (
                  <Route path={_item.linkPath} key={_index}
                    component={(props : any) => 
                      <CollapsablePage url={rootUrl} category={_item} />}/>
                );
              } else {
                return (
                  <Route path={_item.linkPath} key={_index}
                    component={(props : any) => 
                      <IndexPage url={rootUrl} category={_item} />}/>
                );
              }
            })}
            {items.map((_item: DirItemType, _index: number) => {
              let typeSetting = folderSettings.find(elt => elt.path === _item.linkString);
              let pathUrl = "/" + _item.linkString + "/:category";
              return(
                <Route 
                  key={pathUrl} path={pathUrl} 
                  component={(props : any) => 
                    <Content {...props} 
                      title={ _item.title } 
                      url={_item.pathString} 
                      type={typeSetting?.type} />}/>
              );
            })}
            <Route path="/setting" component={Settings} key="/setting" />
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
          </Layout>
        </Layout>
      </HashRouter>
    );
  }
}

export default App;
