import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon, Modal, Radio } from 'antd';

import './questionsTask.css';

const RadioGroup = Radio.Group;

class QuestionsTask extends Component {
  constructor() {
    super();
    this.state= {
      visible: false,
      value: 1
    }
  }

  // 点击查看示例图按钮  显示
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  // 点击知道了按钮隐藏示例图
  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  // 点击关闭按钮隐藏示例图
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  // 问答任务单选框
  onChange = (e) => {
    console.log('radio checked', e.target.value);
    this.setState({
      value: e.target.value,
    });
  }

  render() {

    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };

    return(
      <div>
        <header className="tabTitle">
          <div className="return"><Link to="/taskHallPage"><Icon type="left" theme="outlined" />返回</Link></div>
          问答任务
        </header>
        <div className="questionsTask-box">
          <h2>注意：此类任务需要商家审核，如商家审核未通过做了该任务没有佣金</h2>
          <div className="product-details">
            <img src={require("../../../img/custom-qq_03.png")} alt="产品主图"/>
            <p>飞鹤奶粉宝宝奶粉 君乐宝 乐铂 400g 三段</p>
          </div>
          <p className="lookShili" onClick={ this.showModal }>查看示例图>></p>
          <div className="taskList">
            <p>商家需要回答的问题列表：(请选择互动消息中收到的问答)</p>
            <RadioGroup onChange={this.onChange} value={this.state.value}>
              <Radio style={radioStyle} value={1}>接口了奇偶ID建瓯市的攻击我</Radio>
              <Radio style={radioStyle} value={2}>各供热仍无人违反问坏人3我</Radio>
              <Radio style={radioStyle} value={3}>还人工模拟哦及水电费是的</Radio>
            </RadioGroup>
          </div>
        </div>


        <Modal
          title="示例图"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText={"知道了"}
          cancelText={"关闭"}
        >
          <img className="shilitu" src={require("../../../img/wenda.png")} alt="问答任务示例图" />
        </Modal>
      </div>
    )
  }
}

export default QuestionsTask
