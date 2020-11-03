import React from 'react';
import { Typography, Layout, List } from 'antd';
import { CategoryType } from "../services/DataService";
import { listSubDirs, DirItemType } from "../services/DirInfo";
import "./css/pages.css";

interface PropsType {
  url: string;
  category: CategoryType;
}

interface StateType {
  url: string;
  category: CategoryType;
  items: DirItemType[];
}


class IndexPage extends React.Component<PropsType, StateType> {
  constructor(props: PropsType) {
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

export default IndexPage;