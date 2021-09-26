import React from 'react';
import { Divider, Button, Select, List, Tree, Row, Col } from 'antd';
import { listSubDirs, DirItemType } from "../../services/DirInfo";
import { getSettings, saveSettings, FolderTypeSetting, ContentType } from "../../services/DataService";
import "../css/Pages.css";

interface FolderTreeNode {
  title: string;
  key: string;
  disabled?: boolean;
  disableCheckbox?: boolean;
  checkable?: boolean;
  isLeaf?: boolean;
  children: FolderTreeNode[];
}

interface StateType {
  options: {value: string}[];
  level: number;
  selectedType?: ContentType;
  inputFolderPaths: string[];
  folderSettings: FolderTypeSetting[];
  folderTree: FolderTreeNode;
  version?: number;
}

export class FolderTabPanel extends React.Component<any, StateType> {

  constructor(props: Readonly<any>) {
    super(props);
    this.state = {
        options: [],
        level: 0,
        inputFolderPaths: [],
        selectedType: undefined,
        folderSettings: [],
        folderTree: {
          title: "Root",
          key: "",
          checkable: false,
          isLeaf: false,
          children: []
        },
        version: 0
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

      let treeNodes = items.map((item : DirItemType) => {
        return { 
          title: item.title,
          key: item.pathString,
          disabled: false,
          disableCheckbox: false,
          isLeaf: true,
          children: []
        };
      });

      this.setState({
        options: arrVal, 
        level: 1,
        folderSettings: folderSettings,
        folderTree: {
          title: "Root",
          key: rootUrl,
          checkable: false,
          isLeaf: false,
          children: treeNodes
        }});
    });
  }

  addFolderSetting(){
    const {inputFolderPaths, selectedType, folderSettings} = this.state;
    let settings = [...folderSettings];
    for (let i = 0; i < inputFolderPaths.length; i++) {
      const path = inputFolderPaths[i];
      // clear current setting
      settings = [...settings.filter(item => item.path !== path)];

      if (selectedType !== undefined) {
        // add new setting    
        settings = settings.concat({
          path: path,
          type: selectedType
        });
      }
    }

    this.setState({folderSettings : settings});
    saveSettings({folderSettings : settings});
    window.location.reload();
  }

  onTypeSelect(value: any){
    this.setState({selectedType : value})
  }

  onPathCheck (checked: React.Key[] | { checked: React.Key[]; halfChecked: React.Key[]; }, info: any) {
    const {inputFolderPaths} = this.state;
    if (inputFolderPaths.indexOf(info.node.key) < 0) {
      let clone = [...inputFolderPaths].concat(info.node.key)
      this.setState({inputFolderPaths : clone});
    }
  }

  render() {
    const { folderSettings, folderTree } = this.state;
    const listTypedItems = function (type: any) {
      return folderSettings.filter(item => item.type === type)
        .map((item: FolderTypeSetting) => {
        return item.path;
      })
    }

    return(
      <div>    
        <Select
          style={{ width: 120, marginLeft:5 }}
          onSelect={this.onTypeSelect.bind(this)}
          options={[
            {value: ContentType.SWITCH_IMAGE},
            {value: ContentType.MARKDOWN},
            {value: ContentType.IMAGE},
            {value: ContentType.TEXT}]}
        />
        <Button onClick={this.addFolderSetting.bind(this)} type="primary" style={{ marginLeft:10 }}>
          Add
        </Button>
        <Row>
          <Col span={12}>
            <Tree
              checkable
              defaultExpandedKeys={['0-0-0', '0-0-1']}
              defaultSelectedKeys={['0-0-0', '0-0-1']}
              defaultCheckedKeys={['0-0-0', '0-0-1']}
              onCheck={this.onPathCheck.bind(this)}
              treeData={[folderTree]}
            />
          </Col>
          <Col span={12}>
            <Divider orientation="left">{ContentType.SWITCH_IMAGE}</Divider>
            <List
              size="small"
              bordered
              dataSource={listTypedItems(ContentType.SWITCH_IMAGE)}
              renderItem={item => <List.Item>{item}</List.Item>}
            />
            <Divider orientation="left">{ContentType.MARKDOWN}</Divider>
            <List
              size="small"
              bordered
              dataSource={listTypedItems(ContentType.MARKDOWN)}
              renderItem={item => <List.Item>{item}</List.Item>}
            />
            <Divider orientation="left">{ContentType.IMAGE}</Divider>
            <List
              size="small"
              bordered
              dataSource={listTypedItems(ContentType.IMAGE)}
              renderItem={item => <List.Item>{item}</List.Item>}
            />
            <Divider orientation="left">{ContentType.TEXT}</Divider>
            <List
              size="small"
              bordered
              dataSource={listTypedItems(ContentType.TEXT)}
              renderItem={item => <List.Item>{item}</List.Item>}
            />
           </Col>
        </Row>
     </div>
    );
  }
}