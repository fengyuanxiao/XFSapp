import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon, Form, Input, Button, Cascader, Modal, message  } from 'antd';
import ImagePicker from 'antd-mobile/lib/image-picker';
import ActivityIndicator from 'antd-mobile/lib/activity-indicator';
import WingBlank from 'antd-mobile/lib/wing-blank';
import axios from 'axios';
import lrz from 'lrz';

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
}];
let base64s = [];
let newArrs = [];

class BindPinduoduos extends Component {
  constructor() {
    super();
    this.state = {
      animating: false,
      files: data,
      onevisible: false,
      twovisible: false
    }
  }
  // 省市区联动回调
  onChange = (value) => {
    // console.log(value);
  }
  // 上传我的淘宝 支付宝示例图回调
  // onUploadOne = (files, type, index) => {
  //   // console.log(files, type, index);
  //   this.setState({
  //     files,
  //   });
  // }
  onUploadOne = (files, type, index) => {
    // console.log(files, type, index);
    // 循环没有压缩之前的base图片
    if ( type === "add" ) {
      for (var i = 0; i < files.length; i++) {
        base64s[i] = (function (num) {
          // return files[num].url
          // return出压缩图片
          return (
            lrz(files[num].url, {quality:0.2})
              .then((rst)=>{
                return rst                  //返回压缩之后的图片对象
              })
          )
        })(i);
      }
    } else {
      base64s.splice(index,1);      //如果类型不是 add 则删除数组中索引对应的图片base码
    }
    // console.log(base64s);
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
  // 隐藏示例图
  handleOk = (e) => {
    // console.log(e);
    this.setState({
      onevisible: false,
      twovisible: false,
    });
  }
  handleCancel = (e) => {
    // console.log(e);
    this.setState({
      onevisible: false,
      twovisible: false,
    });
  }

  // 数据提交、ajax交互
  handleSubmit = (e) => {
    e.preventDefault();
    let this_ = this;
    // 循环拿出已经压缩好的每一项base码
    for (var i = 0; i < base64s.length; i++) {
       newArrs[i] = {
           url: base64s[i]._value.base64,
       };
    }
    // console.log(newArrs);       //base64压缩图的集合
    let _this = this.state.files    //用户上传图片集合
    this.props.form.validateFields((err, values) => {
      // console.log(values);
      if ( !err === true && _this.length === 2 ) {
        // 所有数据填写完毕后 进入下一阶段判断
        if ( !phoneNum.test(values.GoodsPhone) ) {
          message.error("请输入正确的手机号码！")
        } else {
          this_.setState({ animating: true })            //数据提交中显示的login.....
          // 图片集合存入imgs 传给后端
          let imgs = [newArrs[0].url, newArrs[1].url];
          // console.log(imgs);
          //以上数据都正确 在此 ajax交互
          axios.post(global.constants.website+'/api/index/pdd_bind',
          {
            Account: values.Account,                  //绑定帐号昵称
            GoodsName: values.GoodsName,              //收货人
            address: values.address,                  //收货人地址
            GoodsPhone: values.GoodsPhone,            //收货人手机号
            tb_order_sign: values.tb_order_sign,      //最近淘宝下单订单号
            provinces: values.provinces,              //省市区组合
            AlipayName: values.AlipayName,            //支付宝姓名
            images: imgs,                             //图片集合
            sex: values.sex[0],                       //性别
          },
          {
            headers: {AppAuthorization: localStorage.getItem("token")}    //post 方法传 token
          })
          .then(function (response) {   //调用接口成功执行
            let data_ = response.data;
            if ( data_.status ) {
              this_.setState({ animating: false })      //数据提交成功关闭login.....
              message.success(data_.msg);
              this_.props.history.push("/buyAdmin")
            } else {
              message.warning(data_.msg);
            }
            // console.log(data_);
          })
          .catch(function (error) {   //调用接口失败执行
            console.log(error);
          });
        }
      }else {
        if ( _this.length > 2 ) {
          message.error('只能上传2张必要图片');
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
          绑定拼多多买号
        </header>
        <div className="buyAdmin-box">
          <WingBlank>
            <p className="buyAdmin-title">请务必完成以下信息</p>
            <Form style={{ height:'100%' }} onSubmit={this.handleSubmit}>
              <FormItem
                label="会员名称："
              >
                {getFieldDecorator('Account', {
                  rules: [{ required: true, message: '请输入会员名称!' }],
                })(
                  <Input className="buy-input" placeholder="拼多多会员名" />
                )}
              </FormItem>
              <FormItem
                label="收货人姓名："
              >
                {getFieldDecorator('GoodsName', {
                  rules: [{ required: true, message: '请输入收货人姓名!' }],
                })(
                  <Input className="buy-input" placeholder="收货人姓名" />
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
              <FormItem
                label="收货人手机"
              >
                {getFieldDecorator('GoodsPhone', {
                  rules: [{ required: true, message: '请输入收货人手机号码!' }],
                })(
                  <Input className="buy-input" type="text" maxLength={11} placeholder="收货人手机号" />
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
                label="上传 个人中心截图: 和 拼多多订单截图:"
              >
                {getFieldDecorator('images', {
                  rules: [{ required: true, message: '请上传淘宝和支付宝截图!' }],
                })(
                  <ImagePicker
                    length={2}
                    files={files}
                    multiple={false}
                    onChange={this.onUploadOne}
                    onImageClick={(index, fs) => console.log(index, fs)}
                    selectable={files.length < 2}
                  />
                )}
              </FormItem>
              {/* 查看截图上传示例图 */}
              <div className="look-shilitu">
                <p onClick={this.showOneShiliTu}>查看示例图>></p>
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
          <img className="shilitu" src={require('../../../../img/pinduoduo1.png')} alt="我的淘宝" />
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
          <img className="shilitu" src={require('../../../../img/pinduoduo2.png')} alt="我的支付宝" />
        </Modal>
      </div>
    )
  }
}

const BindPinduoduo = Form.create()(BindPinduoduos)
export default BindPinduoduo
