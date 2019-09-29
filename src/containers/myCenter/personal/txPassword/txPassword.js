import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon, Form, Input, Button, message } from 'antd';
import axios from 'axios';
import ActivityIndicator from 'antd-mobile/lib/activity-indicator';
import WingBlank from 'antd-mobile/lib/wing-blank';
import '../../../../component/apis';

const FormItem = Form.Item;
// let phoneNum = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;   //手机号码正则

class TxPasswords extends Component {
  constructor() {
    super();
    this.state = {
      animating: false,
      code: null,           //图形验证码val
    }
  }

  UNSAFE_componentWillMount() {
    // 进入登录手机号页面 调用图片验证码获取图片
    axios.get(global.constants.website+'/api/user/getcaptcha')
    .then(response => {
      this.setState({
        tuCodeLink: response.data.data.captcha_src,
        sid: response.data.data.sid,
      })
    })
    .catch(error => {
      console.log(error);
    })
  }

  componentDidMount() {
    // 获取手机号码接口
    axios.get(global.constants.website+'/api/index/getmobilephone',
    {
      headers: {AppAuthorization: localStorage.getItem("token")}        //post 方法传 token
    })
    .then( response => {
      // console.log(response.data);
      this.props.form.setFieldsValue({
        numbers: response.data.data.phone,                //获取手机号
      });
      this.setState({
        placeholder: response.data.data.phone
      })
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  // 处理内存泄露
  componentWillUnmount = () => {
    this.setState = (state,callback)=>{
      return;
    };
  }

  // 点击图片验证码重新获取 图片
  getVerifyCode = () => {
    axios.get(global.constants.website+'/api/user/getcaptcha')
    .then(response => {
      this.setState({
        tuCodeLink: response.data.data.captcha_src,
        sid: response.data.data.sid,
      })
    })
    .catch(error => {
      console.log(error);
    })
    // console.log(this.state.tuCode);
  }
  // 修改图片验证码值
  tuCodes = (e) => {
    this.setState({
      code: e.target.value
    })
  }

  // 获取短信验证码按钮
  duanXinCodeBtn = () => {
    let this_ = this;
    let datas = this.state;
    if ( datas.code === null ) {
      message.error("请输入图形验证码！");
    } else {
      // 调用手机获取验证码接口
      axios.post(global.constants.website+'/api/user/sendcode',
      {
        phoneNum: datas.placeholder,
        tuCode: datas.code,
        sid: datas.sid,
      },
      {
        headers: {AppAuthorization: localStorage.getItem("token")}        //post 方法传 token
      })
      .then( response=> {
        // console.log(response);
        if ( response.data.status ) {
          // 短信倒计时 60秒
          let codeNum = datas.codeNum;
          const timer = setInterval(() => {
          this_.setState({
            getCodesState:false,
            phoneCode: response.data.code,
            codeNum: (codeNum--)
            }, () => {
                if (codeNum === 0) {
                clearInterval(timer);
                this_.setState({
                  getCodesState: true,
                  codeNum: 60,
                  TestGetCode: "重新获取"
                })
              }
            })
          }, 1000);
          message.success(response.data.msg);
        } else {
          message.error(response.data.msg);
        }
      })
      .catch( error=> {
        console.log(error);
      });
      // message.success("获取验证码中");
    }
  }

  // 提交表单按钮、ajax提交数据
  handleSubmit = (e) => {
    e.preventDefault();
    let this_ = this;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this_.setState({ animating: true });            //数据提交中显示的login.....
        axios.post(global.constants.website+'/api/index/changeCashPassword', {
          smscode: values.dongtaiCode,
          password: values.newPassword,
          repassword: values.okNewPassword,
        },{
          headers: {AppAuthorization: localStorage.getItem("token")}        //post 方法传 token
        })
        .then( response => {
          if ( response.data.status ) {
            this_.setState({ animating: false })          //数据提交成功关闭login.....
            message.error(response.data.msg);
            this_.props.history.push('/personal')      //跳入跟换正确的手机号码页面
          } else {
            this_.setState({ animating: false })          //数据提交成功关闭login.....
            message.error(response.data.msg);
          }
        })
        .catch( error => {
          console.log(error);
        })
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { animating, tuCodeLink } = this.state;
    return(
      <div>
        <header className="tabTitle">
          <div className="return"><Link to="/personal"><Icon type="left" theme="outlined" />返回</Link></div>
          提现密码设置
        </header>
        <WingBlank>
          <Form onSubmit={this.handleSubmit} className="login-form" style={{ padding: '3.5rem 0.7rem 0 0.7rem' }}>
            <FormItem
              label="图片验证码"
            >
              <div style={{ display: 'flex' }}>
                <img style={{ width: "80%" }} src={ tuCodeLink } alt="图片验证码"/>
                <Button style={{ height: 'auto' }} onClick={ this.getVerifyCode }>刷新</Button>
              </div>
              {/* <img onClick={ this.getVerifyCode } style={{ width: "100%" }} src={ tuCodeLink } alt="图片验证码"/> */}
              {getFieldDecorator('tpCode', {
                rules: [{ required: true, message: '请输入图片验证码!' }],
              })(
                <Input onChange={ this.tuCodes } className="buy-input" type="text" placeholder="请输入图片验证码" />
              )}
            </FormItem>
            <FormItem
              label="新密码"
            >
              {getFieldDecorator('newPassword', {
                rules: [{ required: true, message: '请输入新密码!' }],
              })(
                <Input className="buy-input" placeholder="请输入新密码" maxLength={11} />
              )}
            </FormItem>
            <FormItem
              label="确认密码"
            >
              {getFieldDecorator('okNewPassword', {
                rules: [{ required: true, message: '请输入确认密码!' }],
              })(
                <Input className="buy-input" type="text" placeholder="请输入确认密码" />
              )}
            </FormItem>
            <FormItem
              label="手机号"
            >
              {getFieldDecorator('numbers', {
                rules: [{ required: true, message: '请输入手机号!' }],
              })(
                <Input onChange={ this.numbersPlace } maxLength={11} className="buy-input" type="text" placeholder="请输入手机号码" />
              )}
            </FormItem>
            <FormItem
              label="动态码"
            >
              {getFieldDecorator('dongtaiCode', {
                rules: [{ required: true, message: '请输入动态码!' }],
              })(
                <Input className="buy-input" type="text" placeholder="请输入动态码" />
              )}
            </FormItem>
            <Button type="primary" onClick={this.duanXinCodeBtn} className="accountBtn">获取短信验证码</Button>
            <Button type="primary" htmlType="submit" className="accountBtn">提交</Button>
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
    )
  }
}

const TxPassword = Form.create()(TxPasswords);
export default TxPassword
