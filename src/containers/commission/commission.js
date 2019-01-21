import React, { Component } from 'react';
import { Icon } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Tabs from 'antd-mobile/lib/tabs';
import WhiteSpace from 'antd-mobile/lib/white-space';

import './commission.css';

const tabs = [
  { title: '本金账单' },
  { title: '佣金账单' },
];

class CashPage extends Component {
  constructor() {
    super();
    this.state = {
      shows: false,
    }
  }

  componentWillMount() {
    axios.post('/api/index/usermoneylog', {
      type: 2,
    },
    {
      headers: {AppAuthorization: localStorage.getItem("token")}
    })
    .then( res => {
      let datas = res.data.data;
      // console.log(res.data.data);
      if ( datas ) {
        this.setState({
          shows: true,
          commissionList: datas,
        })
      }
    })
    .catch(error => {
      console.log(error);
    });
  }

  onChange =(e) => {
    // 点击tabs 调用是否是本金账单 或者佣金账单
    axios.post('/api/index/usermoneylog', {
      type: e.title === "本金账单" ? 1 : 2,
    },
    {
      headers: {AppAuthorization: localStorage.getItem("token")}
    })
    .then( res => {
      let datas = res.data.data;
      // console.log(res.data.data);
      if ( datas ) {
        this.setState({
          shows: true,
          commissionList: datas,
        })
      }
    })
    .catch(error => {
      console.log(error);
    });
  }

  render() {
    const { shows, commissionList } = this.state;
    return(
      <div>
        <header className="tabTitle">
          <div className="return"><Link to="/myCenter"><Icon type="left" theme="outlined" />返回</Link></div>
          账单
        </header>
        <WhiteSpace style={{ paddingTop: '3rem' }} />
        <Tabs tabs={tabs} initialPage={1} animated={true} useOnPan={false} onTabClick={this.onChange}>
          {/* 我发起的申诉 */}
          <div style={{ padding: '0.3rem 0.3rem', backgroundColor: '#fff' }}>
            {
              shows ?
                <ul className="commission-list">
                  {
                    commissionList.length ?
                      commissionList.map((item, index) => {
                        return(
                          <li key={item.id}>
                            <div>
                              <span>{item.log_content}</span>
                              <span className="moneys">{item.money}</span>
                            </div>
                            <div className="money-data">
                              <span>{item.dateline}</span>
                              <span>本金余额{item.account_money}</span>
                            </div>
                          </li>
                        )
                      })
                    :
                    <div>没有账单！</div>
                  }
                </ul>
              :
              <div className="loading">
                <img src={require("../../img/loading.gif")} alt="loading"/>
                <p>数据加载中...</p>
              </div>
            }
          </div>
          {/* 我收到的申诉 */}
          <div style={{ padding: '0.3rem 0.3rem', backgroundColor: '#fff' }}>
            {
              shows ?
                <ul className="commission-list">
                  {
                    commissionList.length ?
                      commissionList.map((item, index) => {
                        return(
                          <li key={item.id}>
                            <div>
                              <span>{item.log_content}</span>
                              <span className="moneys">{item.money}</span>
                            </div>
                            <div className="money-data">
                              <span>{item.dateline}</span>
                              <span>佣金余额{item.account_money}</span>
                            </div>
                          </li>
                        )
                      })
                    :
                    <div>没有账单！</div>
                  }
                </ul>
              :
              <div className="loading">
                <img src={require("../../img/loading.gif")} alt="loading"/>
                <p>数据加载中...</p>
              </div>
            }
          </div>
        </Tabs>
        <WhiteSpace />
      </div>
    )
  }
}

export default CashPage
