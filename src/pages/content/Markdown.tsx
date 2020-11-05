import React from 'react';
import { Typography } from 'antd';
import ReactMarkdown from 'react-markdown';
import { retrieveFileContentInText } from '../../services/DirInfo'

interface PropsType {
  url: string;
}

interface StateType {
  markdownText: string;
  isLoading: boolean;
}

class Markdown extends React.Component<PropsType, StateType> {
  carousel: any;

  constructor(props : Readonly<PropsType>) {
    super(props);
    this.state = {
      markdownText: "",
      isLoading: true,
    };
  }

  componentDidMount() {
    retrieveFileContentInText(this.props.url + "index.md")
      .then((text)=> {
      this.setState({
        markdownText: text,
        isLoading: false
      });
    }).catch((err) => {
      this.setState({
        isLoading: false
      });
    });
  }
  
  render() {
    const { Title } = Typography;
    const { markdownText, isLoading } = this.state;
    if (isLoading) {
      return (
        <div className="site-layout-content-div">
          <Title>Page initializing...</Title>
        </div>
      );
    }
    if (markdownText.trim().length === 0) {
      return (
        <div className="site-layout-content-div">
          <Title>Introduction</Title>
          Please place "index.md" file under the main folder.
        </div>
      );
    }
    return (
      <div className="site-layout-content-div">
        <ReactMarkdown
          children={markdownText}
        />
      </div>
    );
  }
}

export default Markdown;