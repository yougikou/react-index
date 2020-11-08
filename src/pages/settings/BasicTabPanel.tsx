import React from 'react';
import { message, Form, Input, Button, Switch } from 'antd';
import { getSettings, saveSettings } from "../../services/DataService";
import "../css/Pages.css";

export class BasicTabPanel extends React.Component<any, any> {
  constructor(props: Readonly<any>) {
    super(props);
    this.state = {
      settings: null,
      isLoading: true,
    };
  }

  componentDidMount(){
    const settings = getSettings();
    this.setState({
      settings: settings,
      isLoading: false
    })
  }

  onFinish(values : any) {
    saveSettings(values);
    message.success("Root url setting saved.");
    window.location.reload(false);
  }

  render() {
    const { settings, isLoading } = this.state;
    if (isLoading) {
      return <div></div>
    } else {
      return(
        <Form 
          size="small" 
          onFinish={this.onFinish.bind(this)}
          initialValues={settings}>
          <Form.Item label="Root Url" name="rootUrl">
            <Input />
          </Form.Item>
          <Form.Item label="Iconfont Script Url" name="scriptUrl">
            <Input />
          </Form.Item>
          <Form.Item label="Show Uncategorized Page" name="showUncategorized">
            <Switch defaultChecked={settings.showUncategorized}/>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">Save</Button>
          </Form.Item>
        </Form>
      );
    }
  }
}