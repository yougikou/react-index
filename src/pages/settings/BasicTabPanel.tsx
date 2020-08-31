import React from 'react';
import { message, Input, Button } from 'antd';
import { getSettings, saveSettings } from "../../services/DataService";
import "../css/pages.css";

interface StateType {
  rootUrl: string;
  scriptUrl: string;
}

export class BasicTabPanel extends React.Component<any, StateType> {

  constructor(props: any) {
    super(props);
    this.state = {
      rootUrl: "",
      scriptUrl: "",
    };
  }

  componentDidMount(){
    const {rootUrl, scriptUrl} = getSettings();
    this.setState({
      rootUrl: rootUrl,
      scriptUrl: scriptUrl
    })
  }

  handleChange(e: any, key: string) {
    let field: any = {};
    field[key] = e.target.value;
    this.setState({...field});
  }

  onFinish() {
    saveSettings(this.state);
    message.success("Root url setting saved.");
    window.location.reload(false);
  }

  render() {
    const { rootUrl, scriptUrl } = this.state;
    return(
      <div>
        <Input addonBefore="Root Url: " value={rootUrl} onChange={(e)=> this.handleChange(e, "rootUrl")}/>
        <Input addonBefore="Iconfont Script Url: " value={scriptUrl} onChange={(e)=> this.handleChange(e, "scriptUrl")}/>
        <Button type="primary" style={{ marginTop: 16 }} onClick={()=> this.onFinish()}>
          Save
        </Button>
      </div>
    );
  }
}