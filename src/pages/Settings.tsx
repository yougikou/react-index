import React from 'react';
import { Typography, Layout, Tabs, Form, Input, Button } from 'antd';
import { getSettings, saveSettings } from "../services/DataService";
import "./css/Pages.css";

const layout = {
  labelCol: {
    span: 2,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 2,
    span: 16,
  },
};


const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

class Settings extends React.Component<any, any> {
  static basicSettingKey: string = "setting-basic";

  constructor(props: any) {
    super(props);
    let settingJson = getSettings();
    this.state = {
      settings: settingJson,
    };
  }

  onPanel1Finish(values: any) {
    saveSettings(values);
    var settingObj = getSettings(); 
    this.setState({
      settings: settingObj
    })
  }

  onPanel2Finish(values: any) {
    let lines = values.categories.split(';');
    
    saveSettings(values);
    var settingObj = getSettings(); 
    this.setState({
      settings: settingObj
    })
  }

  getCategoriesStr() {

  }

  render() {
    const { Title } = Typography
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
                <Form
                  {...layout}
                  name="basic"
                  size="small"
                  initialValues={{ 
                    rootUrl: this.state.settings?.rootUrl
                  }}
                  onFinish={this.onPanel1Finish.bind(this)}
                  onFinishFailed={onFinishFailed}
                >
                  <Form.Item
                    label="Root URL"
                    name="rootUrl"
                    rules={[{ required: true, message: 'Please input your root index page url!' }]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                      Save
                    </Button>
                  </Form.Item>
                </Form>
              </TabPane>
              <TabPane tab="Rules" key="2">

               <Form
                  {...layout}
                  name="basic"
                  size="small"
                  initialValues={{ }}
                  onFinish={this.onPanel2Finish.bind(this)}
                >
                  <Form.Item
                    label="Categories"
                    name="categories"
                  >
                    <Input.TextArea />
                  </Form.Item>
                  <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                      Save
                    </Button>
                  </Form.Item>
                </Form>
              </TabPane>
            </Tabs>
          </div>
        </Content>
      </Layout>
    );
  }
}

export default Settings;