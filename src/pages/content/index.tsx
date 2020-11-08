import React from 'react';
import { Breadcrumb, Layout } from 'antd';
import { HashRouter, Link } from "react-router-dom";
import SwtichImage from "./SwitchImage";
import Markdown from "./Markdown";
import { getCategories, ContentType } from "../../services/DataService";
import "../css/Pages.css";

class Content extends React.Component<any, any> {

  constructor(props: Readonly<any>) {
    super(props);
    this.state = {
      title: props.title,
      url: props.url,
      type: props.type,
    };
  }

  render() {
    const { Header, Content } = Layout;
    const { title, url, type } = this.state;
    const category = getCategories().find(elt => elt.name === this.props.match.params.category);
    if (!type) {
      return <div></div>
    }
    let content;
    switch (type) {
      case ContentType.SWITCH_IMAGE:
        content = <SwtichImage url={url}/>;
        break;
      case ContentType.MARKDOWN:
        content = <Markdown url={url}/>;
        break;
      case ContentType.IMAGE:
      case ContentType.TEXT:
      default:
        content = <div></div>;
        break;
    }

    return(
      <Layout className="site-layout">
        <Header className="site-layout-header-small">
          <Breadcrumb style={{paddingLeft:6}}>
            <Breadcrumb.Item>
              <HashRouter>
                <Link to={ category?.linkPath ? category?.linkPath : "#" }>{category?.name}</Link>
              </HashRouter>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{title}</Breadcrumb.Item>
          </Breadcrumb>
        </Header>
        <Content className="site-layout-content">
          {content}
        </Content>
      </Layout>
    );
  }
}

export default Content;