import React, { Component } from 'react';
import { Icon, Button } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Tabs from 'antd-mobile/lib/tabs';
import WhiteSpace from 'antd-mobile/lib/white-space';

import '../dianFuTask/dianFuTask.css';
import '../../../component/apis';

const tabs = [
  { title: '商家审核' },
  { title: '提交问答..' },
  { title: '待返佣金' },
  { title: '所有' },
];

var page0 = 1;          //商家审核
var page1 = 1;          //提交问答
var page4 = 1;          //待返佣金
var page5 = 1;          //所有

class WenDaTaskNo extends Component {
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
    page4 = 1;
    page0 = 1;
    //所有
    axios.post(global.constants.website+'/api/task/mytaskanswerlist?page=' + page5,{
      status: 5
    },{
      headers: {AppAuthorization: localStorage.getItem("token")}    //post 方法传 token
    })
    .then( res => {
      let resData = res.data.data;
      // console.log(resData);
      this.setState({
        datasShow: true,                              //为true 显示任务列表
        task_lists: resData.task_list,                //任务列表数据
      });
    })
    .catch( error => {
      console.log(error);
    })

    // 提交问答
    axios.post(global.constants.website+'/api/task/mytaskanswerlist?page=' + page1,{
      status: 1
    },{
      headers: {AppAuthorization: localStorage.getItem("token")}    //post 方法传 token
    })
    .then( res => {
      let resData = res.data.data;
      // console.log(resData);
      this.setState({
        stateb: resData.task_list,                //任务列表数据
      });
    })
    .catch( error => {
      console.log(error);
    })

    // 商家审核
    axios.post(global.constants.website+'/api/task/mytaskanswerlist?page=' + page0,{
      status: 0
    },{
      headers: {AppAuthorization: localStorage.getItem("token")}    //post 方法传 token
    })
    .then( res => {
      let resData = res.data.data;
      // console.log(resData);
      this.setState({
        statea: resData.task_list,                //任务列表数据
      });
    })
    .catch( error => {
      console.log(error);
    })

    // 待返佣金
    axios.post(global.constants.website+'/api/task/mytaskanswerlist?page=' + page4,{
      status: 4
    },{
      headers: {AppAuthorization: localStorage.getItem("token")}    //post 方法传 token
    })
    .then( res => {
      let resData = res.data.data;
      // console.log(resData);
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
    let statea = that.state.statea;               //待操作
    let stateb = that.state.stateb;               //待返款
    let statec = that.state.statec;               //待评价
    // 所有
    axios.post(global.constants.website+'/api/task/mytaskanswerlist?page=' + ++page5,{
      status: 5
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

    // 商家审核
    axios.post(global.constants.website+'/api/task/mytaskanswerlist?page=' + ++page0,{
      status: 0
    },{
      headers: {AppAuthorization: localStorage.getItem("token")}    //post 方法传 token
    })
    .then( res => {
      let resData = res.data.data;
      // console.log(resData.task_list);
      if ( resData.task_list.length === 0 ) {
        that.setState({
          isLoadingMore: true,
        })
      }
      for (var i = 0; i < resData.task_list.length; i++) {
        statea.push(resData.task_list[i])
      }
      that.setState({
        statea: statea,                //任务列表数据
      });
    })
    .catch( error => {
      console.log(error);
    })

    // 提交问答
    axios.post(global.constants.website+'/api/task/mytaskanswerlist?page=' + ++page1,{
      status: 1
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
    axios.post(global.constants.website+'/api/task/mytaskanswerlist?page=' + ++page4,{
      status: 4
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
    this_.props.history.push("/questionsTasks");
  }

  // Tabs 跳转传递不同类型参数
  onChange =(e) => {
  }

  render() {
    const { task_lists,datasShow,statea,stateb,statec } = this.state;
    return(
      <div>
        <header className="tabTitle">
          <div className="return"><Link to="/myTask"><Icon type="left" theme="outlined" />返回</Link></div>
          未完成任务
        </header>
        <WhiteSpace style={{ paddingTop: '3rem' }} />
        <Tabs tabs={tabs} initialPage={3} animated={false} useOnPan={false} onTabClick={this.onChange}>
          {/* 待操作 */}
          <div style={{ padding: '0.3rem 0.3rem', backgroundColor: '#fff' }}>
            {/* 循环 all-task div */}
            <div className="App">
              {
                statea ?
                  statea.map((item, index) => {
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
                          <div className="right-center">
                            <p>￥{item.commission}</p>
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
          {/* 待返款 */}
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
                          <div className="right-center">
                            <p>￥{item.commission}</p>
                            {/* <Button type="primary"><Link to={{ pathname: '/questionsTasks', state: item.order_id }}>{item.order_status_texts}</Link></Button> */}
                            <Button type="primary" onClick={()=>this.routerToWenda(item.order_id)}>{item.order_status_texts}</Button>
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
          {/* 待评价 */}
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
                              {
                                item.order_status === 1 ?
                                  // <Button type="primary"><Link to={{ pathname: '/questionsTasks', state: item.order_id }}>{item.order_status_texts}</Link></Button>
                                    <Button type="primary" onClick={()=>this.routerToWenda(item.order_id)}>{item.order_status_texts}</Button>
                                :
                                ""
                              }
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
                  task_lists ?
                    task_lists.map((item, index) => {
                      return(
                        <div className="all-task" key={index}>
                          <div className="left-img">
                            <img src={ item.goodspic } alt=""/>
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
                            {/* 显示所有，并且判断任务是否过期 */}
                            <div className="right-center">
                              <p>￥{item.commission}</p>
                              {
                                item.order_status === 1 ?
                                  // <Button type="primary"><Link to={{ pathname: '/questionsTasks', state: item.order_id }}>{item.order_status_texts}</Link></Button>
                                    <Button type="primary" onClick={()=>this.routerToWenda(item.order_id)}>{item.order_status_texts}</Button>
                                :
                                ""
                              }
                            </div>
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

export default WenDaTaskNo
