import React from 'react';
import { Typography, Layout } from 'antd';
import SwtichImage from "./SwitchImage";
import Markdown from "./Markdown";
import { ContentType } from "../../services/DataService";
import "../css/Pages.css";

interface PropsType {
  title: string;
  url: string;
  type: ContentType;
}

interface StateType {
  title: string;
  url: string;
  type: ContentType;
}

class Content extends React.Component<PropsType, any> {

  constructor(props: PropsType) {
    super(props);
    this.state = {
      title: props.title,
      url: props.url,
      type: props.type,
    };
  }

  render() {
    const { Header, Content } = Layout;
    const { Title } = Typography;
    const { title, url, type } = this.state;
    return(
      <Layout className="site-layout">
        <Header className="site-layout-header-small">
          <Title level={5}>{title}</Title>
        </Header>
        <Content className="site-layout-content">
          { type === ContentType.SWITCH_IMAGE ? <SwtichImage url={url}/> : "" }
          { type === ContentType.MARKDOWN ? <Markdown url={url}/> : "" }
          { type === ContentType.IMAGE ? <div></div>:"" }
          { type === ContentType.TEXT ? <div></div>:"" }
        </Content>
      </Layout>
    );
  }
}

export default Content;