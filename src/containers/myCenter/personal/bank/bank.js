import React,{ Component } from 'react';
import { Icon, Form, Input, Button, Cascader, message  } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import lrz from 'lrz';
import ImagePicker from 'antd-mobile/lib/image-picker';
import ActivityIndicator from 'antd-mobile/lib/activity-indicator';
import WingBlank from 'antd-mobile/lib/wing-blank';

import '../../buyAdmin/buyAdmin.css';
import '../../../../component/apis';

const city_new = require('../../../../component/city.js');    //三级联动资源库
const phoneNum = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;   //手机号码正则
const data = [];
const FormItem = Form.Item;
const cityData = city_new.data.RECORDS;   //展示用户选择的省市区
const bankData = [
  {
    value:'中国农业银行',
    label:'中国农业银行',
  },
  {
    value:'中国银行',
    label:'中国银行',
  },
  {
    value:'招商银行',
    label:'招商银行',
  },
  {
    value:'交通银行',
    label:'交通银行',
  },
  {
    value:'中国工商银行',
    label:'中国工商银行',
  },
  {
    value:'中国邮政储蓄银行',
    label:'中国邮政储蓄银行',
  },
  {
    value:'上海浦东发展银行',
    label:'上海浦东发展银行',
  },
  {
    value:'平安银行',
    label:'平安银行',
  },
  {
    value:'中国建设银行',
    label:'中国建设银行',
  },
  {
    value:'民生银行',
    label:'民生银行',
  },
  {
    value:'中信银行',
    label:'中信银行',
  },
  {
    value:'光大银行',
    label:'光大银行',
  },
  {
    value:'兴业银行',
    label:'兴业银行',
  },
  {
    value:'广发银行',
    label:'广发银行',
  },
  {
    value:'华夏银行',
    label:'华夏银行',
  },
  {
    value:'上海银行',
    label:'上海银行',
  },
  {
    value:'北京银行',
    label:'北京银行',
  },
  {
    value:'渤海银行',
    label:'渤海银行',
  }
]
message.config({
  top: 300,
});

class Banks extends Component {
  constructor() {
    super();
    this.state = {
      animating: false,
      files: data,
    }
  }

  // 生命周期函数   componentWillMount执行完成后执行此处
  componentDidMount() {
    let this_ = this;
    axios.get(global.constants.website+'/api/index/realnamechange',
    {
      headers: {AppAuthorization: localStorage.getItem("token")}    //post 方法传 token
    })
    .then(function (response) {   //调用接口成功执行
      let responses = response.data.data;
      // console.log(responses);
      this_.props.form.setFieldsValue({
        realName: responses.bank_realname,          //用户所绑定的银行卡持有人名字
        ZhiHangName: responses.bank_branch,         //用户所绑定的银行卡支行名称
        BankCode: responses.bank_card_NO,           //用户所绑定的银行卡号
        bankTel: responses.bank_mobile,             //用户所绑定的银行卡预留的手机号
      })
    })
    .catch(function (error) {   //调用接口失败执行
      console.log(error);
    });
  }

  // 显示/隐藏浮层的回调
  onPopupVisibleChange = (e) => {
    // console.log(e);
    // if ( e === true ) {
    //   console.log("执行省接口");
    // }
  }
  // 省市区联动回调
  cityButton = (value) => {
    // console.log(value);
  }
  // 银行卡回调
  bankButton = (val) => {
    // console.log(val);
  }
  // 上传我的淘宝 支付宝示例图回调
  onUploadOne = (files, type, index) => {
    // console.log(files, type, index);
    if(type==='add'){
      lrz(files[0].url, {quality:0.1})
        .then((rst)=>{
            // 处理成功会执行
            // console.log(rst)
            // console.log(rst.base64);
            this.setState({
              tu1: rst.base64
            })
          })
    }else{
        this.setState({imagesrc01:''})
    }
    this.setState({
        files,
    });
  }

  // 数据提交、ajax交互
  handleSubmit = (e) => {
    e.preventDefault();
    let this_ = this;
    let _this = this.state.files
    let imgs = [this.state.tu1];    //保存图片集合
    this.props.form.validateFields((err, values) => {
      if ( !err === true && _this.length >= 1 ) {
        // console.log(values);    //用户将要提交的所有数据
        // 信息完成后 点击提交按钮调用ajax
        if ( !phoneNum.test(values.bankTel) ) {
          message.error("请输入正确的手机号码！")
        } else {
          this_.setState({ animating: true })            //数据提交中显示的login.....
          // let imgs = [values.images[0].url];            //保存图片集合
          axios.post(global.constants.website+'/api/index/bankcardcommit', {
            Bank: values.Bank,
            realName: values.realName,
            provinces: values.provinces,
            ZhiHangName: values.ZhiHangName,
            BankCode: values.BankCode,
            bankTel: values.bankTel,
            images: imgs,
          },
          {
            headers: {AppAuthorization: localStorage.getItem("token")}        //post 方法传 token
          })
          .then(function (response) {
            // console.log(response);
            let data_ = response.data;
            if ( data_.status ) {
              this_.setState({ animating: false })          //数据提交成功关闭login.....
              message.success(data_.msg);
              this_.props.history.push("/personal")
            } else {
              this_.setState({ animating: false })          //数据提交成功关闭login.....
              message.error(data_.msg);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
        }
      }else {
        message.error('请完善信息');
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { files, animating } = this.state;
    return(
      <div>
        <header className="tabTitle">
          <div className="return"><Link to="/personal"><Icon type="left" theme="outlined" />返回</Link></div>
          提现账号设置
        </header>
        <div className="buyAdmin-box">
          <WingBlank>
            <p className="buyAdmin-title">请务必完成以下信息</p>
            <Form style={{ height:'100%' }} onSubmit={this.handleSubmit}>
              <FormItem
                label="姓名："
              >
                {getFieldDecorator('realName', {
                  rules: [{ required: true, message: '请输入姓名!' }],
                })(
                  <Input className="buy-input" placeholder="请输入姓名" />
                )}
              </FormItem>
              <FormItem
                label="选择银行："
              >
                {getFieldDecorator('Bank', {
                  rules: [{ required: true, message: '请选择银行!' }],
                })(
                  <Cascader options={bankData} onChange={this.bankButton} placeholder="请选择银行" />
                )}
              </FormItem>
              <FormItem label="开户行：">
                {/* <Cascader options={options} onChange={this.onChange} placeholder="Please select" /> */}
                {getFieldDecorator('provinces', {
                  rules: [{ required: true, message: '请选择开户行!' }],
                })(
                  <Cascader options={cityData} onChange={this.cityButton} placeholder="请选择开户行" />
                )}
              </FormItem>
              <FormItem
                label="开户行支行名称："
              >
                {getFieldDecorator('ZhiHangName', {
                  rules: [{ required: true, message: '请输入开户行支行名称!' }],
                })(
                  <Input className="buy-input" placeholder="请输入开户行支行名称" />
                )}
              </FormItem>
              <FormItem
                label="银行卡号："
              >
                {getFieldDecorator('BankCode', {
                  rules: [{ required: true, message: '请输入银行卡号!' }],
                })(
                  <Input className="buy-input" type="Number" placeholder="请输入银行卡号" />
                )}
              </FormItem>
              <FormItem
                label="上传 银行卡正面图片"
              >
                {getFieldDecorator('images', {
                  rules: [{ required: true, message: '请上传银行卡正面截图!' }],
                })(
                  <ImagePicker
                    length={1}
                    files={files}
                    onChange={this.onUploadOne}
                    onImageClick={(index, fs) => console.log(index, fs)}
                    selectable={files.length < 1}
                    accept="image/gif,image/jpeg,image/jpg,image/png"
                  />
                )}
              </FormItem>
              <FormItem
                label="银行开户预留手机："
              >
                {getFieldDecorator('bankTel', {
                  rules: [{ required: true, message: '请输入银行开户预留手机!' }],
                })(
                  <Input className="buy-input" type="text" maxLength="11" placeholder="请输入银行开户预留手机" />
                )}
              </FormItem>
              {/* 查看截图上传示例图 */}
              <div className="look-shilitu" style={{ padding:0, fontSize: '0.8rem' }}>
                温馨提示：柜台登记的手机号码、姓名、卡号、必须一样；姓名必须与绑定的身份证名字和支付宝实名认证一致，请认真核对，填写不正确将导致返款失败！您的信息仅用于返款用途，小跳蛙将保证信息安全不泄漏，不用于其他用途。
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
      </div>
    )
  }
}

const Bank = Form.create()(Banks)
export default Bank
