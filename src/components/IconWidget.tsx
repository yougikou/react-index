import React from 'react';
import Icon from '@ant-design/icons';
import "./css/IconWidget.css";

export interface propsType {
  imgUrl: string
}

function ImageSvg (props: propsType){
  return(
    <svg width="3em" height="3em" fill="currentColor" viewBox="0 0 1024 1024">
      <image href={props.imgUrl} width="256" height="256"/>
    </svg>
  );
}

function ImageIcon(props: propsType) {
  return(
    <div className="custom-icon">
      <Icon style={{ fontSize: '32px' }}>
        <ImageSvg imgUrl={props.imgUrl}/>
      </Icon>
    </div>
  );  
}

export { ImageIcon };