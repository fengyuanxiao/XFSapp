import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';
import axios from 'axios';    //ajax

const token = localStorage.getItem("token");

class BuyAdmins extends Component {
  constructor() {
    super();
    this.state = {
      taobao: false,
      pinduoduo: false,
      jingdong: false
    }
  }

  componentWillMount() {
    // 在此调用ajax 获取绑定买号列表
    axios.get('/api/index/tbBind',{headers: {AppAuthorization: token}})   //传入唯一标识
    .then(response => {
      console.log(response.data.data);
      // 获取绑定买号数据
      this.setState({
        jd_bind: response.data.data.jd_bind.nickname,                 //京东用户名
        jd_status: response.data.data.jd_bind.bind_status,            //京东绑定状态
        pdd_bind: response.data.data.pdd_bind.nickname,               //拼多多用户名
        pdd_status: response.data.data.pdd_bind.bind_status,          //拼多多绑定状态
        taobao_bind: response.data.data.taobao_bind.nickname,         //淘宝用户名
        taobao_status: response.data.data.taobao_bind.bind_status,    //淘宝绑定状态
      })
    })
    .catch(error => {
      console.log(error);
    });
  }

  render() {
    const { jd_bind, jd_status, pdd_bind, pdd_status, taobao_bind, taobao_status } = this.state;
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
                  <div><img src={require("../../../img/taobao.png")} alt="淘宝图标"/><span>{ taobao_bind }</span></div>
                  <div><span>{ taobao_status }</span><img src={require("../../../img/jinru.png")} alt="进入"/></div>
                </div>
                <p className="bind-content"></p>
              </Link>
            </li>
            {/* 绑定拼多多账号 */}
            <li>
              <Link to="/pinduoduo">
                <div className="bind-list">
                  <div><img src={require("../../../img/pinduoduo.png")} alt="拼多多图标"/><span>{ pdd_bind }</span></div>
                  <div><span>{ pdd_status }</span><img src={require("../../../img/jinru.png")} alt="进入"/></div>
                </div>
                <p className="bind-content"></p>
              </Link>
            </li>
            {/* 绑定京东账号 */}
            <li>
              <Link to="/jingdong">
                <div className="bind-list">
                  <div><img src={require("../../../img/jingdong1.png")} alt="京东图标"/><span>{ jd_bind }</span></div>
                  <div><span>{ jd_status }</span><img src={require("../../../img/jinru.png")} alt="进入"/></div>
                </div>
                <p className="bind-content"></p>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default BuyAdmins
