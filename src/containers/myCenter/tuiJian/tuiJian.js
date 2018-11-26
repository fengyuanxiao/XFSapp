import React,{ Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon, Input } from 'antd';

import './tuijian.css';

class TuiJian extends Component {
  constructor() {
    super();
    this.state= {
      YQcode: 'BH7F2Y',
      placeholder: "http://m.xhx2018.com/user/user/download"
    }
    this.copyYQcode = this.copyYQcode.bind(this);
  }

  // 点击复制APP下载链接
  cloneBtn = (e) => {
    // console.log(e);
    console.log(this.state.placeholder);
  }

  // 复制邀请码按钮
  copyYQcode = () => {
    console.log(this.state.YQcode);
    // console.log(123);
  }

  render() {
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
            你的专属邀请码：<span>{ this.state.YQcode }</span>
            <button onClick={ this.copyYQcode }>点击复制</button>
          </div>
          <Input disabled={true} style={{ width: '100%', fontSize: '1rem' }} placeholder={ this.state.placeholder } />
          <button onClick={ this.cloneBtn } className="download-btn">点击复制APP下载链接</button>
          <ul>
            <li>
              <span>累计奖励</span>
              <span>金</span>
            </li>
            <li>
              <span>我邀请的用户</span>
              <span>0个</span>
            </li>
            <li>
              <span>已激活的用户</span>
              <span>10个</span>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default TuiJian
