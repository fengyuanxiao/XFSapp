import React, { Component } from 'react';
import { Icon } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';    //ajax

import RouteTabComponent from '../../component/routeTab/routeTab';  //tabs
import DetailsPouduct from './detailsProduct/detailsProduct';
import TaskState from './taskState/taskState';
import TaskPlan from './taskPlan/taskPlan';
import './myTaskDetails.css';

class MyTaskDetails extends Component {
  constructor() {
    super();
    this.state = {
      datas: false,
    }
  }

  // componentWillMount () {
  //
  // }

  // 页面未加载就开始执行 生命周期函数，componentWillMount最先执行   此处函数调 ajax数据交互
  componentWillMount = () => {
    axios.post('api/task/myTaskDetail',
    {
      order_id: localStorage.getItem("order_id"),   //获取存储到本地的order_id
    },
    {
      headers: {AppAuthorization: localStorage.getItem("token")}    //post 方法传 token
    })
    .then(response => {
      let responses = response.data.data;
      console.log(responses);
        this.setState({
          datas: true,
          goodspic: responses.task_detail.goodspic,                         //商品图片
          itemprice: responses.task_detail.itemprice,                       //商品成交价
          itemnum: responses.task_detail.itemnum,                           //下单商品件数
          tasktype_pic: responses.tasktype_pic,                             //平台类型标识图片(淘宝或者京东其他的标识图片)
          ordertatusText: responses.ordertatusText,                         //订单中文状态
          time: responses.time,                                             //倒计时时间
          remark_pic: responses.task_detail.remark_pic,                     //商家要求图片
          order_message: responses.task_detail.order_message,               //订单要求
          order_id: responses.task_detail.order_id,                         //任务编号
          user_taobao: responses.task_detail.user_taobao,                   //买号
          chat_pay_content: responses.task_detail.chat_pay_content,         //聊天下单图片
          need_principal: responses.task_detail.need_principal,             //返款金额
          addtime: responses.task_detail.addtime,                           //接受任务的时间
        })
    })
    .catch(error => {
      console.log(error);
    })
    console.log(123);
  }

  render() {
    const { datas, goodspic, itemprice, itemnum, tasktype_pic, ordertatusText, time, remark_pic, order_message, order_id, user_taobao, chat_pay_content, need_principal, addtime } = this.state;
    return(
      <div>
        <header className="tabTitle">
          <div className="return"><Link to="/taskHallPage"><Icon type="left" theme="outlined" />返回</Link></div>
          我的任务详情
        </header>
        {/* 商品成交价格、件数 */}
        {/* <DetailsPouduct /> */}
        { datas ? <DetailsPouduct goodspic={goodspic} itemprice={itemprice} itemnum={itemnum} tasktype_pic={tasktype_pic} /> : "" }
        {/* 任务状态 */}
        { datas ? <TaskState tasktype_pic={tasktype_pic} ordertatusText={ordertatusText} time={time} remark_pic={remark_pic} order_message={order_message} /> : "" }
        {/* 任务进度 */}
        { datas ? <TaskPlan order_id={order_id} user_taobao={user_taobao} chat_pay_content={chat_pay_content} need_principal={need_principal} addtime={addtime} itemprice={itemprice} itemnum={itemnum} /> : "" }
        {/* tabs */}
        <RouteTabComponent />
      </div>
    )
  }
}

export default MyTaskDetails
