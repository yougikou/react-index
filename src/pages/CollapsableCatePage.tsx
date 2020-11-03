import React from 'react';
import { Typography, Layout, Collapse } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import { CategoryType } from "../services/DataService";
import { listSubDirs, filterCategoryItems, DirItemType } from "../services/DirInfo";
import { GridLayout, GroupType } from "../components/LayoutWidgets";
import "./css/pages.css";

interface PropsType {
  url: string;
  category: CategoryType;
}

interface StateType {
  items: DirItemType[];
}

class CollapsableCatePage extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
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
    let groups: GroupType[] = [];
    if (subCategories && subCategories.length > 0) {
      subCategories.forEach((_subCate: string, _index: number) => {
        groups.push({
          subCate: _subCate,
          items: filterCategoryItems(items, _subCate)
        })
      })
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
              {groups.map((_group: GroupType, _index: number) => {
                return(
                  <Panel header={_group.subCate} key={_index}>
                    <GridLayout items={_group.items}/>
                  </Panel>
                );
              })}
          </Collapse>
          </div>
        </Content>
      </Layout>
    );
  }
}

export default CollapsableCatePage;