import React from 'react';
import { HashRouter, Route } from "react-router-dom";
import { Layout } from 'antd';
import { SideMenu } from "./components/LayoutWidgets";
import IndexPage from "./pages/IndexPage";
import CollapsableCatePage from "./pages/CollapsableCatePage";
import SwitchImagePage from "./pages/SwitchImagePage";
import Settings from "./pages/settings";
import { getSettings, getCategories, CategoryType } from "./services/DataService";
import { listSubDirs, DirItemType } from "./services/DirInfo";

const FolderType = {
    IMAGE: 'Image',
    SWITCH_IMAGE: 'Switch image',
    MARKDOWN: 'Mark down',
    TEXT: 'Text'
}

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
    const {rootUrl, scriptUrl, categories, items } = this.state;
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
            {items.map((_item: DirItemType, _index: number) => {
              let idx = folderSettings.findIndex(elt => elt.path === _item.linkString);
              if (idx < 0 ) {
                return(
                  // text page
                  <Route path={"/" + _item.linkString} component={Settings} key={_item.linkString} />
                );
              }
              let type = folderSettings[idx].type;
              switch (type) {
                case FolderType.SWITCH_IMAGE:
                  return(
                    // text page
                    <Route path={"/" + _item.linkString} key={_item.linkString}>
                      <SwitchImagePage key={_index} url={ _item.pathString } title={ _item.title }/>
                    </Route>
                  );
                case FolderType.MARKDOWN:
                  return(
                    // text page
                    <Route path={_item.linkString} component={Settings} key={_item.linkString} />
                  );
                case FolderType.IMAGE:
                  return(
                    // text page
                    <Route path={_item.linkString} component={Settings} key={_item.linkString} />
                  );
                case FolderType.TEXT:
                default:
                  return(
                    // text page
                    <Route path={_item.linkString} component={Settings} key={_item.linkString} />
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
