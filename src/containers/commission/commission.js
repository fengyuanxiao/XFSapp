import React, { Component } from 'react';
import { Icon } from 'antd';
import { Link } from 'react-router-dom';
// import { Tabs, WhiteSpace } from 'antd-mobile';
import Tabs from 'antd-mobile/lib/tabs';
import WhiteSpace from 'antd-mobile/lib/white-space';

import './commission.css';

const tabs = [
  { title: '本金账单' },
  { title: '佣金账单' },
];

class CashPage extends Component {
  render() {
    return(
      <div>
        <header className="tabTitle">
          <div className="return"><Link to="/myCenter"><Icon type="left" theme="outlined" />返回</Link></div>
          账单
        </header>
        <WhiteSpace style={{ paddingTop: '3rem' }} />
          <Tabs tabs={tabs} initialPage={1} animated={false} useOnPan={false}>
            {/* 我发起的申诉 */}
            <div style={{ padding: '0.3rem 0.3rem', backgroundColor: '#fff' }}>
              123
            </div>
            {/* 我收到的申诉 */}
            <div style={{ padding: '0.3rem 0.3rem', backgroundColor: '#fff' }}>
              <ul className="commission-list">
                <li>
                  <div>
                    <span>任务过期未操作自动撤销扣除</span>
                    <span className="moneys">-1.00</span>
                  </div>
                  <div className="money-data">
                    <span>2018-11-07</span>
                    <span>佣金余额-9.00</span>
                  </div>
                </li>
              </ul>
            </div>
          </Tabs>
        <WhiteSpace />
      </div>
    )
  }
}

export default CashPage
