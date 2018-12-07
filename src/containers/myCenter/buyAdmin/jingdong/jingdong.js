import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon, Form, Input, Button, Cascader, Modal, message  } from 'antd';
import ImagePicker from 'antd-mobile/lib/image-picker';

import '../buyAdmin.css';

const city_new = require('../../../../component/city.js');    //三级联动资源库
const data = [];
const FormItem = Form.Item;
const options = city_new.data.RECORDS;    //展示用户选择的省市区
message.config({
  top: 300,
});

class BindJingdongs extends Component {
  constructor() {
    super();
    this.state = {
      files: data,
      onevisible: false,
      twovisible: false,
      threevisible: false
    }
  }
  // 省市区联动回调
  onChange = (value) => {
    console.log(value);
  }
  // 上传我的淘宝 支付宝示例图回调
  onUploadOne = (files, type, index) => {
    console.log(files, type, index);
    this.setState({
      files,
    });
  }
  // 查看我的淘宝 支付宝 示例图
  showOneShiliTu = () => {
    this.setState({
      onevisible: true,
    })
    // console.log(123);
  }
  showTwoShiliTu = () => {
    this.setState({
      twovisible: true,
    })
  }
  showThreehiliTu = () => {
    this.setState({
      threevisible: true,
    })
  }
  // 隐藏示例图
  handleOk = (e) => {
    // console.log(e);
    this.setState({
      onevisible: false,
      twovisible: false,
      threevisible: false,
    });
  }
  handleCancel = (e) => {
    // console.log(e);
    this.setState({
      onevisible: false,
      twovisible: false,
      threevisible: false,
    });
  }

  // 数据提交、ajax交互
  handleSubmit = (e) => {
    e.preventDefault();
    let _this = this.state.files
    this.props.form.validateFields((err, values) => {
      if ( !err === true && _this.length >= 2 ) {
        console.log(values);
        message.success('提交成功，待审核！');
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
        <header className="tabTitle">
          <div className="return"><Link to="/buyAdmin"><Icon type="left" theme="outlined" />返回</Link></div>
          绑定京东买号
        </header>
        <div className="buyAdmin-box">
          <p className="buyAdmin-title">请务必完成以下信息</p>
          <Form style={{ height:'100%' }} onSubmit={this.handleSubmit}>
            <FormItem
              label="会员名称:"
            >
              {getFieldDecorator('note1', {
                rules: [{ required: true, message: '请输入正确的京东会员名!' }],
              })(
                <Input className="buy-input" placeholder="请设置京东会员名称！" />
              )}
            </FormItem>
            {/* <FormItem
              label="最近的淘宝订单号："
              >
              {getFieldDecorator('note2', {
                rules: [{ required: true, message: '请输入正确的淘宝订单号!' }],
              })(
                <Input className="buy-input" placeholder="淘宝订单号" />
              )}
            </FormItem> */}
            <FormItem
              label="收货人姓名："
            >
              {getFieldDecorator('note3', {
                rules: [{ required: true, message: '请输入收货人姓名!' }],
              })(
                <Input className="buy-input" placeholder="姓名" />
              )}
            </FormItem>
            <FormItem label="所在地区：">
              {/* <Cascader options={options} onChange={this.onChange} placeholder="Please select" /> */}
              {getFieldDecorator('note4', {
                rules: [{ required: true, message: '请完全所在地区!' }],
              })(
                <Cascader options={options} onChange={this.onChange} placeholder="所在地区" />
              )}
            </FormItem>
            <FormItem
              label="详细地址"
            >
              {getFieldDecorator('note5', {
                rules: [{ required: true, message: '请输入详细地址!' }],
              })(
                <Input className="buy-input" placeholder="详细地址" />
              )}
            </FormItem>
            <FormItem
              label="收货人手机"
            >
              {getFieldDecorator('note6', {
                rules: [{ required: true, message: '请输入收货人手机号码!' }],
              })(
                <Input className="buy-input" type="text" maxLength="11" placeholder="收货人手机号" />
              )}
            </FormItem>
            <FormItem
              label="上传 个人中心截图、京东账户设置 和 实名认证截图"
            >
              {getFieldDecorator('note8', {
                rules: [{ required: true, message: '请上传淘宝和支付宝截图!' }],
              })(
                <ImagePicker
                  length={3}
                  files={files}
                  onChange={this.onUploadOne}
                  onImageClick={(index, fs) => console.log(index, fs)}
                  selectable={files.length < 3}
                  accept="image/gif,image/jpeg,image/jpg,image/png"
                />
              )}
            </FormItem>
            {/* 查看截图上传示例图 */}
            <div style={{ padding: "0 1rem" }} className="look-shilitu">
              <p style={{ fontSize:"0.7rem" }} onClick={this.showOneShiliTu}>查看淘宝示例图>></p>
              <p style={{ fontSize:"0.7rem" }} onClick={this.showTwoShiliTu}>查看支付宝示例>></p>
              <p style={{ fontSize:"0.7rem" }} onClick={this.showThreehiliTu}>查看支付宝示例>></p>
            </div>

            <Button className="btn-buy" type="primary" htmlType="submit">
              确认绑定
            </Button>
          </Form>
        </div>

        {/* 我的淘宝示例图 */}
        <Modal
          visible={this.state.onevisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          maskClosable={true}
          okText={"知道了"}
          cancelText={"关闭"}
        >
          <img className="shilitu" src={require('../../../../img/jd1.png')} alt="我的淘宝" />
        </Modal>
        {/* 我的支付宝示例图 */}
        <Modal
          visible={this.state.twovisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          maskClosable={true}
          okText={"知道了"}
          cancelText={"关闭"}
        >
          <img className="shilitu" src={require('../../../../img/jd2.png')} alt="我的支付宝" />
        </Modal>
        {/* 我的支付宝示例图 */}
        <Modal
          visible={this.state.threevisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          maskClosable={true}
          okText={"知道了"}
          cancelText={"关闭"}
        >
          <img className="shilitu" src={require('../../../../img/jd3.png')} alt="我的支付宝" />
        </Modal>
      </div>
    )
  }
}

const BindJingdong = Form.create()(BindJingdongs)
export default BindJingdong
