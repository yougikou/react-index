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

  componentDidMount() {
    // let requestParams = { url: "http://192.168.31.111/sapix/", showParent: false }
    // listDirItems(requestParams).then((data)=>{
    //   this.setState({
    //     isLoading: false,
    //     items: data
    //   })
    // })
  }

  render() {
    return (
      <HashRouter>
        <Layout style={{ minHeight: '100vh' }}>
          <SideMenu />
          <Route path="/" component={Settings} />
        </Layout>
      </HashRouter>
    );
  }
}

export default App;
