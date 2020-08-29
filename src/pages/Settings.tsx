import React from 'react';
import { Typography, Layout, Tabs, Form, Input, Button } from 'antd';
import { getSettings, saveSettings, CategoryType } from "../services/DataService";
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

export interface StateType {
  rootUrl: string;
  categories: CategoryType[];
}

class Settings extends React.Component<any, StateType> {
  static basicSettingKey: string = "setting-basic";

  constructor(props: any) {
    super(props);
    let settingJson = getSettings();
    this.state = {
      rootUrl: settingJson.rootUrl,
      categories: settingJson.categories
    };
  }

  onPanel1Finish(values: any) {
    saveSettings(values);
    var settingJson = getSettings(); 
    this.setState({
      rootUrl: settingJson.rootUrl,
      categories: settingJson.categories
    })
  }

  onPanel2Finish(values: any) {
    console.log(values)    
    // saveSettings(values);
    // var settingObj = getSettings(); 
    // this.setState({
    //   settings: settingObj
    // })
  }

  deleteCurrentRow(index: number): void {
    if (index > -1) {
      var newCategories = this.state.categories;
      newCategories.splice(index, 1);
      this.setState({
        categories:newCategories
      })
    }
  }

  addNewRow() {
    var newCategories = this.state.categories.concat([{ name: "", filterStr: "" }]);
    this.setState({
      categories:newCategories
    })
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
            <Tabs defaultActiveKey="2">
              <TabPane tab="Basic" key="1">
                <Form
                  {...layout}
                  name="basic"
                  size="small"
                  initialValues={{ 
                    rootUrl: this.state.rootUrl
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
                  onFinish={this.onPanel2Finish.bind(this)}
                >
                  <Form.Item
                    label="Categories"
                    name="categories"
                  >
                    {this.state.categories.length === 0 ? "Click Add new Category button to add" : ""}
                    {this.state.categories.map((item: CategoryType, index: number) => {
                      return(
                        <Input.Group compact>
                          <Button onClick={() => this.deleteCurrentRow(index)}>-</Button>
                          <Input required name="name" style={{ width: '20%' }} value={item.name}/>
                          <Input required name="filterStr" style={{ width: '30%' }} value={item.filterStr}/>
                        </Input.Group>
                      );
                    })}
                  </Form.Item>
                  <Form.Item {...tailLayout}>
                    <Button htmlType="submit" type="primary">
                      Submit
                    </Button>
                    <Button htmlType="button" style={{ margin: '0 8px' }} onClick={() => this.addNewRow()}>
                      Add New Category
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