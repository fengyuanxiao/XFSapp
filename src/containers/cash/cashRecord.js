import React, { Component } from 'react';
import { Icon } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import Tabs from 'antd-mobile/lib/tabs';
import Modal from 'antd-mobile/lib/modal';
import WhiteSpace from 'antd-mobile/lib/white-space';

import './cash.css';
import '../../component/apis';

const alert = Modal.alert;

var page = 1;

class cashRecord extends Component {
  constructor() {
    super();
    this.state = {
      datasState: false,      //进入任务大厅调用ajax 请求延时状态
      isLoadingMore: false    //为true 不在调用滚动执行ajax
    }
  }

  componentWillMount() {
    page = 1;
    axios.get(global.constants.website+'/api/index/applycashlist?page=' + page,{headers: {AppAuthorization: localStorage.getItem("token")}})
    .then( res => {
      let datas = res.data.data;
      // console.log(datas);
      this.setState({
        datasState: true,
        datasLists: datas,                      //本金提现列表
      });
      if ( datas[0].lately_check_content ) {
        this.setState({
          lately_check_content: datas[0].lately_check_content,
        })
        this.jieruBtn()
      }
        // console.log(res.data.data);
    })
    .catch(error => {
      console.log(error);
    });
  }
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
    let datasLists = that.state.datasLists;
    axios.get(global.constants.website+'/api/index/applycashlist?page=' + ++page,{headers: {AppAuthorization: localStorage.getItem("token")}})
    .then( res => {
      let datas = res.data.data;
      // console.log(datas);
      // resData.task_list没有数据的时候 停止调用滚动
      if ( datas.length === 0 ) {
        that.setState({
          isLoadingMore: true,
        })
        // console.log(1);
      }
      for (var i = 0; i < datas.length; i++) {
        datasLists.push(datas[i])
      }
      that.setState({
        datasLists: datasLists,                      //本金提现列表
      });
        // console.log(res.data.data);
    })
    .catch(error => {
      console.log(error);
    });
  }

  // 申请平台介入按钮
  jieruBtn = () => {
    alert('提现未通过', this.state.lately_check_content, [
      {text: '知道了', onPress: () => {console.log('知道了')}},
    ])
  }



  render() {
    const { datasLists,datasState, isLoadingMore } = this.state;
    return(
      <div>
        <header className="tabTitle">
          <div className="return"><Link to="/myCenter"><Icon type="left" theme="outlined" />返回</Link></div>
          提现记录
        </header>
        <WhiteSpace style={{ paddingTop: '3rem' }} />
        {/* 本金提现 */}
        <div>
          <div className="cash_Record">
            <p>实际到账金额</p>
            <p>状态</p>
            <p>时间</p>
          </div>
          <div className="App">
            {
              datasState ?
                <ul className="caseList">
                  {
                    datasLists.length ?
                      datasLists.map((item, index) => {
                        return(
                          <li key={index} className={item.status === 0 ? "lis" : (item.status === 1 ? "lia" : "lib")}>
                            <p>{item.to_account_money}</p>
                            {
                              item.status === 1?
                                <p>已审核</p>
                              :
                              (item.status === 0?
                                <p>审核中</p>
                              :
                              <p>未通过</p>)
                            }
                            <p>{item.addtime}</p>
                          </li>
                        )
                      })
                    :
                    <li className="null-list">没有提现记录^-^</li>
                  }
                </ul>
              :
              <div className="loading">
                <img src={require("../../img/loading1.gif")} alt="loading"/>
                <p>加载中...</p>
              </div>
            }
          </div>
          <div style={{ textAlign: 'center' }} ref="wrapper" onClick={this.loadMoreDataFn.bind(this, this)}>{ isLoadingMore ? "没有更多..." : "加载更多..." }</div>
        </div>
        <WhiteSpace />
      </div>
    )
  }
}

export default cashRecord
