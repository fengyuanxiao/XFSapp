import React, { Component } from 'react';
import { Icon, Button } from 'antd';
import { Link } from 'react-router-dom';
import Tabs from 'antd-mobile/lib/tabs';
import WhiteSpace from 'antd-mobile/lib/white-space';
import axios from 'axios';
import '../../../component/apis';

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
    axios.post(global.constants.website+'/api/task/mytasklist',{
      status: 5
    },{
      headers: {AppAuthorization: localStorage.getItem("token")}    //post 方法传 token
    })
    .then( res => {
      let resData = res.data.data;
      // console.log(resData.task_list);
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
    // console.log(e.title);
    if ( e.title === "待操作" ) {
      axios.post(global.constants.website+'/api/task/mytasklist',{
        status: 0,
      },{
        headers: {AppAuthorization: localStorage.getItem("token")}    //post 方法传 token
      })
      .then( res => {
        this.setState({
          statea: res.data.data.task_list,
        })
      })
      .catch( error => {
        console.log(error);
      })
    } else if ( e.title === "待返款" ) {
      axios.post(global.constants.website+'/api/task/mytasklist',{
        status: 1,
      },{
        headers: {AppAuthorization: localStorage.getItem("token")}    //post 方法传 token
      })
      .then( res => {
        this.setState({
          stateb: res.data.data.task_list,
        })
      })
      .catch( error => {
        console.log(error);
      })
    } else if ( e.title === "待评价" ) {
      axios.post(global.constants.website+'/api/task/mytasklist',{
        status: 3,
      },{
        headers: {AppAuthorization: localStorage.getItem("token")}    //post 方法传 token
      })
      .then( res => {
        this.setState({
          statec: res.data.data.task_list,
        })
      })
      .catch( error => {
        console.log(error);
      })
    } else {
      axios.post(global.constants.website+'/api/task/mytasklist',{
        status: 5,
      },{
        headers: {AppAuthorization: localStorage.getItem("token")}    //post 方法传 token
      })
      .then( res => {
        // console.log(res.data.data);
      })
      .catch( error => {
        console.log(error);
      })
    }
  }

  // 点击操作任务
  routerToWenda (item) {
    let this_ = this;
    localStorage.setItem("order_id", item);
    this_.props.history.push("/myTaskDetails");
  }

  //点击进入申诉详情页面
    routerToWendas (item) {
      let this_ = this;
      // console.log(item);
      this_.props.history.push({pathname: "/appealTaskDetails", state: {data: item}});
    }

  render() {
    const { statec,stateb,statea,datasShow,task_lists} = this.state;
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
                          <span style={{ display: 'flex' }}>
                            <img style={{ paddingRight: '5px' }} src={item.taskitem_pic} alt="平台图标"/>
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
                              item.is_appeal === 1 ?
                                <Button type="primary" onClick={ ()=>this.routerToWendas(item.order_id)}>该任务在申诉中</Button>
                              :
                              <Button type="primary"><Link to={{ pathname: '/myTaskDetails', state: item.order_id }}>{item.order_status_text}</Link></Button>
                            }
                          </div>
                          <div className="right-bottom">
                            <p className="paddingBottom">
                              <span>垫资{item.need_principal}元</span>
                              <span>{item.refundtext}</span>
                            </p>
                            <p className="taskss">请在{item.limittime}前操作</p>
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
          {/* 待返款 */}
          <div style={{ padding: '0.3rem 0.3rem', backgroundColor: '#fff' }}>
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
                          <span style={{ display: 'flex' }}>
                            <img style={{ paddingRight: '5px' }} src={item.taskitem_pic} alt="平台图标"/>
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
          {/* 待评价 */}
          <div style={{ padding: '0.3rem 0.3rem', backgroundColor: '#fff' }}>
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
                          <span style={{ display: 'flex' }}>
                            <img style={{ paddingRight: '5px' }} src={item.taskitem_pic} alt="平台图标"/>
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
          {/* 所有 */}
          <div style={{ padding: '0.3rem 0.3rem', backgroundColor: '#fff' }}>
            {/* 循环 all-task div */}
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
                            <p style={{ display: 'flex' }}>
                              <img style={{ paddingRight: '5px' }} src={item.taskitem_pic} alt="平台图标"/>
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
                                {
                                  item.is_appeal === 1 ?
                                    <Button type="primary" onClick={ ()=>this.routerToWendas(item.order_id)}>该任务在申诉中</Button>
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
