import React from 'react';
import { Layout, Carousel, Typography, Pagination, Row, Col, Button } from 'antd';
import { listFiles, DirItemType } from '../services/DirInfo'
import "./css/pages.css";

class ImageSwtichSection extends React.Component<any, any> {
  constructor(props : Readonly<any>) {
    super(props);
    
    this.state = {
      link: props.link,
      replaceLink: props.replaceLink,
      scale: props.scale,
      error: false
    };
  }

  static getDerivedStateFromProps(nextProps: any, prevState: any) {
    if (nextProps.scale !== prevState.scale) {
      return {
        scale: nextProps.scale
      };
    }
    return null;
  }

  
  imageClicked() {
    this.setState({
      link: this.state.replaceLink,
      replaceLink: this.state.link
    });
  }

  render() {
    const { link, error } = this.state;
    if (error) {
      return(<h1>{link} <br/> Image file load error</h1>)
    }
    return(
      <img src={ link } alt="" 
        style={{ width: this.state.scale + '%' }}
        onClick={this.imageClicked.bind(this)}
        onError={()=>{this.setState({error: true})}}/>
    );
  }
}

class SwtichImagePage extends React.Component<any, any> {
  carousel: any;

  constructor(props : Readonly<any>) {
    super(props);
    this.state = {
      url: props.url,
      title: props.title,
      items: [],
      isLoading: true,
      current: 1,
      scale: 68
    };
  }

  componentDidMount() {
    listFiles({
      url: this.state.url + "blank/",
      showParent: false,
    }).then((items: DirItemType[])=> {
      this.setState({
        items: items,
        isLoading: false
      });
    });
  }
  
  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    const { Title } = Typography;
    const { Header, Content } = Layout;
    const { items, isLoading, current, scale } = this.state;
    if (isLoading) {
      return (
        <div>
          <Title>Page initializing...</Title>
        </div>
      );
    }
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      appendDots: (dots: any) => <ul>test</ul>,
      slidesToShow: 1,
      slidesToScroll: 1
    }; 
    return(
      <Layout className="site-layout">
        <Header className="site-layout-header">
          <Title level={2}>{this.props.title}</Title>
        </Header>
        <Content className="site-layout-content">
        <div className="site-layout-content-div">
          <Row>
            <Col>
              <Pagination 
                showQuickJumper 
                pageSize = { 1 }
                current = { current }
                total = { items.length }
                onChange = {(current: any) => { this.carousel.goTo(current - 1) }} />
            </Col>
            <Col>
              <Button type="primary" 
                onClick={()=>{this.setState({scale: scale === 100 ? 60 : 100})}}> 
                { scale === 100 ? "100% Width" : "100% Height" } 
              </Button>
            </Col>
          </Row>
          <Carousel ref={ carousel => (this.carousel = carousel) }
            dotPosition="bottom" 
            afterChange={(current: any) => {this.setState({current: current + 1})}}
            {...settings}>
            {items.map((item: DirItemType, index: any) => {
              return(
                <ImageSwtichSection 
                  key = { index }
                  link={ item.pathString } 
                  replaceLink={ item.pathString.replace("blank", "filled")}
                  scale= { scale } />
              );
            })}
          </Carousel>
        </div>
        </Content>
      </Layout>
    );
  }
}

export default SwtichImagePage;