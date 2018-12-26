import React,{ Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon, Input, message } from 'antd';
import axios from 'axios';
import copy from 'copy-to-clipboard';             //点击按钮拷贝

import './tuijian.css';

class TuiJian extends Component {
  constructor() {
    super();
    this.state= {
      placeholder: "http://m.xhx2018.com/user/user/download"
    }
  }

  componentWillMount() {
    axios.get('/api/index/invite', {
      headers: {AppAuthorization: localStorage.getItem("token")}        //post 方法传 token
    })
    .then( res => {
      let datas = res.data.data;
      this.setState({
        YQcode: datas.code,
        money: datas.total_prize,
        use_num: datas.use_num,
        active_num: datas.active_num,
      })
      console.log(res.data.data);
    })
    .catch(function(error) {
      console.log(error);
    });
  }

  // 点击复制APP下载链接
  cloneBtn = (e) => {
    copy(this.state.placeholder);        //点击按钮拷贝
    message.success('复制成功，如果失败，请手动复制。');
  }

  // 复制邀请码按钮
  copyYQcode = () => {
    copy(this.state.YQcode);             //点击按钮拷贝
    message.success('复制成功，如果失败，请手动复制。');
  }

  render() {
    const { active_num, YQcode, money, use_num } = this.state;
    return(
      <div style={{ backgroundColor: '#fb2' }}>
        <header className="tabTitle">
          <div className="return"><Link to="/myCenter"><Icon type="left" theme="outlined" />返回</Link></div>
          邀请有奖
        </header>
        <img className="top-img" src={ require("../../../img/headerImg.png") } alt="topImg" />
        <div className="links-list">
          <div className="links-list-top">
            <img src={ require("../../../img/a2.png") } alt="aa" />
          </div>
          <div className="zhuanshuCode">
            你的专属邀请码：<span>{ YQcode }</span>
            <button onClick={ this.copyYQcode }>点击复制</button>
          </div>
          <Input disabled={true} style={{ width: '100%', fontSize: '1rem' }} placeholder={ this.state.placeholder } />
          <button onClick={ this.cloneBtn } className="download-btn">点击复制APP下载链接</button>
          <ul>
            <li>
              <span>累计奖励</span>
              <span>{ money }金</span>
            </li>
            <li>
              <span>我邀请的用户</span>
              <span>{ use_num }个</span>
            </li>
            <li>
              <span>已激活的用户</span>
              <span>{ active_num }个</span>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default TuiJian
