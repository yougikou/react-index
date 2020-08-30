import React from 'react';
import { message, Input, Button } from 'antd';
import { getSettings, saveSettings } from "../../services/DataService";
import "../css/pages.css";

interface StateType {
  rootUrl: string;
}

export class BasicTabPanel extends React.Component<any, StateType> {

  constructor(props: any) {
    super(props);
    this.state = {
      rootUrl: "",
    };
  }

  componentDidMount(){
    let settingJson = getSettings();
    this.setState({
      rootUrl: settingJson.rootUrl
    })
  }

  handleChange(e: any) {
    this.setState({rootUrl: e.target.value});
  }

  onFinish() {
    saveSettings(this.state);
    message.success("Root url setting saved.");
  }

  render() {
    const { rootUrl } = this.state;
    return(
      <div>
        <Input value={rootUrl} onChange={(e)=> this.handleChange(e)}/>
        <Button type="primary" style={{ marginTop: 16 }} onClick={()=> this.onFinish()}>
          Save
        </Button>
      </div>
    );
  }
}