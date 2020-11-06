import React from 'react';
import { Typography, Layout, Collapse, List } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import { CategoryType } from "../services/DataService";
import { listSubDirs, filterCategoryItems, DirItemType } from "../services/DirInfo";
import { GridLayout } from "../components/LayoutWidgets";
import "./css/Pages.css";

interface IndexPagePropsType {
  url: string;
  category: CategoryType;
}

interface IndexPageStateType {
  url: string;
  category: CategoryType;
  items: DirItemType[];
}

class IndexPage extends React.Component<IndexPagePropsType, IndexPageStateType> {
  constructor(props: IndexPagePropsType) {
    super(props);
    this.state = {
      url: props.url,
      category: props.category,
      items: []
    };
  }

  componentDidMount(){
    const {url, category} = this.state;
    listSubDirs({
      url: url, 
      showParent: false,
      filterStr: category.filterStr
    }).then((items: DirItemType[])=> {
      this.setState({items: items});
    });
  }

  render() {
    const { Title } = Typography;
    const { Header, Content } = Layout;
    const { items } = this.state;
    return(
      <Layout className="site-layout">
        <Header className="site-layout-header">
          <Title level={1}>{this.state.category.name}</Title>
        </Header>
        <Content className="site-layout-content">
          <div className="site-layout-content-div">
          <List
            size="small"
            header={<h1>Directories</h1>}
            bordered
            dataSource={items}
            renderItem={item => <List.Item>{item.title}</List.Item>}
          />
          </div>
        </Content>
      </Layout>
    );
  }
}

interface CollapsablePagePropsType {
  url: string;
  category: CategoryType;
}

interface CollapsablePageStateType {
  items: DirItemType[];
}

class CollapsablePage extends React.Component<CollapsablePagePropsType, CollapsablePageStateType> {
  constructor(props: CollapsablePagePropsType) {
    super(props);
    this.state = {
      items: []
    };
  }

  componentDidMount(){
    const {url, category} = this.props;
    listSubDirs({
      url: url, 
      showParent: false,
      filterStr: category.filterStr
    }).then((items: DirItemType[])=> {
      this.setState({items: items});
    });
  }

  render() {
    const { Title } = Typography;
    const { Header, Content } = Layout;
    const { Panel } = Collapse;
    const { category } = this.props;
    const { items } = this.state;
    let subCategories = category.subCategoryStr?.split(",");
    let content;
    if (subCategories && subCategories.length > 0) {
      content = subCategories.map((_subCate: string, _index: number) => {
        return (<Panel header={_subCate} key={_index}>
          <GridLayout items={filterCategoryItems(items, _subCate)} category={category.name}/>
        </Panel>)
      })
    } else {
      content = <div style={{paddingLeft:10}}><GridLayout items={items} category={category.name}/></div>
    }

    return(
      <Layout className="site-layout">
        <Header className="site-layout-header">
          <Title level={1}>{this.props.category.name}</Title>
        </Header>
        <Content className="site-layout-content">
          <div className="site-layout-content-div">
          <Collapse 
            defaultActiveKey={[]}
            expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
            className="site-collapse-custom-collapse">
              {content}
          </Collapse>
          </div>
        </Content>
      </Layout>
    );
  }
}

export { IndexPage, CollapsablePage};