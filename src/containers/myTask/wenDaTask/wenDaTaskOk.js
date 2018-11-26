import React, { Component } from 'react';
import { Icon, Button } from 'antd';
import { Link } from 'react-router-dom';

class WenDaTaskOk extends Component {
  render() {
    return(
      <div>
        <header className="tabTitle">
          <div className="return"><Link to="/myTask"><Icon type="left" theme="outlined" />返回</Link></div>
          已完成任务
        </header>
        <div style={{ padding: '0.3rem 0.3rem', backgroundColor: '#fff', paddingTop: '3rem' }}>
          {/* 循环 all-task div */}
          <div className="all-task">
            <div className="left-img">
              <img src={ require("../../../img/cbd.jpg") } alt=""/>
            </div>
            <div className="right">
              {/* top */}
              <div className="right-top">
                <span>
                  <Icon type="user" theme="outlined" />
                  用户名
                </span>
                <span>
                  2018-11-08 15:43:47
                </span>
              </div>
              {/* center */}
              <div className="right-center">
                <p>送精美礼品+5.85元额</p>
                <Button type="primary" disabled={true}>已完成</Button>
              </div>
              <div className="right-bottom">
                <p>
                  <span>垫资99.00元</span>
                  <span>平台返款</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default WenDaTaskOk
