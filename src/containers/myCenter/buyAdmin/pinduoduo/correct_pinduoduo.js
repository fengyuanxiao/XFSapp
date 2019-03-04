import React,{ Component } from 'react';
import { Icon, Form, Input, Button, Cascader, Modal, message, Select } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ImagePicker from 'antd-mobile/lib/image-picker';
import ActivityIndicator from 'antd-mobile/lib/activity-indicator';
import WingBlank from 'antd-mobile/lib/wing-blank';

import '../buyAdmin.css';
import '../../../../component/apis';

const city_new = require('../../../../component/city.js');    //三级联动资源库
const data = [];      //上传图片集合
const FormItem = Form.Item;
const Option = Select.Option;
const options = city_new.data.RECORDS;    //展示用户选择的省市区
const phoneNum = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;   //手机号码正则
message.config({
  top: 300,
});

class Correct_pinduoduos extends Component {
  constructor(props) {
    super();
    this.state = {
      animating: false,
      files: data,
      shows: false,
      onevisible: false,
      twovisible: false,
      num: 0,                 //如果是false 点击确认绑定就传后台放回过来的图片路径，为true就传买手上传的图片
    }
  }

  componentWillMount () {

  }

  componentDidMount () {
    // 修改绑定买号返回已填写过的值
    let this_ = this;
    if ( this.props.location.state === undefined ) {
      message.warning('买号待审核中！');
      this_.props.history.push("/myCenter")
    } else {
      axios.post(global.constants.website+'/api/index/updateall_bind',
      {
        id: this.props.location.state.data,   //由父页面传过来的绑定平台id
      },
      {
        headers: {AppAuthorization: localStorage.getItem("token")}    //post 方法传 token
      })
      .then(function (response) {   //调用接口成功执行
        let responses = response.data.data;
        let datas = [responses.url1,responses.url2];        //存储后台放回过来的图片路径
        // console.log(responses);
        this_.props.form.setFieldsValue({
          Account: responses.nickname,                //账号名称
          GoodsName: responses.receiver,              //收货人
          address: responses.receiver_address,        //收货人详细地址
          GoodsPhone: responses.receiver_mobile,      //收货人手机号
          sex: responses.sex,   //性别
          // provinces: responses.provinces,          //省市区组合
          // images: responses.images,
        })
        this_.setState({
          files: datas,                             //让后端返回过来的图片 在页面做展示
          url1: responses.url1.url,                 //存储返回的图片
          url2: responses.url2.url,                 //存储返回的图片
        })
      })
      .catch(function (error) {   //调用接口失败执行
        console.log(error);
      });
    }
  }

  // 性别函数
  handleChange = (value) => {
    // console.log(value);
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
      num: 1,                  //如果买手上传新图触发 将改为true
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
    let states = this.state;
    let _this = this.state.files    //用户上传图片集合
    let fImgs = [states.url1, states.url2];     //储存后台放回需要反显得图片
    this.props.form.validateFields((err, values) => {
    // 图片集合存入imgs 传给后端
      let imgs = [];
      if ( states.num ) {                   //num为true 说明买手有新图片上传 并走新图去循环去base图路径
        for (var i = 0; i < values.images.length; i++) {
          imgs.push(values.images[i].url)
        }
      }
      if ( !err === true && _this.length === 2 ) {
        // 所有数据填写完毕后 进入下一阶段判断
        if ( !phoneNum.test(values.GoodsPhone) ) {
          message.error("请输入正确的手机号码！")
        } else {
          this_.setState({ animating: true })            //数据提交中显示的login.....
          // console.log(imgs);
          //以上数据都正确 在此 ajax交互
          axios.post(global.constants.website+'/api/index/updatepdd_bind',
          {
            Account: values.Account,                  //绑定帐号昵称
            GoodsName: values.GoodsName,              //收货人
            address: values.address,                  //收货人地址
            GoodsPhone: values.GoodsPhone,            //收货人手机号
            tb_order_sign: values.tb_order_sign,      //最近淘宝下单订单号
            provinces: values.provinces,              //省市区组合
            AlipayName: values.AlipayName,            //支付宝姓名
            images: states.num ? imgs : fImgs,        //图片集合
            sex: values.sex === "男" ? 1 : 2,         //性别
            id: this_.props.location.state.data       //id
          },
          {
            headers: {AppAuthorization: localStorage.getItem("token")}    //post 方法传 token
          })
          .then(function (response) {   //调用接口成功执行
            let data_ = response.data;
            if ( data_.status ) {
              this_.setState({ animating: false })          //数据提交成功关闭login.....
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
                  rules: [{ required: true, message: '请输入正确的淘宝旺旺账号：!' }],
                })(
                  <Input className="buy-input" onChange={ this.nicknameVal } placeholder="旺旺账号" />
                )}
              </FormItem>
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
                  <Select style={{ width: '100%' }} onChange={ this.handleChange }>
                    <Option value="男">男</Option>
                    <Option value="女">女</Option>
                  </Select>
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
                  <Input className="buy-input" type="text" maxLength="11" placeholder="收货人手机号" />
                )}
              </FormItem>
              <FormItem
                label="上传 个人中心截图: 和 拼多多订单截图:"
              >
                {getFieldDecorator('images', {
                  rules: [{ required: false, message: '请上传淘宝和支付宝截图!' }],
                })(
                  <ImagePicker
                    length={2}
                    files={files}
                    multiple={false}
                    onChange={this.onUploadOne}
                    onImageClick={(index, fs) => console.log(index, fs)}
                    selectable={files.length < 2}
                    accept="image/gif,image/jpeg,image/jpg,image/png"
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
            <img className="shilitu" src={require('../../../../img/mytaobao.png')} alt="我的淘宝" />
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
            <img className="shilitu" src={require('../../../../img/myzhifubao.png')} alt="我的支付宝" />
          </Modal>
      </div>
    )
  }
}

const Correct_pinduoduo = Form.create()(Correct_pinduoduos)
export default Correct_pinduoduo
