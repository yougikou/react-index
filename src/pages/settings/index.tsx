import React from 'react';
import { Typography, Layout, Tabs } from 'antd';
import { BasicTabPanel } from "./BasicTabPanel";
import { RuleTabPanel } from "./RuleTabPanel";
import { FolderTabPanel } from "./FolderTabPanel";
import "../css/Pages.css";


class Settings extends React.Component<any, any> {

  static basicSettingKey: string = "setting-basic";

  constructor(props: Readonly<any>) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { Title } = Typography;
    const { Header, Content } = Layout;
    const { TabPane } = Tabs;

    return(
      <Layout className="site-layout">
        <Header className="site-layout-header">
          <Title level={1}>Settings</Title>
        </Header>
        <Content className="site-layout-content">
          <div className="site-layout-content-div">
            <Tabs defaultActiveKey="1">
              <TabPane tab="Basic" key="1">
                <BasicTabPanel />
              </TabPane>
              <TabPane tab="Rules" key="2">
                <RuleTabPanel />
              </TabPane>
              <TabPane tab="Folders" key="3">
                <FolderTabPanel />
              </TabPane>
            </Tabs>
          </div>
        </Content>
      </Layout>
    );
  }
}

export default Settings;