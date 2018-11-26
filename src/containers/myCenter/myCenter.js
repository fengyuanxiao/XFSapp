import React, { Component } from 'react';
import { Icon, Badge } from 'antd';
import { Link } from 'react-router-dom';

import './myCenter.css';
import RouteTabComponent from '../../component/routeTab/routeTab';  //tabs

class MyCenterPage extends Component {
  render() {
    return(
      <div>
        {/* top */}
        <div className="myCenter-top">
          <p>累计佣金收益</p>
          <p>3.00</p>
          <div className="myCenter-top-button">
            <div>
              <p>0.00</p>
              <p>本金总计</p>
            </div>
            <div>
              <p>-9.00</p>
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
                <Badge count={2} style={{ marginLeft: '0.3rem', backgroundColor:'red' }} />
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
