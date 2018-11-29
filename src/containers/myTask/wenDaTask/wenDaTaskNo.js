import React, { Component } from 'react';
import { Icon, Button } from 'antd';
import { Link } from 'react-router-dom';
// import { Tabs, WhiteSpace } from 'antd-mobile';
import Tabs from 'antd-mobile/lib/tabs';
import WhiteSpace from 'antd-mobile/lib/white-space';

import '../dianFuTask/dianFuTask.css';

const tabs = [
  { title: '商家审核' },
  { title: '提交问答..' },
  { title: '待返佣金' },
  { title: '所有' },
];

class WenDaTaskNo extends Component {
  render() {
    return(
      <div>
        <header className="tabTitle">
          <div className="return"><Link to="/myTask"><Icon type="left" theme="outlined" />返回</Link></div>
          未完成任务
        </header>
        <WhiteSpace style={{ paddingTop: '3rem' }} />
        <Tabs tabs={tabs} initialPage={2} animated={false} useOnPan={false}>
          {/* 待操作 */}
          <div style={{ padding: '0.3rem 0.3rem', backgroundColor: '#fff' }}>
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
                  <Button type="primary"><Link to="/taskStateChild">待操作</Link></Button>
                </div>
                <div className="right-bottom">
                  <p>
                    <span>垫资99.00元</span>
                    <span>平台返款</span>
                  </p>
                  <span>请在11-08 17:43:47前操作</span>
                </div>
              </div>
            </div>
          </div>
          {/* 待返款 */}
          <div style={{ padding: '0.3rem 0.3rem', backgroundColor: '#fff' }}>
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
                  <Button type="primary"><Link to="/taskStateChild">待商家确认</Link></Button>
                </div>
                <div className="right-bottom">
                  <p>
                    <span>垫资99.00元</span>
                    <span>平台返款</span>
                  </p>
                  <span>商家48小时内完成</span>
                </div>
              </div>
            </div>
          </div>
          {/* 待评价 */}
          <div style={{ padding: '0.3rem 0.3rem', backgroundColor: '#fff' }}>
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
                  <Button type="primary"><Link to="/taskStateChild">已返本金待提交评价</Link></Button>
                </div>
                <div className="right-bottom">
                  <p>
                    <span>垫资99.00元</span>
                    <span>平台返款</span>
                  </p>
                  <span>务必等待签收后再评价</span>
                </div>
              </div>
            </div>
          </div>
          {/* 所有 */}
          <div style={{ padding: '0.3rem 0.3rem', backgroundColor: '#fff' }}>
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
                  <Button type="primary"><Link to="/taskStateChild">待操作</Link></Button>
                </div>
                <div className="right-bottom">
                  <p>
                    <span>垫资99.00元</span>
                    <span>平台返款</span>
                  </p>
                  <span>请在11-08 17:43:47前操作</span>
                </div>
              </div>
            </div>
          </div>
        </Tabs>
        <WhiteSpace />
      </div>
    )
  }
}

export default WenDaTaskNo
