import React from 'react';
import { Typography, Layout, Tabs, Button, Row, Col } from 'antd';
import { BasicTabPanel } from "./BasicTabPanel";
import { RuleTabPanel } from "./RuleTabPanel";
import { FolderTabPanel } from "./FolderTabPanel";
import { getSettings, saveSettings } from "../../services/DataService";
import { UploadOutlined } from '@ant-design/icons';
import "../css/Pages.css";

class Settings extends React.Component<any, any> {

  static basicSettingKey: string = "setting-basic";
  inputFile: React.RefObject<HTMLInputElement>;

  constructor(props: Readonly<any>) {
    super(props);
    this.inputFile = React.createRef();
  }

  download() {
    let settings = getSettings();
    const fileName = "react-index-settings";
    const json = JSON.stringify(settings);
    const blob = new Blob([json],{type:'application/json'});
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = fileName + ".json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  onButtonClick() {
    const node = this.inputFile.current;
    if (node !== null) {
      node.click();
    }
  };

  handleFileUpload(e: any) {
    const { files } = e.target;
    if (files && files.length) {
      var reader = new FileReader();
      reader.onload = this.onReaderLoad;
      reader.readAsText(files[0]);
    }
  };

  onReaderLoad(e: any){
    console.log(e.target.result);
    var obj = JSON.parse(e.target.result);
    saveSettings(obj);
    window.location.reload();
  }

  render() {
    const { Title } = Typography;
    const { Header, Content } = Layout;
    const { TabPane } = Tabs;
    
    return(
      <Layout className="site-layout">
        <Header className="site-layout-header">
          <div>
            <Row>
              <Col>
                <Title level={1}>Settings</Title>
              </Col>
              <Col>
                <Button onClick={this.download.bind(this)} type="primary" style={{ marginLeft:10 }}>
                  Download
                </Button>
              </Col>
              <Col>
                <input type='file' id='file' accept=".json"
                  ref={this.inputFile} style={{display: 'none'}}
                  onChange={this.handleFileUpload.bind(this)}/>
                <Button onClick={this.onButtonClick.bind(this)} style={{ marginLeft:10 }} icon={<UploadOutlined />}>Upload</Button>
              </Col>
            </Row>
          </div>
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