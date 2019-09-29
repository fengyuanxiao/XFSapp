import React, { Component } from 'react';
import { Icon } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Tabs from 'antd-mobile/lib/tabs';
import WhiteSpace from 'antd-mobile/lib/white-space';

import './commission.css';
import '../../component/apis';

const tabs = [
  { title: '本金账单' },
  { title: '佣金账单' },
];

var page = 1;
var page1 = 1;

class CashPage extends Component {
  constructor() {
    super();
    this.state = {
      shows: false,            //进入任务大厅调用ajax 请求延时状态
      isLoadingMore: false,    //为true 不在调用滚动执行ajax
      isLoadingMore1: false,   //为true 不在调用滚动执行ajax
    }
  }

  UNSAFE_componentWillMount() {
    page = 1;
    page1 = 1;
    axios.post(global.constants.website+'/api/index/usermoneylog?page=' + page1, {
      type: 2,
    },
    {
      headers: {AppAuthorization: localStorage.getItem("token")}
    })
    .then( res => {
      let datas = res.data.data;
      // console.log(datas);
      this.setState({
        commissionList2: datas,
        shows: true,
      })
    })
    .catch(error => {
      console.log(error);
    });

    axios.post(global.constants.website+'/api/index/usermoneylog?page=' + page,{
      type: 1,
    },{
      headers: {AppAuthorization: localStorage.getItem("token")}    //post 方法传 token
    })
    .then( res => {
      let datas = res.data.data;
      // console.log(datas);
        this.setState({
          commissionList1: datas,
          shows: true,
        })
    })
    .catch( error => {
      console.log(error);
    })
  }
  // 处理内存泄露
  componentWillUnmount = () => {
    this.setState = (state,callback)=>{
      return;
    };
  }

  // 滚动到底触发请求
  componentDidMount() {
    const wrapper = this.refs.wrapper;
    const loadMoreDataFn = this.loadMoreDataFn;
    const that = this; // 为解决不同context的问题
    let timeCount;

  function callback() {
    const top = wrapper.getBoundingClientRect().top;
    const windowHeight = window.screen.height;

    if (top && top < windowHeight) {
      // 当 wrapper 已经被滚动到页面可视范围之内触发
      loadMoreDataFn(that);
    }
  }

  window.addEventListener('scroll', function () {
      if (this.state.isLoadingMore && this.state.isLoadingMore1) {
          return ;
      }

      if (timeCount) {
          clearTimeout(timeCount);
      }

      timeCount = setTimeout(callback, 50);
    }.bind(this), false);

  }

  loadMoreDataFn(that) {
    // console.log(page1);
    // titels 为true的时候 走佣金接口
    let commissionList2 = that.state.commissionList2;
    // 在此调用ajax获取多页数据
    axios.post(global.constants.website+'/api/index/usermoneylog?page=' + ++page1,{
      type: 2,      //2 是佣金
    },{
      headers: {AppAuthorization: localStorage.getItem("token")}    //post 方法传 token
    })
    .then( res => {
      let resData = res.data.data;
      // console.log(resData);
      // resData.length为0时没有数据的时候 停止调用滚动
      if ( resData.length === 0 ) {
        that.setState({
          isLoadingMore1: true,
        })
      }
      for (var i = 0; i < resData.length; i++) {
        commissionList2.push(resData[i])
      }
      that.setState({
        commissionList2: commissionList2,                       //任务列表数据
      });
      // console.log(commissionList2);
    })
    .catch( error => {
      console.log(error);
    })

    // 本金到底请求更多数据
    let commissionList1 = that.state.commissionList1;
    // 在此调用ajax获取多页数据
    axios.post(global.constants.website+'/api/index/usermoneylog?page=' + ++page,{
      type: 1,      //1 是本金
    },{
      headers: {AppAuthorization: localStorage.getItem("token")}    //post 方法传 token
    })
    .then( res => {
      let resData = res.data.data;
      // console.log(resData);
      // resData.length为0时没有数据的时候 停止调用滚动
      if ( resData.length === 0 ) {
        that.setState({
          isLoadingMore: true,
        })
      }
      for (var i = 0; i < resData.length; i++) {
        commissionList1.push(resData[i])
      }
      that.setState({
        commissionList1: commissionList1,                       //任务列表数据
      });
      // console.log(commissionList1);
    })
    .catch( error => {
      console.log(error);
    })
  }

  onChange =(e) => {
    // 点击tabs 调用是否是本金账单 或者佣金账单
  }

  render() {
    const { commissionList1,commissionList2,shows } = this.state;
    return(
      <div>
        <header className="tabTitle">
          <div className="return"><Link to="/myCenter"><Icon type="left" theme="outlined" />返回</Link></div>
          账单
        </header>
        <WhiteSpace style={{ paddingTop: '3rem' }} />
        <Tabs tabs={tabs} initialPage={1} animated={true} useOnPan={false} onTabClick={this.onChange}>
          {/* 我的本金 */}
          <div style={{ padding: '0.3rem 0.3rem', backgroundColor: '#fff' }}>
            <div className="App">
              {
                commissionList1 ?
                  <ul className="commission-list">
                    {
                      commissionList1.length ?
                        commissionList1.map((item, index) => {
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
                  <img src={require("../../img/loading1.gif")} alt="loading"/>
                  <p>数据加载中...</p>
                </div>
              }
            </div>
            <div style={{ textAlign: 'center' }} ref="wrapper" onClick={this.loadMoreDataFn.bind(this, this)}></div>
          </div>
          {/* 我的佣金 */}
          <div style={{ padding: '0.3rem 0.3rem', backgroundColor: '#fff' }}>
            <div className="App">
              {
                shows ?
                  <ul className="commission-list">
                    {
                      commissionList2 ?
                        commissionList2.map((item, index) => {
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
                  <img src={require("../../img/loading1.gif")} alt="loading"/>
                  <p>数据加载中...</p>
                </div>
              }
            </div>
            <div style={{ textAlign: 'center' }} ref="wrapper" onClick={this.loadMoreDataFn.bind(this, this)}></div>
          </div>
        </Tabs>
        <WhiteSpace />
      </div>
    )
  }
}

export default CashPage
