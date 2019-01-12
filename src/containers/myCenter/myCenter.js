import React, { Component } from 'react';
import { Icon, Badge } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';    //ajax

import './myCenter.css';
import RouteTabComponent from '../../component/routeTab/routeTab';  //tabs

class MyCenterPage extends Component {
  constructor() {
    super();
    this.state = {

    }
  }

  // 进入个人中心页面 调用ajax 获取数据
  componentWillMount() {
    axios.get('/api/index/index',{headers: {AppAuthorization: localStorage.getItem("token")}})   //传入唯一标识
    .then(response => {
      // console.log(response.data);
      let data_s = response.data.data;
      this.setState({
        complain_count: data_s.complain_count,            //	申诉记录数
        total_commission: data_s.total_commission,        //  累计佣金收益值
        money_account: data_s.money_account,              //  本金总计值
        commission_account: data_s.commission_account,    //  佣金总计值
        tbbind_count: data_s.tbbind_count,                //  是否有绑定买号
      })
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

  render() {
    const { complain_count, total_commission, money_account, commission_account, tbbind_count } = this.state;
    return(
      <div>
        {/* top */}
        <div className="myCenter-top">
          <p>累计佣金收益</p>
          <p>{ total_commission }元</p>
          <div className="myCenter-top-button">
            <div>
              <p>{ money_account }元</p>
              <p>本金总计</p>
            </div>
            <div>
              <p>{ commission_account }元</p>
              <p>佣金收益</p>
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
