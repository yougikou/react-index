import React from 'react';
import { message, Table, Input, Button } from 'antd';
import { getSettings, saveSettings, CategoryType } from "../../services/DataService";
import "../css/Pages.css";

interface CategoryViewType {
  key?: number;
  name: string;
  filterStr: string;
  iconStr?: string;
  linkPath?: string;
  subCategoryStr?: string;
  isNew: boolean;
}

interface StateType {
  indexSeq: number,
  categoryView: CategoryViewType[];
}

export class RuleTabPanel extends React.Component<any, StateType> {

  constructor(props: Readonly<any>) {
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
        iconStr: _item.iconStr,
        subCategoryStr: _item.subCategoryStr,
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
    if (record.isNew) {
      this.setState({
        categoryView: tmp
      })
      return;
    }
    saveSettings({categories: tmp});
    message.success("Category rule deleted.");
    window.location.reload();
  }

  addNewRow() {
    const {indexSeq, categoryView} = this.state;
    let tmp = [...categoryView];
    this.setState({
      indexSeq: indexSeq + 1,
      categoryView: tmp.concat([{ key: indexSeq + 1, name: "", filterStr: "", iconStr: "", isNew: true }])
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
      _item.isNew = false;
    })
    if (cancelSaving) {
      return;
    }
    saveSettings({categories: tmp});
    message.success("Category rules saved.");
    window.location.reload();
  }

  render() {
    const { Column } = Table;
    const { categoryView } = this.state;
    const tableConfig = {
      expandable: { expandedRowRender: (record: any) => { 
        return(
          <span>
            Sub categories: delimited by comma
            <Input value={record.subCategoryStr} onChange={(e)=>this.handleInputChange(e, "subCategoryStr", record)} />
          </span>
          
        );
      }}
    }

    return(
      <div>
        <Button onClick={() => this.addNewRow()} type="primary" style={{ marginBottom: 16, marginRight:10 }}>
          Add New
        </Button>
        <Button type="primary" onClick={()=> this.onFinish()}>Save</Button>
        <Table 
          {... tableConfig} 
          dataSource={ categoryView }>
          <Column title="Category name" dataIndex="name" key="name"
            render={(text: any, record:CategoryViewType)=>{
              return(<Input value={record.name} onChange={(e)=>this.handleInputChange(e, "name", record)} />);
            }} />
          <Column title="Filter string" dataIndex="filterStr" key="filterStr"
            render={(text: any, record:CategoryViewType)=>{
              return(<Input value={record.filterStr} onChange={(e)=>this.handleInputChange(e, "filterStr", record)}  />);
            }} />
          <Column title="Icon string" dataIndex="IconStr" key="IconStr"
            render={(text: any, record:CategoryViewType)=>{
              return(<Input value={record.iconStr} onChange={(e)=>this.handleInputChange(e, "iconStr", record)}  />);
            }} />
          <Column title="Action" dataIndex="action" render={(text: any, record:CategoryViewType)=>{
            return(<Button type="dashed" onClick={()=> this.deleteCurrentRow(record)}>Delete</Button>);
          }} />
        </Table>
      </div>
    );
  }
}
