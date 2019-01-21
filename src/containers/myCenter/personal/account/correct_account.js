import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Icon, Form, Input, Button, message } from 'antd';
import ActivityIndicator from 'antd-mobile/lib/activity-indicator';
import WingBlank from 'antd-mobile/lib/wing-blank';

const FormItem = Form.Item;
const phoneNum = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;   //手机号码正则

class Correct_Accounts extends Component {
  constructor(props) {
    super();
    this.state = {
      animating: false,
      placeholder: "请输入手机号码",
      code: null,
      getCodesState: true,
      codeNum: 60,        //倒计时 60 秒
      TestGetCode: "获取验证码",
    }
    // console.log(props);
  }

  componentWillMount() {
    // 进入登录手机号页面 调用图片验证码获取图片
    axios.get('/api/user/getcaptcha')
    .then(response => {
      // console.log(response.data.data);
      this.setState({
        tuCodeLink: response.data.data.captcha_src,
        sid: response.data.data.sid,
      })
      // console.log(response.data.data);
    })
    .catch(error => {
      console.log(error);
    })
  }
  componentWillUnmount = () => {
    this.setState = (state,callback)=>{
      return;
    };
  }

  // 点击图片验证码重新获取 图片
  getVerifyCode = () => {
    axios.get('/api/user/getcaptcha')
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
  tuCodes = (e) => {
    this.setState({
      code: e.target.value
    })
  }

  // 电话号码 onChange事件修改 placeholder值 让短信验证码按钮判断调用获取验证码接口
  numbersPlace = (e) => {
    this.setState({
      placeholder: e.target.value
    })
  }

  // 获取短信验证码按钮
  duanXinCodeBtn = () => {
    let dataCode_ = this.state;
    let this_ = this;
    if ( dataCode_.placeholder === "请输入手机号码" || !phoneNum.test(dataCode_.placeholder) ) {
      message.error("请输入正确的手机号码！");
    }else if (dataCode_.code === null) {
      message.error("请输入图形验证码！");
    } else  {
      // 再次调用获取验证码接口
      axios.post('/api/user/sendcode',
      {
        phoneNum: dataCode_.placeholder,
        tuCode: dataCode_.code,
        sid: dataCode_.sid,
      },
      {
        headers: {AppAuthorization: localStorage.getItem("token")}        //post 方法传 token
      })
      .then( response=> {
        // console.log(response);
        if ( response.data.status ) {
          // 短信倒计时 60秒
          let codeNum = dataCode_.codeNum;
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
    }
  }

  // 提交表单按钮、ajax提交数据
  nextHandleSubmit = (e) => {
    e.preventDefault();
    let Submitthis = this;
    let scode = Submitthis.props.location.state.scode;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        Submitthis.setState({ animating: true });            //数据提交中显示的login.....
        axios.post('api/index/changemobileTwo', {
          scode: scode,
          mobile: values.numb,
          password: values.loginPassword,
          smscode: values.dtCode,
        },
        {
          headers: {AppAuthorization: localStorage.getItem("token")}        //post 方法传 token
        })
        .then( response => {
          // console.log(response.data);
          if ( response.data.status ) {
            Submitthis.setState({ animating: false })          //数据提交成功关闭login.....
            message.success(response.data.msg);
              this.props.history.push('/personal')      //跳入跟换正确的手机号码页面
          } else {
            Submitthis.setState({ animating: false })          //数据提交成功关闭login.....
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
    const { animating, tuCodeLink, TestGetCode, getCodesState, codeNum } = this.state;
    return(
      <div>
        <header className="tabTitle">
          <div className="return"><Link to="/personal"><Icon type="left" theme="outlined" />返回</Link></div>
          修改登录手机号
        </header>
        <WingBlank>
          <Form onSubmit={this.handleSubmit} className="login-form" style={{ padding: '3.5rem 0.7rem 0 0.7rem' }}>
            <FormItem
              label="手机号"
            >
              {getFieldDecorator('numb', {
                rules: [{ required: true, message: '请输入手机号码!' }],
              })(
                <Input className="buy-input"  onChange={ this.numbersPlace } maxLength="11" placeholder={ this.state.placeholder } />
              )}
            </FormItem>
            <FormItem
              label="图片验证码"
            >
              <img onClick={ this.getVerifyCode } style={{ width: "100%" }} src={ tuCodeLink } alt="图片验证码"/>
              {getFieldDecorator('code', {
                rules: [{ required: true, message: '请输入图片验证码!' }],
              })(
                <Input className="buy-input" onChange={ this.tuCodes } type="text" placeholder="请输入图片验证码" />
              )}
            </FormItem>
            <FormItem
              label="手机验证码"
            >
              {getFieldDecorator('dtCode', {
                rules: [{ required: true, message: '请输入手机验证码!' }],
              })(
                <Input className="buy-input" type="Number" placeholder="请输入手机验证码" />
              )}
            </FormItem>
            <FormItem
              label="登录密码"
            >
              {getFieldDecorator('loginPassword', {
                rules: [{ required: true, message: '请输入登录密码!' }],
              })(
                <Input className="buy-input" type="password" placeholder="请输入登录密码" />
              )}
            </FormItem>
            {
              getCodesState
                ? <Button type="primary" onClick={this.duanXinCodeBtn} className="accountBtn">{ TestGetCode }</Button>
                : <Button className="accountBtn" disabled="disabled">{codeNum}秒</Button>
            }
            {/* <Button type="primary" onClick={this.duanXinCodeBtn} className="accountBtn">{ TestGetCode }</Button> */}
            <Button type="primary" htmlType="submit" className="accountBtn" onClick={ this.nextHandleSubmit }>确定</Button>
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

const Correct_Account = Form.create()(Correct_Accounts);
export default Correct_Account
