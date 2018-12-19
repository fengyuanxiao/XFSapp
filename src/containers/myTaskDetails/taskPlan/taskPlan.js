import React, { Component } from 'react';
import { Progress, Modal  } from 'antd';
import { Link } from 'react-router-dom';

import oneImg from '../../../img/mytaobao.png';
import twoImg from '../../../img/img2.png';
import threeImg from '../../../img/img2.png';
import fourImg from '../../../img/img2.png'

class TaskPlan extends Component {
  constructor() {
    super();
    this.state = {
      previewVisibleOne: false,
      previewVisibleTwo: false,
      previewVisibleThree: false,
      previewVisibleFour: false,
      previewImageOne: oneImg,
      previewImageTwo: twoImg,
      previewImageThree: threeImg,
      previewImageFour: fourImg,
    }
  }

  // 点击图片显示截图
  handlePreviewOne = () => {this.setState({previewVisibleOne: true})}
  handlePreviewTwo = () => {this.setState({  previewVisibleTwo: true})}
  handlePreviewThree = () => {this.setState({  previewVisibleThree: true})}
  handlePreviewFour = () => {this.setState({  previewVisibleFour: true})}

  //点击隐藏截图
  handleCancel = () => {
    this.setState({
      previewVisibleOne: false,
      previewVisibleTwo: false,
      previewVisibleThree: false,
      previewVisibleFour: false,
    })
  }

  render() {
    const { previewVisibleOne, previewVisibleTwo, previewVisibleThree, previewVisibleFour, previewImageOne, previewImageTwo, previewImageThree, previewImageFour } = this.state;
    return(
      <div className="task-plan">
        <div className="plan">
          <Progress className="plan-child" type="circle" percent={25} width={80} />
          <p>下一步：请点击操作任务按钮操作</p>
        </div>
        <div className="plan-box">
          <p className="title"><b className="plan-title">接受任务</b><span>2018-10-27 09:21:51</span></p>
          <p className="task-plan-list"><span>任务编号</span><span>13</span></p>
          <p className="task-plan-list"><span>买号</span><span>双方各</span></p>
          <div className="task-plan-list"><span>商品金额</span><span>100.00元*1件</span></div>
        </div>
        {/* 任务要求 */}
        <div className="plan-box">
          <p className="title"><b className="plan-title">一：任务要求</b><span></span></p>
          <p className="task-plan-list"><span>货比三家</span><span></span></p>
          <p className="task-plan-list"><span>浏览店铺</span><span></span></p>
          <div className="task-plan-list"><span>聊天下单</span>
            <div className="task-plan-list-img">
              <img onClick={this.handlePreviewOne} src={require('../../../img/img2.png')} alt="聊天截图" />
              <img onClick={this.handlePreviewTwo} src={require('../../../img/img2.png')} alt="聊天截图" />
              {/* 聊天截图的隐藏域  点击显示截图 */}
              <Modal visible={previewVisibleOne} footer={null} onCancel={this.handleCancel}>
                <img alt="example" style={{ width: '100%' }} src={previewImageOne} />
              </Modal>
              <Modal visible={previewVisibleTwo} footer={null} onCancel={this.handleCancel}>
                <img alt="example" style={{ width: '100%' }} src={previewImageTwo} />
              </Modal>
            </div>
          </div>
          <div className="task-plan-list"><span className="ask-start">如商家有要求优先按商家要求操作</span><button><Link to="/taskStateChild">操作任务</Link></button></div>
        </div>
        {/* 商家确定订单 */}
        <div className="plan-box">
          <p className="title"><b className="plan-title">二：商家确定订单</b></p>
          <p className="task-plan-list"><span>支付宝商户订单号</span><span>123456789111234575</span></p>
          <p className="task-plan-list"><span>返款方式</span><span>平台返款</span></p>
          <p className="task-plan-list"><span>返款账号</span><span>默认返款账号</span></p>
          <div className="task-plan-list"><span>返款金额</span><span>100.00元</span></div>
        </div>
        {/* 收货好评 */}
        <div className="plan-box">
           <p className="title"><b className="plan-title">三：收货好评</b><span></span></p>
           <div className="task-plan-list"><span>物流截图，五星好评</span>
              <div className="task-plan-list-img">
                <img onClick={this.handlePreviewThree} src={require('../../../img/img2.png')} alt="聊天截图" />
                <img onClick={this.handlePreviewFour} src={require('../../../img/img2.png')} alt="聊天截图" />
                  {/* 聊天截图的隐藏域  点击显示截图 */}
                  <Modal visible={previewVisibleThree} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImageThree} />
                  </Modal>
                  <Modal visible={previewVisibleFour} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImageFour} />
                  </Modal>
              </div>
           </div>
           <div className="task-plan-list"><span className="ask-start">此单为普通五星好评 点击查看评价要求</span><button><Link to="/goodPingJia">去收货好评</Link></button></div>
         </div>
         {/* 任务完成 */}
         <div className="plan-box">
           <p className="title"><b className="plan-title">四：完成任务</b><span></span></p>
           <div className="task-plan-list"><span className="ask-start">平台规定商家48小时内返款</span><button style={{ color:'#fff' }}>获得本金</button></div>
         </div>
      </div>
    )
  }
}

export default TaskPlan
