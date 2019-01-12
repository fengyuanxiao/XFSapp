import React, { Component } from 'react';
import { Icon, Button } from 'antd';
import { Link } from 'react-router-dom';
import Tabs from 'antd-mobile/lib/tabs';
import WhiteSpace from 'antd-mobile/lib/white-space';
import axios from 'axios';

import './dianFuTask.css';

const tabs = [
  { title: '待操作' },
  { title: '待返款' },
  { title: '待评价' },
  { title: '所有' },
];

class DfTaskNo extends Component {
  constructor() {
    super();
    this.state = {
      datasShow: false,         //为true 显示任务列表
    }
  }

  componentWillMount() {
    axios.post('/api/task/mytasklist',{
      status: 5
    },{
      headers: {AppAuthorization: localStorage.getItem("token")}    //post 方法传 token
    })
    .then( res => {
      let resData = res.data.data;
      console.log(resData.task_list);
      this.setState({
        datasShow: true,                              //为true 显示任务列表
        task_lists: resData.task_list,                //任务列表数据
        // is_expire_data: resData.task_list.is_expire_data,       //在未完成的任务里面查看示否为过期任务
      });
    })
    .catch( error => {
      console.log(error);
    })
  }

  // Tabs 跳转传递不同类型参数
  onChange =(e) => {
    console.log(e.title);
    if ( e.title === "待操作" ) {
      axios.post('/api/task/mytasklist',{
        status: 0,
      },{
        headers: {AppAuthorization: localStorage.getItem("token")}    //post 方法传 token
      })
      .then( res => {
        console.log(res.data.data);
      })
      .catch( error => {
        console.log(error);
      })
    } else if ( e.title === "待返款" ) {
      axios.post('/api/task/mytasklist',{
        status: 1,
      },{
        headers: {AppAuthorization: localStorage.getItem("token")}    //post 方法传 token
      })
      .then( res => {
        console.log(res.data.data);
      })
      .catch( error => {
        console.log(error);
      })
    } else if ( e.title === "待评价" ) {
      axios.post('/api/task/mytasklist',{
        status: 3,
      },{
        headers: {AppAuthorization: localStorage.getItem("token")}    //post 方法传 token
      })
      .then( res => {
        console.log(res.data.data);
      })
      .catch( error => {
        console.log(error);
      })
    } else {
      axios.post('/api/task/mytasklist',{
        status: 5,
      },{
        headers: {AppAuthorization: localStorage.getItem("token")}    //post 方法传 token
      })
      .then( res => {
        console.log(res.data.data);
      })
      .catch( error => {
        console.log(error);
      })
    }
  }

  render() {
    const { datasShow,task_lists,is_expire_data } = this.state;
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
            {
              datasShow ?
                task_lists.map((item, index) => {
                  return(
                    <div className="all-task" key={index}>
                      <div className="left-img">
                        <img src={ item.goodspic } alt=""/>
                      </div>
                      <div className="right">
                        {/* top */}
                        <div className="right-top">
                          <span style={{ display: 'flex' }}>
                            <img style={{ paddingRight: '5px' }} src={item.taskitem_pic} alt="平台图标"/>
                            {item.user_taobao}
                          </span>
                          <span>
                            {item.addtime}
                          </span>
                        </div>
                        {/* center */}
                        {/* 显示所有，并且判断任务是否过期 */}
                        {
                          item.is_expire_data ?
                            <div>
                              <div className="right-center">
                                <p>￥{item.commission}</p>
                                {/* <Button type="primary"><Link to="/taskStateChild">{item.order_status_text}</Link></Button> */}

                                <Button type="primary" disabled>任务已过期</Button>
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
                              <Button type="primary"><Link to={{ pathname: '/myTaskDetails', state: item.order_id }}>{item.order_status_text}</Link></Button>
                            </div>
                            <div className="right-bottom">
                              <p className="paddingBottom">
                                <span>垫资{item.need_principal}元</span>
                                <span>{item.refundtext}</span>
                              </p>
                              <p className="taskss">请在{item.limittime}前操作</p>
                            </div>
                          </div>
                        }
                      </div>
                    </div>
                  )
                })
              :
              <div className="loading">
                <img src={require("../../../img/loading.gif")} alt="loading"/>
                <p>任务加载中...</p>
              </div>
            }
          </div>
        </Tabs>
        <WhiteSpace />
      </div>
    )
  }
}

export default DfTaskNo
