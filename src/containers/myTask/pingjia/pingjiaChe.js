import React, { Component } from 'react';
import { Icon, Button } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../../component/apis';

var page = 1;

class PingJiaTaskChe extends Component {
  constructor() {
    super()
    this.state ={
      datasState: false,      //进入任务大厅调用ajax 请求延时状态
      isLoadingMore: false    //为true 不在调用滚动执行ajax
    }
  }

  componentWillMount() {
    page = 1;
    axios.post(global.constants.website+'/api/task/mytasklist?page=' + page,{
      status: 10,             //已撤销
      order_type: 3,
    },{
      headers: {AppAuthorization: localStorage.getItem("token")}    //post 方法传 token
    })
    .then( res => {
      // console.log(res.data.data.task_list);
      this.setState({
        task_lists: res.data.data.task_list,
        datasState: true,                       //状态改为true
      })
    })
    .catch( err => {
      console.log(err);
    })
  }
  // 处理内存泄露
  componentWillUnmount = () => {
    this.setState = (state,callback)=>{
      return;
    };
  }

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
      if (this.state.isLoadingMore) {
          return ;
      }

      if (timeCount) {
          clearTimeout(timeCount);
      }

      timeCount = setTimeout(callback, 50);
    }.bind(this), false);

  }

  loadMoreDataFn(that) {
    let task_lists = that.state.task_lists;
    // 在此调用ajax获取多页数据
    axios.post(global.constants.website+'/api/task/mytasklist?page=' + ++page,{
      status: 10,             //已撤销
      order_type: 3,
    },{
      headers: {AppAuthorization: localStorage.getItem("token")}    //post 方法传 token
    })
    .then( res => {
      let resData = res.data.data;
      // console.log(resData.task_list);
      if ( resData.task_list === "" ) {
        that.setState({
          isLoadingMore: true,
        })
      }
      for (var i = 0; i < resData.task_list.length; i++) {
        task_lists.push(resData.task_list[i])
      }
      that.setState({
        task_lists: task_lists,
      })
    })
    .catch( err => {
      console.log(err);
    })
  }

  render() {
    const { task_lists,datasState,isLoadingMore } = this.state;
    return(
      <div>
        <header className="tabTitle">
          <div className="return"><Link to="/myTask"><Icon type="left" theme="outlined" />返回</Link></div>
          已撤回任务
        </header>
        <div style={{ padding: '0.3rem 0.3rem', backgroundColor: '#fff', paddingTop: '3rem' }}>
          {/* 循环 all-task div */}
          <div className="App">
            {
              datasState ?
                task_lists ?
                  task_lists.map((item, index) => {
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
                              <Button type="primary">{item.order_status_text}</Button>
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
              :
              <div className="loading">
                <img src={require("../../../img/loading1.gif")} alt="loading"/>
                <p>加载中...</p>
              </div>
            }
          </div>
          <div style={{ textAlign: 'center' }} ref="wrapper" onClick={this.loadMoreDataFn.bind(this, this)}>{ isLoadingMore ? "没有更多..." : "" }</div>
        </div>
      </div>
    )
  }
}

export default PingJiaTaskChe
