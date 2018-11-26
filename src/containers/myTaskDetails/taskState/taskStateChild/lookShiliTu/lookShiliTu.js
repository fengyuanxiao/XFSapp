import React, { Component } from 'react';
import { Modal, Input, Button, Form, message  } from 'antd';
import { ImagePicker } from 'antd-mobile';

// import TaskStateUpload from '../taskStateUpload/taskStateUpload';

const FormItem = Form.Item;
const data = [];

message.config({
  top: 300,
});

class LookShiliTus extends Component {
  constructor() {
    super();
    this.state = {
      onevisible: false,
      twovisible: false,
      threevisible: false,
      files: data,
    }
    // this.showOneShiliTu = this.showOneShiliTu.bind(this);
    // this.showTwoShiliTu = this.showTwoShiliTu.bind(this);
    // this.showThreeShiliTu = this.showThreeShiliTu.bind(this);
    // this.heDuiName = this.heDuiName.bind(this);
  }

  // 货比三家示例图
  showOneShiliTu = () => {
    this.setState({
      onevisible: true,
    })
    console.log(123);
  }
  // 浏览店铺示例图
  showTwoShiliTu = () => {
    this.setState({
      twovisible: true
    })
  }
  // 聊天下单支付示例图
  showThreeShiliTu = () => {
    this.setState({
      threevisible: true
    })
  }

  // 核对商家店铺名是否正确
  heDuiName = () =>  {
    console.log("核对商家店铺名是否正确");
    console.log(this);
  }

  handleOk = (e) => {
    console.log(e);
    this.setState({
      onevisible: false,
      twovisible: false,
      threevisible: false
    });
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      onevisible: false,
      twovisible: false,
      threevisible: false
    });
  }

  // 上传聊天截图 支付宝账单截图
  onChange = (files, type, index) => {
    // console.log(files);
    this.setState({
      files,
    });
  }

  // 操作任务页面 实付金额、支付宝商户订单号
  handleSubmit = (e) => {
    e.preventDefault();
    let _this = this.state.files
    this.props.form.validateFields((err, values) => {
      if ( !err === true && _this.length >= 2 ) {
        let objs = {
          val: values,
          tu: _this
        }
        // 此处执行ajax请求
        console.log('要传给后端的数据', objs);
        console.log('要传给后端的数据', objs.val);
        console.log('要传给后端的数据', objs.tu);
      }else {
        message.error('请完善信息');
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { files } = this.state;
    return(
      <div>
        {/* 第一步货比三家 */}
        <div className="task-plan buzhou">
          <div className="buzou-title"><span>第一步 货比三家</span><span onClick={this.showOneShiliTu}>点击查看示例</span></div>
          <p>.请确认使用双方各（淘宝账号）登入手机淘宝APP</p>
          <p>.打开手机淘宝，在搜索框手动输入指定关键词</p>
          <p>.按任务要求先浏览任意三家同类产品1-3分钟</p>
          <h3 style={{ color:'#c15958', marginTop:'1rem' }}>核对商家店铺名是否正确</h3>
          <div className="shop-title">
            <span>1</span><span>商家店铺名称:京*旗舰店</span>
          </div>
          <div className="shop-title">
            <span>2</span>
            <Input placeholder="请在此输入店铺名核对" />
            <Button type="primary" onClick={ this.heDuiName }>核对</Button>
          </div>
        {/* 第二步 浏览店铺 */}
          <div className="buzou-title"><span>第二步 浏览店铺</span><span onClick={this.showTwoShiliTu}>点击查看示例</span></div>
          <p>.找到任务商家对应店铺产品并点击进入，浏览任务商品详情2-3分钟</p>
          <p>.把任务商品加入购物车，并同时浏览该店铺任意一款商品1分钟</p>
          <p>.返回任务商品，直接点击购买（警示：勿从购物车提交订单)</p>
        {/* 第三步 聊天下单支付 */}
          <div className="buzou-title"><span>第三步 聊天下单支付</span><span onClick={this.showThreeShiliTu}>点击查看示例</span></div>
          <p>.需按商家要求选择是否聊天下单支付，或直接提交订单不聊天</p>
          <p>.付款完成后，进人支付宝账单详情页面，截图上传</p>
          <p style={{ color:'red', fontWeight:'bold' }}>.如商家备注无需聊天，聊天图上传支付宝账单替代</p>
        {/* 支付宝 账单截图 */}
        <ImagePicker
          length={2}
          files={files}
          onChange={this.onChange}
          onImageClick={(index, fs) => console.log(index, fs)}
          selectable={files.length < 2}
          accept="image/gif,image/jpeg,image/jpg,image/png"
        />

          <p>注：请上传<span style={{ fontWeight:'bold',fontSize:'1rem',color:'red' }}>聊天截图</span>和<span style={{ fontWeight:'bold',fontSize:'1rem',color:'red' }}>支付宝账单截图</span></p>
          <div className="buzou-title"><span style={{ color:'#63bb95' }}>第四步 订单信息核对</span></div>
          <p>应垫付金额:100元(请按实际垫付金额填写，实际相差超50元请取消任务)</p>
          <p style={{ color: 'red', fontWeight:'bold', marginBottom:'1rem' }}>商户订单号可在支付宝账单详情中复制</p>
          <Form className="login-form" layout="inline" onSubmit={this.handleSubmit}>
            <FormItem>
              {getFieldDecorator('money', {
                rules: [{ required: true, message: '请输入实际付款金额!' }],
              })(
                <Input type="Number" placeholder="请输入实际付款金额" className="jineInput" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('orderNumber', {
                rules: [{ required: true, message: '请输入支付宝商户订单号!' }],
              })(
                <Input placeholder="请输入支付宝商户订单号" className="jineInput" />
              )}
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit" className="login-form-button">
                提交任务
              </Button>
            </FormItem>
          </Form>
        </div>


        {/* 第一步货比三家的图片示例 */}
        <Modal
          visible={this.state.onevisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          maskClosable={true}
          okText={"知道了"}
          cancelText={"关闭"}
        >
          <img className="shilitu" src={require('../../../../../img/4444.jpg')} alt="货比三家" />
        </Modal>
        {/* 第二步浏览店铺的图片示例 */}
        <Modal
          visible={this.state.twovisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          maskClosable={true}
          okText={"知道了"}
          cancelText={"关闭"}
        >
          <img className="shilitu" src={require('../../../../../img/5555.jpg')} alt="浏览店铺" />
        </Modal>
        {/* 第三步聊天下单支付的图片示例 */}
        <Modal
          visible={this.state.threevisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          maskClosable={true}
          okText={"知道了"}
          cancelText={"关闭"}
        >
          <img className="shilitu" src={require('../../../../../img/6666.jpg')} alt="聊天下单" />
        </Modal>
      </div>
    )
  }
}

const LookShiliTu = Form.create()(LookShiliTus);
export default LookShiliTu
