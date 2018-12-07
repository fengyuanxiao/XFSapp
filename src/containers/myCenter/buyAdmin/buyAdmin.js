import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';

class BuyAdmins extends Component {
  constructor() {
    super();
    this.state = {
      taobao: true,
      pinduoduo: false,
      jingdong: false
    }
  }
  render() {
    // const { taobao, pinduoduo, jingdong } = this.state;
    return(
      <div>
        <header className="tabTitle">
          <div className="return"><Link to="/myCenter"><Icon type="left" theme="outlined" />返回</Link></div>
          绑定买号
        </header>
        <div className="buyAdmin-box">
          <ul>
            {/* 绑定淘宝账号 */}
            <li>
              <Link to="/taobao">
                <div className="bind-list">
                  <div><img src={require("../../../img/taobao.png")} alt="淘宝图标"/><span>绑定淘宝账号</span></div>
                  <div><span>未绑定</span><img src={require("../../../img/jinru.png")} alt="进入"/></div>
                </div>
                <p className="bind-content">未通过</p>
              </Link>
            </li>
            {/* 绑定拼多多账号 */}
            <li>
              <Link to="/pinduoduo">
                <div className="bind-list">
                  <div><img src={require("../../../img/pinduoduo.png")} alt="拼多多图标"/><span>绑定拼多多账号</span></div>
                  <div><span>未绑定</span><img src={require("../../../img/jinru.png")} alt="进入"/></div>
                </div>
                {/* <p className="bind-content">123123</p> */}
              </Link>
            </li>
            {/* 绑定京东账号 */}
            <li>
              <Link to="/jingdong">
                <div className="bind-list">
                  <div><img src={require("../../../img/jingdong1.png")} alt="京东图标"/><span>绑定京东账号</span></div>
                  <div><span>未绑定</span><img src={require("../../../img/jinru.png")} alt="进入"/></div>
                </div>
                {/* <p className="bind-content">123123</p> */}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default BuyAdmins
