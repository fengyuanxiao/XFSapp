import React, { Component } from 'react';
import { Icon,message,Modal,Button } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';    //ajax

import RouteTabComponent from '../../component/routeTab/routeTab';  //tabs
import DetailsPouduct from './detailsProduct/detailsProduct';
import TaskState from './taskState/taskState';
import TaskPlan from './taskPlan/taskPlan';
import './myTaskDetails.css';
import '../../component/apis';

class MyTaskDetails extends Component {
  constructor(props) {
    super();
    this.state = {
      datas: false,
      visible: true,
    }
  }


  // 页面未加载就开始执行 生命周期函数，componentWillMount最先执行   此处函数调 ajax数据交互
  componentDidMount = () => {
    let this_ = this;
    axios.post(global.constants.website+'/api/task/myTaskDetail',
    {
      order_id: localStorage.getItem("order_id"),   //获取存储到本地的order_id
      order_type: localStorage.getItem("order_type"),
    },
    {
      headers: {AppAuthorization: localStorage.getItem("token")}    //post 方法传 token
    })
    .then(response => {
      let responses = response.data.data;
      // console.log(responses);
        if ( response.data.status === "_0001" ) {
            message.success(response.data.msg, successSkip => {
              localStorage.removeItem("token");
              this_.props.history.push("/");
              window.location.reload();
            })
        } else if ( response.data.status === false ) {
            message.success("任务异常")
          this_.props.history.push("/dfTaskChe");
        } else {
          this.setState({
            datas: true,
          goodspic: responses.task_detail.goodspic,                                       //商品图片
          taobao_ordersn: responses.task_detail.taobao_ordersn,                           //支付宝商户订单号
          itemprice: responses.task_detail.itemprice,                                     //商品成交价
          itemnum: responses.task_detail.itemnum,                                         //下单商品件数
          tasktype_pic: responses.tasktype_pic,                                           //平台类型标识图片(淘宝或者京东其他的标识图片)
          ordertatusText: responses.ordertatusText,                                       //订单中文状态
          time: responses.time,                                                           //倒计时时间
          remark_pic: responses.task_detail.remark_pic,                                   //商家要求图片
          remark: responses.task_detail.remark,                                           //商家要求文字
          order_message: responses.task_detail.order_message,                             //订单留言
          is_limit_cancle: responses.task_detail.is_limit_cancle,                         //1表示再撤销需要警告提醒，0代表不需要
          order_id: responses.task_detail.order_id,                                       //任务编号
          task_type: responses.task_detail.task_type,                                     //task_type为1是浏览任务
          user_taobao: responses.task_detail.user_taobao,                                 //买号
          chat_pay_content: responses.task_detail.chat_pay_content,                       //聊天下单图片
          platformname: responses.platformname,                                           //商家平台
          receive_evaluate_content: responses.task_detail.receive_evaluate_content,       //物流和好评截图
          addition_pic: responses.task_detail.addition_pic,                               //追评截图
          need_principal: responses.task_detail.need_principal,                           //返款金额
          addtime: responses.task_detail.addtime,                                         //接受任务的时间
          order_status: responses.task_detail.order_status,                               //订单状态
          is_addcomments: responses.task_detail.is_addcomments,                           //是否需要追评 0：不需要 1：需要
          is_muti_keyword: responses.task_detail.is_muti_keyword,                         //是否是多关键词，1表示多关键词、0代表不是
          shop_around_time: responses.task_detail.shop_around_time,                       //有值代表多关键词任务第一步已提交并审核 没有值代表还未操作第一步
          fav_flow_content: responses.task_detail.fav_flow_content,                       //浏览任务反显图片
          })
        }
    })
    .catch(error => {
      console.log(error);
    })
    // console.log(123);
  }

  // 买手撤销任务超过三次，显示提醒
  handleOk = e => {
    this.setState({
      visible: false,
    });
  };
  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };
  hiddenBtn = () => {
    this.setState({
      visible: false,
    });
  }

  render() {
    const { fav_flow_content,task_type,is_limit_cancle,remark,platformname,addition_pic,is_addcomments,receive_evaluate_content,taobao_ordersn, shop_around_time, is_muti_keyword, order_status, datas, goodspic, itemprice, itemnum, tasktype_pic, ordertatusText, time, remark_pic, order_message, order_id, user_taobao, chat_pay_content, need_principal, addtime } = this.state;
    return(
      <div>
        <header className="tabTitle">
          <div className="return"><Link to="/myTask"><Icon type="left" theme="outlined" />返回</Link></div>
          我的任务详情
        </header>
        {
          is_limit_cancle ?
            <Modal
              title="频繁撤销提示"
              visible={this.state.visible}
              onOk={this.handleOk}
              footer={<Button onClick={this.hiddenBtn}>知道了</Button>}
              onCancel={this.handleCancel}
            >
              <p>亲 请勿频繁撤销任务 撤销次数过多平台将采取一定措施惩罚！</p>
            </Modal>
          :
            ''
        }
        {/* 商品成交价格、件数 */}
        {/* <DetailsPouduct /> */}
        {/* <DetailsPouduct goodspic={goodspic} itemprice={itemprice} itemnum={itemnum} tasktype_pic={tasktype_pic} /> */}
        { datas ? <DetailsPouduct goodspic={goodspic} itemprice={itemprice} itemnum={itemnum} tasktype_pic={tasktype_pic} /> : "" }
        {/* 任务状态 */}
        {/* <TaskState history={this.props.history} task_type={task_type} remark={remark} order_id={order_id} order_status={order_status} shop_around_time={shop_around_time} is_muti_keyword={is_muti_keyword} tasktype_pic={tasktype_pic} ordertatusText={ordertatusText} time={time} remark_pic={remark_pic} order_message={order_message} /> */}
        { datas ? <TaskState history={this.props.history} task_type={task_type} remark={remark} order_id={order_id} order_status={order_status} shop_around_time={shop_around_time} is_muti_keyword={is_muti_keyword} tasktype_pic={tasktype_pic} ordertatusText={ordertatusText} time={time} remark_pic={remark_pic} order_message={order_message} /> : "" }
        {/* 任务进度 */}
        {/* <TaskPlan fav_flow_content={fav_flow_content} task_type={task_type} platformname={platformname} addition_pic={addition_pic} is_addcomments={is_addcomments} receive_evaluate_content={receive_evaluate_content} taobao_ordersn={taobao_ordersn} order_status={order_status} order_id={order_id} user_taobao={user_taobao} chat_pay_content={chat_pay_content} need_principal={need_principal} addtime={addtime} itemprice={itemprice} itemnum={itemnum} /> */}
        { datas ? <TaskPlan fav_flow_content={fav_flow_content} task_type={task_type} platformname={platformname} addition_pic={addition_pic} is_addcomments={is_addcomments} receive_evaluate_content={receive_evaluate_content} taobao_ordersn={taobao_ordersn} order_status={order_status} order_id={order_id} user_taobao={user_taobao} chat_pay_content={chat_pay_content} need_principal={need_principal} addtime={addtime} itemprice={itemprice} itemnum={itemnum} /> : "" }
          {/* tabs */}
          <RouteTabComponent />
        </div>
    )
  }
}

export default MyTaskDetails
