import React from 'react';
import { message, Table, Input, Button } from 'antd';
import { getSettings, saveSettings, CategoryType } from "../../services/DataService";
import "../css/pages.css";

interface CategoryViewType {
  key?: number;
  name: string;
  filterStr: string;
  iconStr?: string;
  linkPath?: string;
  isNew: boolean;
}

interface StateType {
  indexSeq: number,
  categoryView: CategoryViewType[];
}

export class RuleTabPanel extends React.Component<any, StateType> {

  constructor(props: any) {
    super(props);
    this.state = {
      indexSeq: -1,
      categoryView: [],
    };
  }

  componentDidMount(){
    const {categories} = getSettings();
    const {indexSeq} = this.state;
    let loopIndex = indexSeq;
    let categoryView:CategoryViewType[] = [];
    categories.forEach((_item: CategoryType, _index: number)=>{
      categoryView.push({
        key: loopIndex + 1,
        name: _item.name,
        filterStr: _item.filterStr,
        isNew: false
      });
      loopIndex++;
    })
    this.setState({
      indexSeq: loopIndex,
      categoryView: categoryView
    })
  }

  deleteCurrentRow(record: CategoryViewType) {
    let tmp = [...this.state.categoryView];
    let index = tmp.indexOf(record);
    if (index > -1) {
      tmp.splice(index, 1);
    }
    saveSettings({categories: tmp});
    message.success("Category rule deleted.");
    window.location.reload(false);
  }

  addNewRow() {
    const {indexSeq, categoryView} = this.state;
    let tmp = [...categoryView];
    this.setState({
      indexSeq: indexSeq + 1,
      categoryView: tmp.concat([{ key: indexSeq + 1, name: "", filterStr: "", isNew: true }])
    })
  }

  handleInputChange(e: any, key: string, record:CategoryViewType) {
    let tmp = [...this.state.categoryView];
    tmp.forEach((_item: any, _index: number)=>{
      if (_item.key === record.key) {
        _item[key] = e.target.value;
      }
    })
    this.setState({
      categoryView: tmp
    });
  }

  onFinish() {
    let tmp = [...this.state.categoryView];
    let cancelSaving = false;
    tmp.forEach((_item: CategoryViewType, _index: number)=>{
      if (_item.isNew && 
        (_item.name.length === 0 || _item.filterStr.length === 0)) {
          message.error("name and filter string is required");
          cancelSaving = true;
      }
      delete _item.key;
    })
    if (cancelSaving) {
      return;
    }
    saveSettings({categories: tmp});
    message.success("Category rules saved.");
    window.location.reload(false);
  }

  render() {
    const { Column } = Table;
    const { categoryView } = this.state;

    return(
      <div>
        <Button onClick={() => this.addNewRow()} type="primary" style={{ marginBottom: 16, marginRight:10 }}>
          Add New
        </Button>
        <Button type="primary" onClick={()=> this.onFinish()}>Save</Button>
        <Table dataSource={ categoryView }>
          <Column title="Category name" dataIndex="name" key="name"
            render={(text: any, record:CategoryViewType)=>{
              return(<Input readOnly={!record.isNew} bordered={record.isNew} value={record.name} onChange={(e)=>this.handleInputChange(e, "name", record)} />);
            }} />
          <Column title="Filter string" dataIndex="filterStr" key="filterStr"
            render={(text: any, record:CategoryViewType)=>{
              return(<Input readOnly={!record.isNew} bordered={record.isNew} value={record.filterStr} onChange={(e)=>this.handleInputChange(e, "filterStr", record)}  />);
            }} />
          <Column title="Action" dataIndex="action" render={(text: any, record:CategoryViewType)=>{
            return(<Button type="dashed" onClick={()=> this.deleteCurrentRow(record)}>Delete</Button>);
          }} />
        </Table>
      </div>
    );
  }
}
