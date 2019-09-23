import React,{ Component } from 'react';
import { Icon,   } from 'antd';
import Tabs from 'antd-mobile/lib/tabs';
import axios from 'axios';
import WhiteSpace from 'antd-mobile/lib/white-space';
import { Link  } from 'react-router-dom';

import './shensu.css';
import '../../../component/apis';

const tabs = [
  { title: '我发起的申诉' },
  { title: '我收到的申诉' },
];

var page = 1;
var page1 = 1;

class ShenSu extends Component {
  constructor() {
    super();
    this.state = {
      datasState: false,
      isLoadingMore: false,    //为true 不在调用滚动执行ajax
      isLoadingMore1: false,   //为true 不在调用滚动执行ajax
    }
  }

  componentWillMount() {
    page = 1;
    page1 = 1;

    // 我收的申诉
    axios.post(global.constants.website+'/api/help/complainList?page=' + page, {
      typeid: 2
    },{
      headers: {AppAuthorization: localStorage.getItem("token")}        //post 方法传 token
    })
    .then( res => {
      // console.log(res.data.data);
      this.setState({
        datasState: true,
        shenSuList2: res.data.data,
      })
    })
    .catch(function(error) {
      console.log(error);
    });

    // 我发起的申诉
    axios.post(global.constants.website+'/api/help/complainList?page=' + page1, {
      typeid: 1
    },{
      headers: {AppAuthorization: localStorage.getItem("token")}        //post 方法传 token
    })
    .then( res => {
      // console.log(res.data.data);
      this.setState({
        shenSuList: res.data.data,
      })
    })
    .catch(function(error) {
      console.log(error);
    });

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
    let shenSuList = that.state.shenSuList;
    let shenSuList2 = that.state.shenSuList2;
    // 在此调用ajax获取多页数据
    axios.post(global.constants.website+'/api/help/complainList?page=' + ++page1,{
      type: 1,      //我发起的申诉
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
        shenSuList.push(resData[i])
      }
      that.setState({
        shenSuList: shenSuList,                       //任务列表数据
      });
    })
    .catch( error => {
      console.log(error);
    })

    axios.post(global.constants.website+'/api/help/complainList?page=' + ++page,{
      type: 2,      //我收到的申诉
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
        shenSuList2.push(resData[i])
      }
      that.setState({
        shenSuList2: shenSuList2,                       //任务列表数据
      });
    })
    .catch( error => {
      console.log(error);
    })

  }

  onTabClick = (e) => {
    // // console.log(e.title);
    // axios.post(global.constants.website+'/api/help/complainList', {
    //   typeid: e.title === "我收到的申诉" ? 2 : 1
    // },{
    //   headers: {AppAuthorization: localStorage.getItem("token")}        //post 方法传 token
    // })
    // .then( res => {
    //   // console.log(res.data.data);
    //   this.setState({
    //     datasState: true,
    //     shenSuList: res.data.data,
    //   })
    // })
    // .catch(function(error) {
    //   console.log(error);
    // });
  }

  routerToWenda (item) {
    let this_ = this;
    // console.log(item);
    this_.props.history.push({pathname: "/appealTaskDetails", state: {data: item}});
  }

  render() {
    const { datasState, shenSuList,shenSuList2 } = this.state;
    return(
      <div>
        <header className="tabTitle">
          <div className="return"><Link to="/myCenter"><Icon type="left" theme="outlined" />返回</Link></div>
          申诉列表
        </header>
        <WhiteSpace style={{ paddingTop: '3rem' }} />
        <Tabs onTabClick={ this.onTabClick } tabs={tabs} initialPage={1} animated={true} useOnPan={false}>
          {/* 我发起的申诉 */}
          <div style={{ padding: '0.3rem 0.3rem', backgroundColor: '#fff' }}>
            <div className="App">
              {
                datasState ?
                  shenSuList ?
                    shenSuList.map((item, index) => {
                      return(
                        item.company_status ?
                          <div key={item.order_id} className="bodyBox">
                            <div className="childOne">
                              <div>
                                <span>{item.complain_desc}</span>
                              </div>
                              {
                                item.user_order_status ?
                                  <div>
                                    <span>{item.undo_time}</span>
                                    <span>{item.order_status_text}</span>
                                    <span>原因：{item.undo_desc}</span>
                                  </div>
                                :
                                ""
                              }
                            </div>
                            <div className="childTwo">{item.status}</div>
                          </div>
                        :
                        <div onClick={ ()=>this.routerToWenda(item.order_id)} key={item.order_id} className="bodyBox">
                          <div className="childOne">
                            <div>
                              <span>{item.complain_desc}</span>
                            </div>
                            {
                              item.user_order_status ?
                                <div>
                                  <span>{item.undo_time}</span>
                                  <span>{item.order_status_text}</span>
                                  <span>原因：{item.undo_desc}</span>
                                </div>
                              :
                              ""
                            }
                          </div>
                          <div className="childTwo">{item.status}</div>
                        </div>
                      )
                    })
                  :
                  <div style={{ padding: '0.5rem 0.7rem', }}>没有申诉内容！</div>
                :
                <div className="loading">
                  <img src={require("../../../img/loading1.gif")} alt="loading"/>
                  <p>加载中...</p>
                </div>
              }
            </div>
            <div style={{ textAlign: 'center' }} ref="wrapper" onClick={this.loadMoreDataFn.bind(this, this)}></div>
          </div>

          {/* 我收到的申诉 */}
          <div style={{ padding: '0.3rem 0.3rem', backgroundColor: '#fff' }}>
            <div className="App">
              {
                datasState ?
                  shenSuList2 ?
                    shenSuList2.map((item, index) => {
                      return(
                        item.company_status ?
                          <div key={item.order_id} className="bodyBox">
                            <div className="childOne">
                              <div>
                                <span>{item.complain_desc}</span>
                              </div>
                              {
                                item.user_order_status ?
                                  <div>
                                    <span>{item.undo_time}</span>
                                    <span>{item.order_status_text}</span>
                                    <span>原因：{item.undo_desc}</span>
                                  </div>
                                :
                                ""
                              }
                            </div>
                            <div className="childTwo">{item.status}</div>
                          </div>
                        :
                        <div onClick={ ()=>this.routerToWenda(item.order_id)} key={item.order_id} className="bodyBox">
                          <div className="childOne">
                            <div>
                              <span>{item.complain_desc}</span>
                            </div>
                            {
                              item.user_order_status ?
                                <div>
                                  <span>{item.undo_time}</span>
                                  <span>{item.order_status_text}</span>
                                  <span>原因：{item.undo_desc}</span>
                                </div>
                              :
                              ""
                            }
                          </div>
                          <div className="childTwo">{item.status}</div>
                        </div>
                      )
                    })
                  :
                  <div style={{ padding: '0.5rem 0.7rem', }}>没有申诉内容！</div>
                :
                <div className="loading">
                  <img src={require("../../../img/loading1.gif")} alt="loading"/>
                  <p>加载中...</p>
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

export default ShenSu
