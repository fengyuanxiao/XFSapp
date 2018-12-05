import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon, Modal, Radio, Button } from 'antd';
import ImagePicker from 'antd-mobile/lib/image-picker';

import './questionsTask.css';

const RadioGroup = Radio.Group;
// const FormItem = Form.Item;
const data = [];

class QuestionsTask extends Component {
  constructor() {
    super();
    this.state= {
      visible: false,           //示例图显示状态
      value: 1,                 //单选框 刷手选择的问题
      files: data,              //上传图片数据
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
    // console.log(e.target.value);
    this.setState({
      value: e.target.value,
    });
  }

  // 上传我的淘宝 支付宝示例图回调
  onUploadOne = (files, type, index) => {
    // console.log(files, type, index);
    this.setState({
      files,
    });
  }

  // 提交商家审核按钮
  submitBtn = () => {
    let _this = this.state;
    let objs = {
      value: _this.value,
      files: _this.files
    }
    console.log(objs);
  }

  render() {

    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };
    const { files } = this.state;

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
            <p style={{ textAlign: 'center', color: 'red' }}>注：如有问题文字过长请左右拖动查看</p>
            <RadioGroup onChange={this.onChange} value={this.state.value} style={{ width: '100%', wordBreak: 'keep-all', overflow: 'auto' }}>
              <Radio style={radioStyle} value={1}>接口了奇偶ID建瓯市的攻击我接口了奇偶ID击我接口了奇击我接口了奇</Radio>
              <Radio style={radioStyle} value={2}>各供热仍无人违反问坏人3我仍无人违反问坏人3我</Radio>
              <Radio style={radioStyle} value={3}>还人工模拟哦及水电费是的</Radio>
            </RadioGroup>
          </div>
          <ImagePicker
            length={1}
            files={files}
            onChange={this.onUploadOne}
            onImageClick={(index, fs) => console.log(index, fs)}
            selectable={files.length < 1}
            accept="image/gif,image/jpeg,image/jpg,image/png"
          />
        </div>
        <Button onClick={ this.submitBtn } className="btn-buy" type="primary">点击提交商家审核</Button>


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
