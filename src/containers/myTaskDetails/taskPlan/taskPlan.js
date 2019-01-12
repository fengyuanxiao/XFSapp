import React, { Component } from 'react';
import { Progress, Modal, message  } from 'antd';
import { Link } from 'react-router-dom';

class TaskPlan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      previewVisibleOne: false,
    }
    // console.log(props);
  }

  // 点击图片显示截图
  showsShili = (item) => {
    this.setState({
      previewVisibleOne: true,
      photosLink: item,
    });
    // console.log(item);
  }
  //点击隐藏截图
  handleCancel = () => {
    this.setState({
      previewVisibleOne: false,
    })
  }

  // 催返款，没啥用就安慰刷手而已
  reminder = () => {
    message.success("商家会48小时内还款！")
  }

  render() {
    const { photosLink,previewVisibleOne } = this.state;
    const { is_addcomments,receive_evaluate_content,taobao_ordersn, addtime, need_principal, order_id, user_taobao, itemprice, itemnum, chat_pay_content, order_status } = this.props;
    return(
      <div className="task-plan">
        <div className="plan">
          <Progress className="plan-child" type="circle" percent={ order_status === 0? 25 : (order_status === 1? 50 : (order_status ===3? 75 : 100 )) } width={80} />
          <p>下一步：请点击操作任务按钮操作</p>
        </div>
        <div className="plan-box">
          <p className="title"><b className="plan-title">接受任务</b><span>{addtime}</span></p>
          <p className="task-plan-list"><span>任务编号</span><span>{order_id}</span></p>
          <p className="task-plan-list"><span>买号</span><span>{user_taobao}</span></p>
          <div className="task-plan-list"><span>商品金额</span><span>{itemprice}*{itemnum}件</span></div>
        </div>
        {/* 任务要求 */}
        <div className="plan-box">
          <p className="title"><b className="plan-title">一：任务要求</b><span></span></p>
          <p className="task-plan-list"><span>货比三家</span><span></span></p>
          <p className="task-plan-list"><span>浏览店铺</span><span></span></p>
          <div className="task-plan-list"><span>聊天下单</span>
            <div className="task-plan-list-img">
              {/* {
                numbers === 1?
                  <img onClick={this.handlePreviewOne} src={ chat_pay_content ? chat_pay_content[0] : require('../../../img/img2.png') } alt="聊天截图" />
                : (numbers === 2?
                  <img onClick={this.handlePreviewOne} src={ chat_pay_content ? chat_pay_content[0] : require('../../../img/img2.png') } alt="聊天截图" />
                  <img onClick={this.handlePreviewTwo} src={ chat_pay_content ? chat_pay_content[1] : require('../../../img/img2.png') } alt="聊天截图" />
                : (numbers === 3?
                  <img onClick={this.handlePreviewOne} src={ chat_pay_content ? chat_pay_content[0] : require('../../../img/img2.png') } alt="聊天截图" />
                  <img onClick={this.handlePreviewTwo} src={ chat_pay_content ? chat_pay_content[1] : require('../../../img/img2.png') } alt="聊天截图" />
                  <img onClick={this.previewVisibleTwos} src={ chat_pay_content ? chat_pay_content[2] : require('../../../img/img2.png') } alt="聊天截图" />
                : 'd'))
              } */}
              {/* 聊天下单截图饭显 */}
              {
                chat_pay_content ?
                  chat_pay_content.map((item, index) => {
                    return(
                      <img key={index} onClick={()=>this.showsShili(item)} src={ item } alt="聊天截图" />
                    )
                  })
                :
                ""
              }
              {/* 聊天截图的隐藏域  点击显示截图 */}
              <Modal visible={previewVisibleOne} footer={null} onCancel={this.handleCancel}>
                <img alt="example" style={{ width: '100%' }} src={photosLink} />
              </Modal>
            </div>
          </div>
          <div className="task-plan-list">
            <span className="ask-start">如商家有要求优先按商家要求操作</span>
            <button style={ order_status === 0 ? {backgroundColor: '#66caa8'} : {backgroundColor: '#ccc'} }>操作任务</button>
          </div>
        </div>
        {/* 商家确定订单 */}
        <div className="plan-box">
          <p className="title"><b className="plan-title">二：商家确定订单</b></p>
          <p className="task-plan-list"><span>支付宝商户订单号</span><span>{taobao_ordersn}</span></p>
          <p className="task-plan-list"><span>返款方式</span><span>平台返款</span></p>
          <p className="task-plan-list"><span>返款账号</span><span>默认返款账号</span></p>
          <p className="task-plan-list"><span>返款金额</span><span>{need_principal}</span></p>
          <div className="task-plan-list">
            <span className="ask-start">平台规定商家48小时内还款</span>
            <button onClick={ order_status === 1 ? this.reminder : this.aa } style={ order_status === 1 ? {backgroundColor: '#66caa8'} : {backgroundColor: '#ccc'} }>催返款</button>
          </div>
        </div>
        {/* 收货好评 */}
        <div className="plan-box">
          <p className="title"><b className="plan-title">三：收货好评</b><span></span></p>
          <div className="task-plan-list"><span>物流截图，五星好评</span>
            <div className="task-plan-list-img">
              {/* 循环出物流截图和好评截图显示 */}
              {
                receive_evaluate_content ?
                  receive_evaluate_content.map((item, index) => {
                    return(
                      <img key={index} onClick={()=>this.showsShili(item)} src={ item } alt="物流截图" />
                    )
                  })
                :
                ""
              }
            </div>
          </div>
          <div className="task-plan-list">
            <span className="ask-start">此单为普通五星好评 点击查看评价要求</span>
            {
              order_status === 3 ?
                <button style={{backgroundColor: '#66caa8'}}><Link style={{ color: '#fff' }} to={{ pathname: "/goodPingJia", state: order_id }}>去收货好评</Link></button>
              :
              <button style={{backgroundColor: '#ccc'}}>去收货好评</button>
            }
          </div>
        </div>
        {/* 追加评论 */}
        {
          is_addcomments ?
            <div className="plan-box">
              <p className="title"><b className="plan-title">三：收货好评</b><span></span></p>
              <div className="task-plan-list"><span>追评截图</span>
                <div className="task-plan-list-img">
                  {/* 循环出物流截图和好评截图显示 */}
                  {
                    receive_evaluate_content ?
                      receive_evaluate_content.map((item, index) => {
                        return(
                          <img key={index} onClick={()=>this.showsShili(item)} src={ item } alt="物流截图" />
                        )
                      })
                    :
                    ""
                  }
                </div>
              </div>
              <div className="task-plan-list">
                <span className="ask-start">此单需要追评 点击查看追评图片</span>
                {
                  order_status === 3 ?
                    <button style={{backgroundColor: '#66caa8'}}><Link style={{ color: '#fff' }} to={{ pathname: "/goodPingJia", state: order_id }}>去收货好评</Link></button>
                  :
                  <button style={{backgroundColor: '#ccc'}}>去追加评论</button>
                }
              </div>
            </div>
          :
          ""
        }
        {/* 任务完成 */}
        <div className="plan-box">
          <p className="title"><b className="plan-title">{ is_addcomments? "五" : "四" }：完成任务</b><span></span></p>
          <div className="task-plan-list">
            <span className="ask-start">平台规定商家48小时内返款</span>
            <button style={ order_status === 9 ? {backgroundColor: '#66caa8'} : {backgroundColor: '#ccc'} }>获得本金</button>
          </div>
        </div>
      </div>
    )
  }
}

export default TaskPlan
