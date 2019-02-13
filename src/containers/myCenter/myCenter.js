import React, { Component } from 'react';
import { Icon, Badge,message,Button } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';    //ajax

import './myCenter.css';
import '../../component/apis';
import RouteTabComponent from '../../component/routeTab/routeTab';  //tabs

class MyCenterPage extends Component {
  constructor() {
    super();
    this.state = {
      allMoney: 0,      //可提现总金额
    }
  }

  // 进入个人中心页面 调用ajax 获取数据
  componentWillMount() {
    let this_ = this;
    axios.get(global.constants.website+'/api/index/index',{headers: {AppAuthorization: localStorage.getItem("token")}})   //传入唯一标识
    .then(response => {
      let data_s = response.data.data;
      console.log(data_s);
      if ( response.data.status === "_0001" ) {
          message.success(response.data.msg, successSkip => {
          this_.props.history.push("/");
        })
      } else {
        this.setState({
          complain_count: data_s.complain_count,                    //	申诉记录数
          total_commission: Number(data_s.total_commission),        //  可提现总金额
          money_account: data_s.money_account,                      //  本金总计值
          commission_account: data_s.commission_account,            //  佣金总计值
          tbbind_count: data_s.tbbind_count,                        //  是否有绑定买号
        })
      }
    })
    .catch(error => {
      console.log(error);
    });
  }
  // 处理内存泄露
  componentWillUnmount = () => {
    this.setState = (state,callback)=>{
      return;
    };
  }

  // 本金转到提现金额
  benMoney = () => {
    let states = this.state;
    axios.post(global.constants.website+'/api/index/moneywithdraw', {
      type: 1,                            //1代表本金转入
      money: Number(states.money_account),        //转入金额
    },
    {
      headers: {AppAuthorization: localStorage.getItem("token")}        //post 方法传 token
    })
    .then(response => {
      let data_s = response.data;
      console.log(data_s);
      if ( data_s.status ) {
        this.setState({
          total_commission: states.total_commission + Number(states.money_account),
          money_account: 0,
        })
      } else {
        message.warning('暂时没有金额转入。');
      }
    })
    .catch(error => {
      console.log(error);
    });
  }
  // 佣金转到提现金额
  yongMoney = () => {
    let states = this.state;
    if ( states.commission_account < 10 ) {
      message.warning('佣金金额高于10元即可转入到提现金额');
    } else {
      axios.post(global.constants.website+'/api/index/moneywithdraw', {
        type: 2,                                    //1代表本金转入
        money: Number(states.commission_account),        //转入金额
      },
      {
        headers: {AppAuthorization: localStorage.getItem("token")}        //post 方法传 token
      })
      .then(response => {
        let data_s = response.data;
        console.log(data_s);
        if ( data_s.status ) {
          this.setState({
            total_commission: states.total_commission + Number(states.commission_account),
            commission_account: 0,
          })
        } else {
          message.warning('暂时没有金额转入。');
        }
      })
      .catch(error => {
        console.log(error);
      });
    }
  }

  // , tbbind_count
  render() {
    const { complain_count, total_commission, money_account, commission_account } = this.state;
    return(
      <div>
        {/* top */}
        <div className="myCenter-top">
          <p>可提现总余额</p>
          <p>{ total_commission }元</p>
          <div className="myCenter-top-button">
            <div>
              <p>{ money_account }元</p>
              <p>本金余额</p>
              <Button onClick={ this.benMoney }>转入到提现</Button>
            </div>
            <div>
              <p>{ commission_account }元</p>
              <p>佣金余额</p>
              <Button onClick={ this.yongMoney }>转入到提现</Button>
            </div>
          </div>
        </div>
        {/* 提现 账单 */}
        <div>
          <div className="myCenter-tixian">
            <div>
              <Link to="/cash">
                <Icon style={{ fontSize: '1.2rem', paddingRight: '0.3rem' }} type="inbox" />
                <span>提现</span>
              </Link>
            </div>
            <div>
              <Link to="/commission">
                <Icon style={{ fontSize: '1.2rem', paddingRight: '0.3rem' }} type="dollar" />
                <span>账单</span>
              </Link>
            </div>
          </div>
        </div>
        {/* 个人中心列表 */}
        <ul style={{ marginBottom: '3.7rem' }}>
          <li>
            <Link className="myCenter-A" to="/buyAdmin">
              <div>
                <Icon type="user" />
                <span>买号管理</span>
              </div>
              <div>
                <Icon type="right" />
              </div>
            </Link>
          </li>
          <li>
            <Link className="myCenter-A" to="/personal">
              <div>
                <Icon type="smile" />
                <span>个人信息</span>
              </div>
              <div>
                <Icon type="right" />
              </div>
            </Link>
          </li>
          <li>
            <Link className="myCenter-A" to="/tuiJian">
              <div>
                <Icon type="like" />
                <span>推荐有奖</span>
              </div>
              <div>
                <Icon type="right" />
              </div>
            </Link>
          </li>
          <li>
            <Link className="myCenter-A" to="/allCenter">
              <div>
                <Icon type="message" />
                <span>客服中心</span>
              </div>
              <div>
                <Icon type="right" />
              </div>
            </Link>
          </li>
          <li>
            <Link className="myCenter-A" to="/shenSu">
              <div>
                <Icon type="dashboard" />
                <span>申诉记录</span>
                <Badge count={complain_count} style={{ marginLeft: '0.3rem', backgroundColor:'red' }} />
              </div>
              <div>
                <Icon type="right" />
              </div>
            </Link>
          </li>
          <li>
            <Link className="myCenter-A" to="/tongZhi">
              <div>
                <Icon type="cloud-download" />
                <span>通知公告</span>
              </div>
              <div>
                <Icon type="right" />
              </div>
            </Link>
          </li>
        </ul>


        {/* tabs */}
        <RouteTabComponent />
      </div>
    )
  }
}

export default MyCenterPage
