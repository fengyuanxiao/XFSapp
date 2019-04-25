import React, { Component } from 'react';
import { Icon } from 'antd';
import { Link  } from 'react-router-dom';
import axios from 'axios';    //ajax

import './tongZhi.css';
import '../../../component/apis';

var page = 1;

class TongZhi extends Component {
  constructor(){
    super();
    this.state = {
      shows: false,
      isLoadingMore: false    //为true 不在调用滚动执行ajax
    }
  }

  componentWillMount() {
    page = 1;
    axios.get(global.constants.website+'/api/help/noticeList?page=' + page, {
      headers: {AppAuthorization: localStorage.getItem("token")}
    })
    .then( res => {
      // console.log(res.data.data);
      if ( res.data.data ) {
        this.setState({
          shows: true,
          tongZhiList: res.data.data,
        })
      }
    })
    .catch(error => {
      console.log(error);
    });
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
    let tongZhiList = that.state.tongZhiList;
    // 在此调用ajax获取多页数据
    axios.get(global.constants.website+'/api/help/noticeList?page=' + ++page, {
      headers: {AppAuthorization: localStorage.getItem("token")}
    })
    .then( res => {
      let resData = res.data.data;
      // console.log(resData);
      // console.log(task_lists);
      // resData.task_list没有数据的时候 停止调用滚动
      if ( resData.length === 0 ) {
        that.setState({
          isLoadingMore: true,
        })
      }
      for (var i = 0; i < resData.length; i++) {
        tongZhiList.push(resData[i])
      }
      that.setState({
        tongZhiList: tongZhiList,                       //任务列表数据
      });
    })
    .catch( error => {
      console.log(error);
    })
  }

  linkTo = (item) => {
    // console.log(item);
    this.props.history.push({pathname: "/tongZhiChild", state: {data: item}});
  }

  render() {
    const { shows, tongZhiList,isLoadingMore } = this.state;
    return(
      <div>
        <header className="tabTitle">
          <div className="return"><Link to="/myCenter"><Icon type="left" theme="outlined" />返回</Link></div>
          公告列表
        </header>
        <div style={{ padding: '0.3rem 0.3rem', backgroundColor: '#fff' }}>
          <div className="App">
            {
              shows ?
                <ul className="tongZhi-box">
                  {
                    tongZhiList.length ?
                      tongZhiList.map((item, index) => {
                        return(
                          <li key={item.notice_id}>
                            <div onClick={ ()=>this.linkTo(item.notice_id) }>
                              <span>{item.title}</span>
                              <span>{item.dt_add}</span>
                            </div>
                          </li>
                        )
                      })
                    :
                    <div style={{ padding: '0 0.7rem' }}>没有公告！</div>
                  }
                </ul>
              :
              <div className="loadings">
                <img src={require("../../../img/loading.gif")} alt="loading"/>
                <p>数据加载中...</p>
              </div>
            }
          </div>
          <div style={{ textAlign: 'center' }} ref="wrapper" onClick={this.loadMoreDataFn.bind(this, this)}>{ isLoadingMore ? "没有更多..." : "" }</div>
        </div>
      </div>
    )
  }
}

export default TongZhi
