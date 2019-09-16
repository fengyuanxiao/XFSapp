import React,{ Component } from 'react';
import { Icon, Form, Input, Button, Cascader, Modal, message  } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ImagePicker from 'antd-mobile/lib/image-picker';
import ActivityIndicator from 'antd-mobile/lib/activity-indicator';
import WingBlank from 'antd-mobile/lib/wing-blank';

import '../buyAdmin.css';
import '../../../../component/apis';

const city_new = require('../../../../component/city.js');    //三级联动资源库
const data = [];
const FormItem = Form.Item;
const options = city_new.data.RECORDS;    //展示用户选择的省市区
const phoneNum = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;   //手机号码正则
message.config({
  top: 300,
});
const sexs = [{
  value: '1',
  label: '男',
},{
  value: '2',
  label: '女',
}]

class BindWykls extends Component {
  constructor() {
    super();
    this.state = {
      animating: false,
      files: data,
      onevisible: false,
      twovisible1: false,
      twovisible: false,
      visible: false,         //提交成功弹框提示
    }
  }

  // 省市区联动回调
  onChange = (value) => {
    // console.log(value);
  }
  // 上传我的淘宝 支付宝示例图回调
  onUploadOne = (files, type, index) => {
    // console.log(files, type, index);
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
  showTwoShiliTu1 = () => {
    this.setState({
      twovisible1: true,
    })
  }
  showTwoShiliTu = () => {
    this.setState({
      twovisible: true,
    })
  }
  // 隐藏示例图
  handleOk = (e) => {
    // console.log(e);
    this.setState({
      onevisible: false,
      twovisible1: false,
      twovisible: false,
    });
  }
  handleCancel = (e) => {
    // console.log(e);
    this.setState({
      onevisible: false,
      twovisible1: false,
      twovisible: false,
    });
  }
  hiddenBtn = () => {
    message.success(this.state.msgs);
    this.props.history.push("/buyAdmin")
  }

  // 数据提交、ajax交互
  handleSubmit = (e) => {
    e.preventDefault();
    let this_ = this;
    // let states = this.state;
    let _this = this.state.files    //用户上传图片集合
    this.props.form.validateFields((err, values) => {
      if ( !err === true && _this.length === 3 ) {
        // 所有数据填写完毕后 进入下一阶段判断
        if ( !phoneNum.test(values.GoodsPhone) ) {
          message.error("请输入正确的手机号码！")
        } else {
          this_.setState({ animating: true })            //数据提交中显示的login.....
          // console.log(values);
          // 图片集合存入imgs 传给后端
          let imgs = [values.images[0].url, values.images[1].url, values.images[2].url]
          // console.log(imgs);
          //以上数据都正确 在此 ajax交互
          axios.post(global.constants.website+'/api/index/wykl_bind',
          {
            Account: values.Account,                  //绑定帐号昵称
            GoodsName: values.GoodsName,              //收货人
            address: values.address,                  //收货人地址
            GoodsPhone: values.GoodsPhone,            //收货人手机号
            provinces: values.provinces,              //省市区组合
            images: imgs,                             //图片集合
            sex: values.sex[0],                       //性别
          },
          {
            headers: {AppAuthorization: localStorage.getItem("token")}    //post 方法传 token
          })
          .then(function (response) {   //调用接口成功执行
            let data_ = response.data;
            if ( data_.status ) {
              this_.setState({ animating: false })          //数据提交成功关闭login.....
              this_.setState({
                visible: true,
                msgs: data_.msg,
              })
            } else {
              this_.setState({ animating: false })          //数据提交成功关闭login.....
              message.warning(data_.msg);
            }
            // console.log(data_);
          })
          .catch(function (error) {   //调用接口失败执行
            console.log(error);
          });
        }
      }else {
        if ( _this.length > 3 ) {
          message.error('只能上传3张必要图片');
        } else {
          message.error('请完善信息');
        }
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { files, animating } = this.state;
    return(
      <div>
        <header className="tabTitle">
          <div className="return"><Link to="/buyAdmin"><Icon type="left" theme="outlined" />返回</Link></div>
          绑定网易考拉买号
        </header>
        <div className="buyAdmin-box">
          <WingBlank>
            <Form style={{ height:'100%' }} onSubmit={this.handleSubmit}>
              <FormItem
                label="网易考拉买号："
              >
                {getFieldDecorator('Account', {
                  rules: [{ required: true, message: '请输入正确的考拉买号：!' }],
                })(
                  <Input className="buy-input" placeholder="网易考拉买号" />
                )}
              </FormItem>
              {/* <FormItem
                label="最近的淘宝订单号："
                >
                {getFieldDecorator('tb_order_sign', {
                  rules: [{ required: true, message: '请输入正确的淘宝订单号!' }],
                })(
                  <Input onChange={ this.maxlength } className="buy-input" maxLength={11} placeholder="淘宝订单号" />
                )}
              </FormItem> */}
              <FormItem
                label="收货人姓名："
              >
                {getFieldDecorator('GoodsName', {
                  rules: [{ required: true, message: '请输入收货人姓名!' }],
                })(
                  <Input className="buy-input" placeholder="姓名" />
                )}
              </FormItem>
              <FormItem
                label="姓别："
              >
                {getFieldDecorator('sex', {
                  rules: [{ required: true, message: '请输入姓别!' }],
                })(
                  // <Input className="buy-input" placeholder="性别" />
                    <Cascader options={sexs} onChange={this.onChange} placeholder="性别" />
                )}
              </FormItem>
              <FormItem label="所在地区：">
                {/* <Cascader options={options} onChange={this.onChange} placeholder="Please select" /> */}
                {getFieldDecorator('provinces', {
                  rules: [{ required: true, message: '请完全所在地区!' }],
                })(
                  <Cascader options={options} onChange={this.onChange} placeholder="所在地区" />
                )}
              </FormItem>
              <FormItem
                label="详细地址"
              >
                {getFieldDecorator('address', {
                  rules: [{ required: true, message: '请输入详细地址!' }],
                })(
                  <Input className="buy-input" placeholder="详细地址" />
                )}
              </FormItem>
              <FormItem
                label="收货人手机"
              >
                {getFieldDecorator('GoodsPhone', {
                  rules: [{ required: true, message: '请输入收货人手机号码!' }],
                })(
                  <Input className="buy-input" type="text" maxLength={11} placeholder="收货人手机号" />
                )}
              </FormItem>
              {/* <FormItem
                label="支付宝姓名"
                >
                {getFieldDecorator('AlipayName', {
                  rules: [{ required: true, message: '请输入支付宝姓名!' }],
                })(
                  <Input className="buy-input" placeholder="支付宝姓名" />
                )}
              </FormItem> */}
              <FormItem
                label="上传 个人中心截图 和 个人信息截图 和 实名认证截图"
              >
                {getFieldDecorator('images', {
                  rules: [{ required: true, message: '请个人中心截图、个人信息截图和实名认证截图!' }],
                })(
                  <ImagePicker
                    length={3}
                    files={files}
                    onChange={this.onUploadOne}
                    onImageClick={(index, fs) => console.log(index, fs)}
                    selectable={files.length < 3}
                    multiple={false}
                  />
                )}
              </FormItem>
              {/* 查看截图上传示例图 */}
              <div style={{ fontSize: '12px' }} className="look-shilitu">
                <p onClick={this.showOneShiliTu}>查看示例图>></p>
                <p onClick={this.showTwoShiliTu1}>查看示例图>></p>
                <p onClick={this.showTwoShiliTu}>查看示例图>></p>
              </div>

              <Button className="btn-buy" type="primary" htmlType="submit">
                确认绑定
              </Button>
              <div className="toast-example">
                <ActivityIndicator
                  toast
                  text="数据提交中..."
                  animating={animating}
                />
              </div>
            </Form>
          </WingBlank>
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
          <img className="shilitu" src={require('../../../../img/wykl3.jpg')} alt="个人中心截图" />
        </Modal>
        {/* 我的最近订单详情截图 */}
        <Modal
          visible={this.state.twovisible1}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          maskClosable={true}
          okText={"知道了"}
          cancelText={"关闭"}
        >
          <img className="shilitu" src={require('../../../../img/wykl1.jpg')} alt="个人信息截图" />
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
          <img className="shilitu" src={require('../../../../img/wykl2.jpg')} alt="实名认证截图" />
        </Modal>

        <Modal
          title="恭喜您提交成功"
          closable={false}
          visible={this.state.visible}
          footer={<Button type="primary" onClick={this.hiddenBtn}>知道了</Button>}
        >
          <p>请添加专属客服微信：xiaomeng666444 联系客服审核账号！</p>
        </Modal>
      </div>
    )
  }
}

const BindWykl = Form.create()(BindWykls)
export default BindWykl
