import React, {
  Component
} from 'react';
import {
  Link
} from 'react-router-dom';
import {
  Icon,
  Form,
  Input,
  Button,
  message
} from 'antd';
import axios from 'axios';
import ActivityIndicator from 'antd-mobile/lib/activity-indicator';
import WingBlank from 'antd-mobile/lib/wing-blank';
import '../../component/apis';

const FormItem = Form.Item;
// const phoneNum = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;   //手机号码正则

class Accounts extends Component {
  constructor() {
    super();
    this.state = {
      animating: false,
      code: null,
      getCodesState: true,
      codeNum: 60, //倒计时 60 秒
      TestGetCode: "获取验证码",
    }
  }

  componentWillMount() {
    // 进入登录手机号页面 调用图片验证码获取图片
    axios.get(global.constants.website+'/api/user/getcaptcha')
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
    this.setState = (state, callback) => {
      return;
    };
  }

  componentDidMount() {
    // 获取手机号码接口
    axios.get(global.constants.website+'/api/index/getmobilephone', {
        headers: {
          AppAuthorization: localStorage.getItem("token")
        } //post 方法传 token
      })
      .then(response => {
        // console.log(response.data);
        this.props.form.setFieldsValue({
          numb: response.data.data.phone, //获取手机号
        });
        this.setState({
          placeholder: response.data.data.phone
        })
      })
      .catch(function(error) {
        console.log(error);
      });
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
  tuCodes = (e) => {
    this.setState({
      code: e.target.value
    })
  }

  // 电话号码 onChange事件修改 placeholder值 让短信验证码按钮判断调用获取验证码接口
  numbersPlace = () => {}

  // 获取短信验证码按钮
  duanXinCodeBtn = () => {
    let dataCode_ = this.state;
    let this_ = this;
    if (dataCode_.code === null) {
      message.error("请输图形验证码！");
    } else {
      // 再次调用获取验证码接口

      axios.post(global.constants.website+'/api/user/sendcode', {
          phoneNum: dataCode_.placeholder,
          tuCode: dataCode_.code,
          sid: dataCode_.sid,
        }, {
          headers: {
            AppAuthorization: localStorage.getItem("token")
          } //post 方法传 token
        })
        .then(response => {
          // console.log(response);
          if (response.data.status) {
            // 短信倒计时 60秒
            let codeNum = dataCode_.codeNum;
            const timer = setInterval(() => {
              this_.setState({
                getCodesState: false,
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
        .catch(error => {
          console.log(error);
        });
    }
  }

  // 提交表单按钮、ajax提交数据
  nextHandleSubmit = (e) => {
    e.preventDefault();
    let this_ = this;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this_.setState({
          animating: true
        }); //数据提交中显示的login.....
        axios.post(global.constants.website+'/api/index/changemobile', {
            smscode: this_.state.phoneCode,
          }, {
            headers: {
              AppAuthorization: localStorage.getItem("token")
            } //post 方法传 token
          })
          .then(response => {
            // console.log(response.data);
            if (response.data.status) {
              this_.setState({
                animating: false
              }) //数据提交成功关闭login.....
              this_.props.history.push({
                pathname: '/correct_account',
                state: {
                  scode: response.data.smscode
                }
              }) //跳入跟换正确的手机号码页面
              message.success("请填写新的手机号");
            } else {
              this_.setState({
                animating: false
              }) //数据提交成功关闭login.....
              message.error(response.data.msg);
            }
          })
          .catch(error => {
            console.log(error);
          });
      }
    });
  }

  render() {
    const {
      getFieldDecorator
    } = this.props.form;
    const {
      animating,
      tuCodeLink,
      TestGetCode,
      getCodesState,
      codeNum
    } = this.state;
    return ( <
      div >
      <
      header className = "tabTitle" >
      <
      div className = "return" > < Link to = "/personal" > < Icon type = "left"
      theme = "outlined" / > 返回 < /Link></div >
      修改登录手机号 <
      /header> <
      WingBlank >
      <
      Form onSubmit = {
        this.handleSubmit
      }
      className = "login-form"
      style = {
        {
          padding: '3.5rem 0.7rem 0 0.7rem'
        }
      } >
      <
      FormItem label = "手机号" >
      {
        getFieldDecorator('numb', {
          rules: [{
            required: true,
            message: '请输入手机号码!'
          }],
        })( <
          Input className = "buy-input"
          onChange = {
            this.numbersPlace
          }
          maxLength = "11"
          placeholder = {
            this.state.placeholder
          }
          />
        )
      } <
      /FormItem> <
      FormItem label = "图片验证码" >
      <
      img onClick = {
        this.getVerifyCode
      }
      style = {
        {
          width: "100%"
        }
      }
      src = {
        tuCodeLink
      }
      alt = "图片验证码" / > {
        getFieldDecorator('code', {
          rules: [{
            required: true,
            message: '请输入图片验证码!'
          }],
        })( <
          Input className = "buy-input"
          onChange = {
            this.tuCodes
          }
          type = "text"
          placeholder = "请输入图片验证码" / >
        )
      } <
      /FormItem> <
      FormItem label = "手机验证码" >
      {
        getFieldDecorator('dtCode', {
          rules: [{
            required: true,
            message: '请输入手机验证码!'
          }],
        })( <
          Input className = "buy-input"
          type = "Number"
          placeholder = "请输入手机验证码" / >
        )
      } <
      /FormItem> {
        getCodesState
          ?
          < Button type = "primary"
        onClick = {
          this.duanXinCodeBtn
        }
        className = "accountBtn" > {
          TestGetCode
        } < /Button>: < Button className = "accountBtn"
        disabled = "disabled" > {
          codeNum
        }
        秒 < /Button>
      } { /* <Button type="primary" onClick={this.duanXinCodeBtn} className="accountBtn">{ TestGetCode }</Button> */ } <
      Button type = "primary"
      htmlType = "submit"
      className = "accountBtn"
      onClick = {
        this.nextHandleSubmit
      } > 下一步 < /Button> <
      div className = "toast-example" >
      <
      ActivityIndicator toast text = "数据提交中..."
      animating = {
        animating
      }
      /> <
      /div> <
      /Form> <
      /WingBlank> <
      /div>
    )
  }
}

const Account = Form.create()(Accounts);
export default Account
