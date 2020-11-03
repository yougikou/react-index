import React from 'react';
import { message, Divider, Button, Select, List, AutoComplete } from 'antd';
import { listSubDirs, DirItemType } from "../../services/DirInfo";
import { getSettings, saveSettings, FolderTypeSetting } from "../../services/DataService";
import "../css/pages.css";

const FolderType = {
    IMAGE: 'Image',
    SWITCH_IMAGE: 'Switch image',
    MARKDOWN: 'Mark down',
    TEXT: 'Text'
}

interface StateType {
  options: {value: string}[];
  filteredOptions: {value: string}[];
  level: number;
  selectedType: string;
  inputFolderPath: string;
  folderSettings: FolderTypeSetting[];
}

export class FolderTabPanel extends React.Component<any, StateType> {

  constructor(props: Readonly<any>) {
    super(props);
    this.state = {
        options: [],
        filteredOptions: [],
        level: 0,
        inputFolderPath: "",
        selectedType: "",
        folderSettings: []
    };
  }

  componentDidMount(){
    const { rootUrl, folderSettings } = getSettings();
    listSubDirs({
      url: rootUrl, 
      showParent: false,
    }).then((items: DirItemType[])=> {
      let arrVal = items.map((item : DirItemType) => {
        return { value: item.title };
      });
      this.setState({
        options: arrVal, 
        filteredOptions: arrVal, 
        level: 1,
        folderSettings: folderSettings});
    });
  }

  onSearch(searchText: string) {
    const { rootUrl } = getSettings();
    const { options, level } = this.state;
    const searchKeys = searchText.split("/");
    const searchLevel = searchKeys.length;
    if (searchLevel !== level) {
      let queryUrl = searchKeys.slice(0, searchKeys.length - 1).join("/");
      let url = rootUrl + (queryUrl.length > 0 ? queryUrl + "/" : "");
      listSubDirs({
        url: url, 
        showParent: false,
      }).then((items: DirItemType[])=> {
        let arrVal = items.map((item : DirItemType) => {
          return { value: (queryUrl.length > 0 ? queryUrl + "/" : "") + item.title };
        });
        let filtered = arrVal.filter(item => item.value.startsWith(searchText));
        this.setState({options: arrVal, filteredOptions: filtered, level: searchLevel});
      });
    } else {
      let filtered = [...options.filter(item => item.value.startsWith(searchText))];
      this.setState({filteredOptions: filtered});
    }
  }

  addFolderSetting(){
    const {inputFolderPath, selectedType} = this.state;
    // clear current setting
    let settings = [...this.state.folderSettings.filter(item => item.path !== inputFolderPath)];

    if (selectedType !== null && selectedType.length > 0) {
      // add new setting    
      settings = settings.concat({
        path: inputFolderPath,
        type: selectedType
      });
    }
    this.setState({folderSettings : settings});
  }

  onSelect(value: any){
    this.setState({selectedType : value})
  }

  onChange(value: any){
    this.setState({inputFolderPath : value})
  }

  onFinish() {
    const { folderSettings } = this.state;
    saveSettings({folderSettings : folderSettings});
    message.success("Folder type settings saved.");
  }

  render() {
    const { filteredOptions, folderSettings } = this.state;
    const listTypedItems = function (type: any) {
      return folderSettings.filter(item => item.type === type)
        .map((item: FolderTypeSetting) => {
        return item.path;
      })
    }

    return(
    <div>
      <AutoComplete
        options={filteredOptions}
        style={{ width: 500 }}
        onSearch={this.onSearch.bind(this)}
        onSelect={this.onSearch.bind(this)}
        onChange={this.onChange.bind(this)}
        placeholder="input path here, use '/' for sub path."
      />
      <Select
        style={{ width: 120, marginLeft:5 }}
        onSelect={this.onSelect.bind(this)}
        options={[
          {value: FolderType.SWITCH_IMAGE},
          {value: FolderType.MARKDOWN},
          {value: FolderType.IMAGE},
          {value: FolderType.TEXT}]}
      />
      <Button onClick={this.addFolderSetting.bind(this)} type="primary" style={{ marginLeft:10 }}>
        Add
      </Button>
      <Button onClick={this.onFinish.bind(this)} type="primary" style={{ marginLeft:5 }}>Save</Button>
      <Divider orientation="left">{FolderType.SWITCH_IMAGE}</Divider>
      <List
        size="small"
        bordered
        dataSource={listTypedItems(FolderType.SWITCH_IMAGE)}
        renderItem={item => <List.Item>{item}</List.Item>}
      />
      <Divider orientation="left">{FolderType.MARKDOWN}</Divider>
      <List
        size="small"
        bordered
        dataSource={listTypedItems(FolderType.MARKDOWN)}
        renderItem={item => <List.Item>{item}</List.Item>}
      />
      <Divider orientation="left">{FolderType.IMAGE}</Divider>
      <List
        size="small"
        bordered
        dataSource={listTypedItems(FolderType.IMAGE)}
        renderItem={item => <List.Item>{item}</List.Item>}
      />
      <Divider orientation="left">{FolderType.TEXT}</Divider>
      <List
        size="small"
        bordered
        dataSource={listTypedItems(FolderType.TEXT)}
        renderItem={item => <List.Item>{item}</List.Item>}
      />
    </div>
    );
  }

}