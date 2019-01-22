import React, { Component } from 'react';
import { Icon } from 'antd';
import { Link  } from 'react-router-dom';
import axios from 'axios';
import '../../../../component/apis';

class TongZhiChild extends Component {
  constructor(props) {
    super();
    this.state = {

    }
  }

  componentWillMount() {
    axios.post(global.constants.website+'/api/help/noticeDetail', {
      notice_id: this.props.location.state.data,
    },
    {
      headers: {AppAuthorization: localStorage.getItem("token")}
    })
    .then( res => {
      // console.log(res.data.data);
      let datas = res.data.data;
      this.setState({
        title: datas.title,                 //公告标题
        content: datas.content,             //公告内容
      })
      // console.log(this.state.content);
    })
    .catch(error => {
      console.log(error);
    });
  }

  render() {
    const { content,title } = this.state;
    return(
      <div>
        <header className="tabTitle">
          <div className="return"><Link to="/tongZhi"><Icon type="left" theme="outlined" />返回</Link></div>
          公告详情
        </header>
        <div className="tongZhiChild">
          <h3>{title}</h3>
          <div dangerouslySetInnerHTML={{ __html: content}}></div>      {/*react的识别html标签输出*/}
        </div>
      </div>
    )
  }
}

export default TongZhiChild
