import React from 'react';
import { Carousel, Typography, Pagination, Row, Col, Button } from 'antd';
import { listFiles, DirItemType } from '../../services/DirInfo'

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

interface PropsType {
  url: string;
}

class SwtichImage extends React.Component<PropsType, any> {
  carousel: any;

  constructor(props : Readonly<PropsType>) {
    super(props);
    this.state = {
      items: [],
      isLoading: true,
      current: 1,
      scale: 68
    };
  }

  componentDidMount() {
    listFiles({
      url: this.props.url + "blank/",
      filterStr: ".png,.jpg,.jpeg",
      showParent: false,
    }).then((items: DirItemType[])=> {
      this.setState({
        items: items,
        isLoading: false
      });
    });
  }
  
  render() {
    const { Title } = Typography;
    const { items, isLoading, current, scale } = this.state;
    if (isLoading) {
      return (
        <div>
          <Title>Page initializing...</Title>
        </div>
      );
    }
    if (items === undefined || items === null || items.length === 0) {
      return (
        <div>
          <Title>Introduction</Title>
          Please place two folder "blank", "filled" under the main folder.
          Swtich image should have the same name in the both folders.
        </div>
      );
    }
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    }; 
    return(
        <div>
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
                onClick={()=>{this.setState({scale: scale === 100 ? 72 : 100})}}> 
                { scale === 100 ? "100% Width" : "100% Height" } 
              </Button>
            </Col>
          </Row>
          <Carousel ref={ carousel => (this.carousel = carousel)}
            dotPosition="bottom"
            style={{ paddingTop: 10 }} 
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
    );
  }
}

export default SwtichImage;