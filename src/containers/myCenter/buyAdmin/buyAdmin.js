import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';
import axios from 'axios';    //ajax

class BuyAdmins extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      taobao: false,
      pinduoduo: false,
      jingdong: false
    }
  }

  componentWillMount() {
    // 在此调用ajax 获取绑定买号列表
    axios.get('/api/index/tbBind',{headers: {AppAuthorization: localStorage.getItem("token")}})   //传入唯一标识
    .then(response => {
      let responses = response.data.data;
      console.log(response.data.data);
      // 获取绑定买号数据
      this.setState({
        datas_Status: response.data.data,                    //获取审核状态 判断是否点击进入平台对应的绑定买号

        jd_bind: responses.jd_bind.nickname,                 //京东用户名
        jd_status: responses.jd_bind.bind_status,            //京东绑定状态  文字显示
        jd_remark: responses.jd_bind.remark,                 //京东未通过留言
        jd__status: responses.jd_bind.status,                //京东绑定状态 数字显示
        pdd_bind: responses.pdd_bind.nickname,               //拼多多用户名
        pdd_status: responses.pdd_bind.bind_status,          //拼多多绑定状态 文字显示
        pdd_remark: responses.pdd_bind.remark,               //拼多多未通过留言
        pdd__status: responses.pdd_bind.status,              //拼多多绑定状态 数字显示
        taobao_bind: responses.taobao_bind.nickname,         //淘宝用户名
        taobao_status: responses.taobao_bind.bind_status,    //淘宝绑定状态  文字显示
        taobao_remark: responses.taobao_bind.remark,         //淘宝未通过留言
        taobao__status: responses.taobao_bind.status,        //淘宝绑定状态  数字显示
        wph_bind: responses.wph_bind.nickname,               //唯品会用户名
        wph_status: responses.wph_bind.bind_status,          //唯品会绑定状态  文字显示
        wph_remark: responses.wph_bind.remark,               //唯品会未通过留言
        wph__status: responses.wph_bind.status,              //唯品会绑定状态  数字显示
      })
    })
    .catch(error => {
      console.log(error);
    });
  }

  // 点击 进入修改淘宝买号
  taobaoInto = () => {
    // 存入接口放回的数据json
    let datas_Status = this.state.datas_Status;
    // console.log(datas_Status);
    if ( this.state.taobao__status === 0 ) {
      this.props.history.push("/taobao")
    } else if ( this.state.taobao__status === 3 ) {
      this.props.history.push({pathname: "/correct_taobao", state: {data: datas_Status.taobao_bind.id}})
    } else {
      // console.log(123);
    }
  }

  // 点击 进入修改拼多多买号
  pinduoduoInto = () => {
    // 存入接口放回的数据json
    let datas_Status = this.state.datas_Status;
    if ( this.state.pdd__status === 0 ) {
      this.props.history.push("/pinduoduo")
    } else if ( this.state.pdd__status === 3 ) {
      this.props.history.push({pathname: "/correct_pinduoduo", state: {data: datas_Status.pdd_bind.id}})
    } else {
      // console.log(123);
    }
  }

  // 点击 进入修改京东买号
  jingdongInto = () => {
    // 存入接口放回的数据json
    let datas_Status = this.state.datas_Status;
    if ( this.state.jd__status === 0 ) {
      this.props.history.push("/jingdong")
    } else if ( this.state.jd__status === 3 ) {
      this.props.history.push({pathname: "/correct_jingdong", state: {data: datas_Status.jd_bind.id}})
    } else {
      // console.log(123);
    }
  }

  // 点击 进入修改京东买号
  weipinhuiInto = () => {
    // 存入接口放回的数据json
    let datas_Status = this.state.datas_Status;
    if ( this.state.wph__status === 0 ) {
      this.props.history.push("/weipinhui")
    } else if ( this.state.wph__status === 3 ) {
      this.props.history.push({pathname: "/correct_weipinhui", state: {data: datas_Status.wph_bind.id}})
    } else {
      // console.log(123);
    }
  }

  render() {
    const { jd_bind, jd_status, jd_remark, pdd_bind, pdd_status, pdd_remark, taobao_bind, taobao_status, taobao_remark, wph_bind, wph_status, wph_remark } = this.state;
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
              {/* <Link to="/taobao"> */}
              {/* <div className="bind-list" onClick={ ()=>this.taobaoInto(item) }> */}
              <div className="bind-list" onClick={ this.taobaoInto }>
                <div><img src={require("../../../img/taobao.png")} alt="淘宝图标"/><span>{ taobao_bind }</span></div>
                <div><span>{ taobao_status }</span><img src={require("../../../img/jinru.png")} alt="进入"/></div>
              </div>
              <p className="bind-content">{ taobao_remark }</p>
              {/* </Link> */}
            </li>
            {/* 绑定拼多多账号 */}
            <li>
              <div className="bind-list" onClick={ this.pinduoduoInto }>
                <div><img src={require("../../../img/pinduoduo.png")} alt="拼多多图标"/><span>{ pdd_bind }</span></div>
                <div><span>{ pdd_status }</span><img src={require("../../../img/jinru.png")} alt="进入"/></div>
              </div>
              <p className="bind-content">{ pdd_remark }</p>
            </li>
            {/* 绑定京东账号 */}
            <li>
              <div className="bind-list" onClick={ this.jingdongInto }>
                <div><img src={require("../../../img/jingdong1.png")} alt="京东图标"/><span>{ jd_bind }</span></div>
                <div><span>{ jd_status }</span><img src={require("../../../img/jinru.png")} alt="进入"/></div>
              </div>
              <p className="bind-content">{ jd_remark }</p>
            </li>
            {/* 唯品会账号 */}
            <li>
              <div className="bind-list" onClick={ this.weipinhuiInto }>
                <div><img src={require("../../../img/weipinhui.png")} alt="唯品会图标"/><span>{ wph_bind }</span></div>
                <div><span>{ wph_status }</span><img src={require("../../../img/jinru.png")} alt="进入"/></div>
              </div>
              <p className="bind-content">{ wph_remark }</p>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default BuyAdmins
