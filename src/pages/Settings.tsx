import React from 'react';
import { Typography, Layout, Tabs, Form, Input, Button } from 'antd';
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

  constructor(props: any) {
    super(props);
    var settingObj = localStorage.getItem('setting');
    if (settingObj !== undefined && settingObj !== null) {
      this.state = {
        settings: JSON.parse(settingObj),
        treeData: []
      };
    } else {
      this.state = {
        settings: null,
        treeData: []
      };
    }
  }

  componentDidMount() {
  }

  onFinish(values: any) {
    console.log('Success:', values);
    localStorage.setItem('setting', JSON.stringify(values));
    var settingObj = localStorage.getItem('setting');
    if (settingObj !== undefined && settingObj !== null) {
      this.setState({
        settings: JSON.parse(settingObj)
      })
    }
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
                  initialValues={{  }}
                  onFinish={this.onFinish.bind(this)}
                  onFinishFailed={onFinishFailed}
                >
                  <Form.Item
                    label="Root Index URL"
                    name="rootUrl"
                    rules={[{ required: true, message: 'Please input your root index page url!' }]}
                  >
                    <Input value={this.state.settings?.rootUrl}/>
                  </Form.Item>
                  <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                      Save
                    </Button>
                  </Form.Item>
                </Form>
              </TabPane>
              <TabPane tab="Rules" key="2">
              </TabPane>
            </Tabs>
          </div>
        </Content>
      </Layout>
    );
  }
}

export default Settings;