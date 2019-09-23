import React, { Component } from 'react';
import { Icon, Button } from 'antd';
import { Link } from 'react-router-dom';
import Tabs from 'antd-mobile/lib/tabs';
import WhiteSpace from 'antd-mobile/lib/white-space';
import axios from 'axios';
import '../../../component/apis';

import '../dianFuTask/dianFuTask.css';

const tabs = [
  { title: '待评价' },
  { title: '待返佣金' },
  { title: '所有' },
];

var page5 = 1;          //所有
var page1 = 1;          //待返款
var page3 = 1;          //待评价

class PingJiaTaskNo extends Component {
  constructor() {
    super();
    this.state = {
      datasShow: false,         //为true 显示任务列表
      isLoadingMore: false,    //为true 不在调用滚动执行ajax
      isLoadingMore1: false,    //为true 不在调用滚动执行ajax
      isLoadingMore2: false,    //为true 不在调用滚动执行ajax
      isLoadingMore3: false,    //为true 不在调用滚动执行ajax
    }
  }

  componentWillMount() {
    page5 = 1;
    page1 = 1;
    page3 = 1;
    // 所有
    axios.post(global.constants.website+'/api/task/mytasklist?page=' + page5,{
      status: 5,
      order_type: 3,
    },{
      headers: {AppAuthorization: localStorage.getItem("token")}    //post 方法传 token
    })
    .then( res => {
      let resData = res.data.data;
      // console.log(resData.task_list);
      this.setState({
        datasShow: true,
        task_lists: resData.task_list,                //任务列表数据
        order_status: resData.order_status,           //待返佣金
        // is_expire_data: resData.task_list.is_expire_data,       //在未完成的任务里面查看示否为过期任务
      });
    })
    .catch( error => {
      console.log(error);
    })

    // 待操作
    // axios.post(global.constants.website+'/api/task/mytasklist?page=' + page0,{
    //   status: 0
    // },{
    //   headers: {AppAuthorization: localStorage.getItem("token")}    //post 方法传 token
    // })
    // .then( res => {
    //   let resData = res.data.data;
    //   // console.log(resData.task_list);
    //   this.setState({
    //     statea: resData.task_list,                //任务列表数据
    //   });
    // })
    // .catch( error => {
    //   console.log(error);
    // })

    // 待操作
    axios.post(global.constants.website+'/api/task/mytasklist?page=' + page1,{
      status: 0,
      order_type: 3,
    },{
      headers: {AppAuthorization: localStorage.getItem("token")}    //post 方法传 token
    })
    .then( res => {
      let resData = res.data.data;
      // console.log(resData.task_list);
      this.setState({                 //为true 显示任务列表
        stateb: resData.task_list,                //任务列表数据
      });
    })
    .catch( error => {
      console.log(error);
    })

    // 待返佣金
    axios.post(global.constants.website+'/api/task/mytasklist?page=' + page3,{
      status: 4,
      order_type: 3,
    },{
      headers: {AppAuthorization: localStorage.getItem("token")}    //post 方法传 token
    })
    .then( res => {
      let resData = res.data.data;
      // console.log(resData.task_list);
      this.setState({
        statec: resData.task_list,                //任务列表数据
      });
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
      if (this.state.isLoadingMore && this.state.isLoadingMore1 && this.state.isLoadingMore2 && this.state.isLoadingMore3) {
          return ;
      }

      if (timeCount) {
          clearTimeout(timeCount);
      }

      timeCount = setTimeout(callback, 50);
    }.bind(this), false);

  }

  loadMoreDataFn(that) {

    let task_lists = that.state.task_lists;       //所有
    let stateb = that.state.stateb;               //待返款
    let statec = that.state.statec;               //待评价
    // 所有
    axios.post(global.constants.website+'/api/task/mytasklist?page=' + ++page5,{
      status: 5,
      order_type: 3,
    },{
      headers: {AppAuthorization: localStorage.getItem("token")}    //post 方法传 token
    })
    .then( res => {
      let resData = res.data.data;
      // console.log(resData.task_list);
      if ( resData.task_list.length === 0 ) {
        that.setState({
          isLoadingMore1: true,
        })
      }
      for (var i = 0; i < resData.task_list.length; i++) {
        task_lists.push(resData.task_list[i])
      }
      that.setState({
        task_lists: task_lists,                //任务列表数据
      });
    })
    .catch( error => {
      console.log(error);
    })

    // 待操作
    // axios.post(global.constants.website+'/api/task/mytasklist?page=' + ++page0,{
    //   status: 0
    // },{
    //   headers: {AppAuthorization: localStorage.getItem("token")}    //post 方法传 token
    // })
    // .then( res => {
    //   let resData = res.data.data;
    //   // console.log(resData.task_list);
    //   if ( resData.task_list.length === 0 ) {
    //     that.setState({
    //       isLoadingMore: true,
    //     })
    //   }
    //   for (var i = 0; i < resData.task_list.length; i++) {
    //     statea.push(resData.task_list[i])
    //   }
    //   that.setState({
    //     statea: statea,                //任务列表数据
    //   });
    // })
    // .catch( error => {
    //   console.log(error);
    // })

    // 待操作
    axios.post(global.constants.website+'/api/task/mytasklist?page=' + ++page1,{
      status: 0,
      order_type: 3,
    },{
      headers: {AppAuthorization: localStorage.getItem("token")}    //post 方法传 token
    })
    .then( res => {
      let resData = res.data.data;
      // console.log(resData.task_list);
      if ( resData.task_list.length === 0 ) {
        that.setState({
          isLoadingMore2: true,
        })
      }
      for (var i = 0; i < resData.task_list.length; i++) {
        stateb.push(resData.task_list[i])
      }
      that.setState({
        stateb: stateb,                //任务列表数据
      });
    })
    .catch( error => {
      console.log(error);
    })

    // 待返佣金
    axios.post(global.constants.website+'/api/task/mytasklist?page=' + ++page3,{
      status: 4,
      order_type: 3,
    },{
      headers: {AppAuthorization: localStorage.getItem("token")}    //post 方法传 token
    })
    .then( res => {
      let resData = res.data.data;
      // console.log(resData.task_list);
      if ( resData.task_list.length === 0 ) {
        that.setState({
          isLoadingMore3: true,
        })
      }
      for (var i = 0; i < resData.task_list.length; i++) {
        statec.push(resData.task_list[i])
      }
      that.setState({
        statec: statec,                //任务列表数据
      });
    })
    .catch( error => {
      console.log(error);
    })
  }

  // 点击操作任务
  routerToWenda (item) {
    let this_ = this;
    localStorage.setItem("order_id", item);
    this_.props.history.push("/taskPingjia");
  }

  //点击进入申诉详情页面
  routerToWendas (item) {
      let this_ = this;
      // console.log(item);
      this_.props.history.push({pathname: "/appealTaskDetails", state: {data: item}});
    }



  render() {
    const { statec,stateb,datasShow,task_lists} = this.state;
    return(
      <div>
        <header className="tabTitle">
          <div className="return"><Link to="/myTask"><Icon type="left" theme="outlined" />返回</Link></div>
          未完成任务
        </header>
        <WhiteSpace style={{ paddingTop: '3rem' }} />
        <Tabs tabs={tabs} initialPage={2} animated={false} useOnPan={false} onTabClick={this.onChange}>
          {/* 待操作 */}
          <div style={{ padding: '0.3rem 0.3rem', backgroundColor: '#fff' }}>
            <div className="App">
              {
                stateb ?
                  stateb.map((item, index) => {
                    return(
                      <div key={index} className="all-task">
                        <div className="left-img">
                          <img src={item.goodspic} alt=""/>
                        </div>
                        <div className="right">
                          {/* top */}
                          <div className="right-top">
                            <span className="right-top-child">
                              <img className="right-top-childImg" src={item.taskitem_pic} alt="平台图标"/>
                              {item.user_taobao}
                            </span>
                            <span>
                              {item.addtime}
                            </span>
                          </div>
                          {/* center */}
                          <div>
                            <div className="right-center">
                              <p>￥{item.commission}</p>
                              <Button onClick={()=>this.routerToWenda(item.order_id)} type="primary">{item.order_status_text}</Button>
                              {/* <Button type="primary"><Link to={{ pathname: '/myTaskDetails', state: item.order_id }}>{item.order_status_text}</Link></Button> */}
                            </div>
                            <div className="right-bottom">
                              <p className="paddingBottom">
                                <span>垫资{item.need_principal}元</span>
                                <span>{item.refundtext}</span>
                              </p>
                              {/* <p className="taskss">请在{item.limittime}前操作</p> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })
                :
                <div className="taskLists">还没有任务噢,快去任务大厅看看吧^-^</div>
              }
            </div>
            <div style={{ textAlign: 'center' }} ref="wrapper" onClick={this.loadMoreDataFn.bind(this, this)}></div>
          </div>
          {/* 待返佣金 */}
          <div style={{ padding: '0.3rem 0.3rem', backgroundColor: '#fff' }}>
            <div className="App">
              {
                statec ?
                  statec.map((item, index) => {
                    return(
                      <div key={index} className="all-task">
                        <div className="left-img">
                          <img src={item.goodspic} alt=""/>
                        </div>
                        <div className="right">
                          {/* top */}
                          <div className="right-top">
                            <span className="right-top-child">
                              <img className="right-top-childImg" src={item.taskitem_pic} alt="平台图标"/>
                              {item.user_taobao}
                            </span>
                            <span>
                              {item.addtime}
                            </span>
                          </div>
                          {/* center */}
                          <div>
                            <div className="right-center">
                              <p>￥{item.commission}</p>
                              {/* <Button onClick={()=>this.routerToWenda(item.order_id)} type="primary">{item.order_status_text}</Button> */}
                              <Button type="primary">待返佣金</Button>
                            </div>
                            <div className="right-bottom">
                              <p className="paddingBottom">
                                <span>垫资{item.need_principal}元</span>
                                <span>{item.refundtext}</span>
                              </p>
                              {/* <p className="taskss">请在{item.limittime}前操作</p> */}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })
                :
                <div className="taskLists">还没有任务噢,快去任务大厅看看吧^-^</div>
              }
            </div>
            <div style={{ textAlign: 'center' }} ref="wrapper" onClick={this.loadMoreDataFn.bind(this, this)}></div>
          </div>
          {/* 所有 */}
          <div style={{ padding: '0.3rem 0.3rem', backgroundColor: '#fff' }}>
            {/* 循环 all-task div */}
            <div className="App">
              {
                datasShow ?
                  task_lists.length ?
                    task_lists.map((item, index) => {
                      return(
                        <div className="all-task" key={index}>
                          <div className="left-img">
                            <img src={ item.goodspic } alt=""/>
                          </div>
                          <div className="right">
                            {/* top */}
                            <div className="right-top">
                              <p className="right-top-child">
                                <img className="right-top-childImg" src={item.taskitem_pic} alt="平台图标"/>
                                {item.user_taobao}
                              </p>
                              <p>
                                接单时间：{item.addtime}
                              </p>
                            </div>
                            {/* center */}
                            {/* 显示所有，并且判断任务是否过期 */}
                            {
                              item.is_expire_data ?
                                <div>
                                  <div className="right-center">
                                    <p>￥{item.commission}</p>
                                    <Button onClick={()=>this.routerToWenda(item.order_id)} type="primary">{item.order_status_text}</Button>
                                  </div>
                                  <div className="right-bottom">
                                    <p className="paddingBottom">
                                      <span>垫资{item.need_principal}元</span>
                                      <span>{item.refundtext}</span>
                                    </p>
                                    <span>该任务已过期</span>
                                  </div>
                                </div>
                              :
                              <div>
                                <div className="right-center">
                                  <p>￥{item.commission}</p>
                                  {/* <Button type="primary"><Link to="/taskStateChild">{item.order_status_text}</Link></Button> */}
                                  {
                                    item.order_status === 4 ?
                                      <Button type="primary">待返佣金</Button>
                                    :
                                    <Button onClick={()=>this.routerToWenda(item.order_id)} type="primary">{item.order_status_text}</Button>
                                  }
                                </div>
                                <div className="right-bottom">
                                  <p className="paddingBottom">
                                    <span>垫资{item.need_principal}元</span>
                                    <span>{item.refundtext}</span>
                                  </p>
                                  {/* {
                                    item.order_status ?
                                    ""
                                    :
                                    <p className="taskss">请在{item.limittime}前操作</p>
                                  } */}
                                  {
                                    item.order_status ===0 ? <p className="taskss">请在{item.limittime}前操作</p> : (item.order_status ===1 ? <p className="taskss">商家48小时内完成</p> : (item.order_status ===3 ? <p className="taskss">务必等待签收后再评价</p> : ""))
                                  }
                                </div>
                              </div>
                            }
                          </div>
                        </div>
                      )
                    })
                  :
                  <div className="taskLists">还没有任务噢,快去任务大厅看看吧^-^</div>
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

export default PingJiaTaskNo
