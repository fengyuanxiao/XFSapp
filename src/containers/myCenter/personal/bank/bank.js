import React,{ Component } from 'react';
import { Icon, Form, Input, Button, Cascader, message  } from 'antd';
import { Link } from 'react-router-dom';
// import { ImagePicker } from 'antd-mobile';
import ImagePicker from 'antd-mobile/lib/image-picker';
import axios from 'axios';    //ajax

// import http from '../../../../component/server';

import '../../buyAdmin/buyAdmin.css';

const city_new = require('../../../../component/city.js');    //三级联动资源库
// console.log(city_new.data.RECORDS);
const data = [];
const FormItem = Form.Item;
const cityData = city_new.data.RECORDS;   //展示用户选择的省市区
const bankData = [
  {
    value:'中国农业银行',
    label:'中国农业银行',
  },
  {
    value:'工商银行',
    label:'工商银行',
  },
  {
    value:'招商银行',
    label:'招商银行',
  }
]
message.config({
  top: 300,
});

class Banks extends Component {
  constructor() {
    super();
    this.state = {
      files: data,
    }
  }

  // 生命周期函数   最先执行函数
  componentWillMount() {
    // 获取省市区接口
    // axios.get('/api/user/getPrvoinveAreaList?parent_id=')
    // .then(response => {
    //   console.log(response.data.data);
    // })
    // .catch(error => {
    //   console.log(error);
    // })
    // console.log(cityData_new);
    // console.log("我最先执行");
  }
  // 生命周期函数   componentWillMount执行完成后执行此处
  componentDidMount() {
    console.log(321);
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
    console.log(value);
  }
  // 银行卡回调
  bankButton = (val) => {
    console.log(val);
  }
  // 上传我的淘宝 支付宝示例图回调
  onUploadOne = (files, type, index) => {
    console.log(files, type, index);
    this.setState({
      files,
    });
  }

  // 数据提交、ajax交互
  handleSubmit = (e) => {
    e.preventDefault();
    let _this = this.state.files
    this.props.form.validateFields((err, values) => {
      if ( !err === true && _this.length >= 1 ) {
        console.log(values);    //用户将要提交的所有数据
        // 信息完成后 点击提交按钮调用ajax

        axios.post('/api/user/checkedauth', {
          citys: values.note4,
        })
        .then(function (response) {
          console.log(response);
          if ( response.data.msg ) {
            message.success('提交成功，待审核！');
          } else {
            message.error(response.data.status);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
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
          <div className="return"><Link to="/personal"><Icon type="left" theme="outlined" />返回</Link></div>
          提现账号设置
        </header>
        <div className="buyAdmin-box">
          <p className="buyAdmin-title">请务必完成以下信息</p>
          <Form style={{ height:'100%' }} onSubmit={this.handleSubmit}>
            <FormItem
              label="姓名："
            >
              {getFieldDecorator('note1', {
                rules: [{ required: true, message: '请输入姓名!' }],
              })(
                <Input className="buy-input" placeholder="请输入姓名" />
              )}
            </FormItem>
            <FormItem
              label="选择银行："
            >
              {getFieldDecorator('note3', {
                rules: [{ required: true, message: '请选择银行!' }],
              })(
                <Cascader options={bankData} onChange={this.bankButton} placeholder="请选择银行" />
              )}
            </FormItem>
            <FormItem label="开户行：">
              {/* <Cascader options={options} onChange={this.onChange} placeholder="Please select" /> */}
              {getFieldDecorator('note4', {
                rules: [{ required: true, message: '请选择开户行!' }],
              })(
                <Cascader options={cityData} onChange={this.cityButton} placeholder="请选择开户行" />
              )}
            </FormItem>
            <FormItem
              label="开户行支行名称："
            >
              {getFieldDecorator('note5', {
                rules: [{ required: true, message: '请输入开户行支行名称!' }],
              })(
                <Input className="buy-input" placeholder="请输入开户行支行名称" />
              )}
            </FormItem>
            <FormItem
              label="银行卡号："
            >
              {getFieldDecorator('note6', {
                rules: [{ required: true, message: '请输入银行卡号!' }],
              })(
                <Input className="buy-input" type="Number" placeholder="请输入银行卡号" />
              )}
            </FormItem>
            <FormItem
              label="上传 银行卡正面截图"
            >
              {getFieldDecorator('note8', {
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
              {getFieldDecorator('note7', {
                rules: [{ required: true, message: '请输入银行开户预留手机!' }],
              })(
                <Input className="buy-input" type="text" maxLength="11" placeholder="请输入银行开户预留手机" />
              )}
            </FormItem>
            {/* 查看截图上传示例图 */}
            <div className="look-shilitu" style={{ padding:0, fontSize: '0.8rem' }}>
              温馨提示：柜台登记的手机号码、姓名、卡号、必须一样；姓名必须与绑定的身份证名字和支付宝实名认证一致，请认真核对，填写不正确将导致返款失败！您的信息仅用于返款用途，小浣熊将保证信息安全不泄漏，不用于其他用途。
            </div>

            <Button className="btn-buy" type="primary" htmlType="submit">
              确认绑定
            </Button>
          </Form>
        </div>
      </div>
    )
  }
}

const Bank = Form.create()(Banks)
export default Bank
