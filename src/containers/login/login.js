import React, { Component } from 'react';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ActivityIndicator from 'antd-mobile/lib/activity-indicator';
import WingBlank from 'antd-mobile/lib/wing-blank';
import './login.css';
import '../../component/apis';
// import '../../component/mui';
// console.log(window.mui);
// global.constants.website+
// ,"proxy": "https://budan.php12.cn/"          代理

const FormItem = Form.Item;
const phoneNum = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;   //手机号码正则
// window.location.reload();

class Logins extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stateID1: true,
      stateID2: true,
      ticket: '',
      randstr: '',
      animating: false,
    }
  }

  componentWillMount() {
    // localStorage.setItem("numA", 1);
    if (localStorage.getItem("numAs") === "2") {//防止返回无线刷新，优化token无效时退出不显示及验证问题
      localStorage.removeItem("numAs");
      window.location.reload();
    }
    let this_ = this;
    window.callback = function (res) {
      if ( res.ret === 0 ) {
        //以上数据都正确 在此 ajax交互
        axios.post(global.constants.website+'/api/user/login', {
          // 用户注册提交的所有数据
          mobile: this_.state.mobile,
          password: this_.state.password,
          ticket: res.ticket,
          randstr: res.randstr,
        })
        .then(function (response) {   //调用接口成功执行
          // console.log(response);
          // 登陆成功前 将token保存到本地
          if ( response.data.status ) {
            if ( this_.state.remember ) {                                      //记住密码勾选执行下面
              localStorage.setItem("mobile", this_.state.mobile);            //将账号保存到本地
              localStorage.setItem("password", this_.state.password);          //将密码保存到本地
            } else {                                                      //记住密码没有勾选
              localStorage.removeItem("mobile");                          //删除本地账号密码
              localStorage.removeItem("password");
            }
            // message.success(response.data.msg)
            this_.setState({ animating: true })            //数据提交中显示的login.....
            //   // 保存token到本地
              localStorage.setItem("token", response.data.token);
              localStorage.setItem("numAs", "2");
              //   // 上传手机设备信息接口
              axios.post(global.constants.website+'/api/index/device',
                {
                  imei: localStorage.getItem("uuid"),                                 //手机标识
                  latitude: localStorage.getItem("latitude"),                         //经度
                  altitude: localStorage.getItem("longitude"),                      //纬度
                  is_wifi: localStorage.getItem("isWifi") === "true" ? 1 : 0,        //是否是4G还是wifi
                  smcard_name: localStorage.getItem("imsi"),                       //SM卡的名字
                  platform: localStorage.getItem("platform"),                       //1安卓，2IOS
                },
                {
                  headers: {AppAuthorization: localStorage.getItem("token")}    //post 方法传 token
                })
                .then(res => {
                  if (res.status) {
                    // console.log(res.data);
                    this_.setState({ animating: false })          //数据提交成功关闭login.....
                    message.success(response.data.msg);
                    // 如果数据验证全部正确则跳转
                    this_.props.history.push({pathname: '/taskHallPage', state: {token: response.data.token}});
                  }else {
                    this_.setState({ animating: false })          //数据提交成功关闭login.....
                    console.log(res.data.mgs);
                  }
                })
                .catch(err => {
                  console.log(err);
                })

            // 登录成功提示回调
            // message.success(response.data.msg, successSkip => {
            //   // 保存token到本地
            //   localStorage.setItem("token", response.data.token);
            //   localStorage.setItem("numAs", "2");
            //   // 上传手机设备信息接口
            //   axios.post(global.constants.website+'/api/index/device',
            //     {
            //       imei: localStorage.getItem("uuid"),             //手机标识
            //       latitude: localStorage.getItem("latitude"),     //经度
            //       altitude: localStorage.getItem("longitude"),    //纬度
            //       is_wifi: localStorage.getItem("isWifi"),          //是否是4G还是wifi
            //       smcard_name: localStorage.getItem("imsi"),      //SM卡的名字
            //     },
            //     {
            //       headers: {AppAuthorization: localStorage.getItem("token")}    //post 方法传 token
            //     })
            //     .then(res => {
            //       console.log(res);
            //       this_.setState({ animating: false })          //数据提交成功关闭login.....
            //     })
            //     .catch(err => {
            //       console.log(err);
            //     })
            //
            //   this_.props.history.push({pathname: '/taskHallPage', state: {token: response.data.token}});
            // })

          } else {  // response.data状态为 false的时候跳转
            message.error(response.data.msg)
          }
        })
        .catch(function (error) {   //调用接口失败执行
          console.log(error);
        });
      }
    }
  }

  componentDidMount () {
      this.props.form.setFieldsValue({
      userName: localStorage.getItem("mobile"),                //获取本地账号
      password: localStorage.getItem("password"),              //获取本地密码
    })
    if ( localStorage.getItem("mobile") || localStorage.getItem("password") ) {
      this.setState({
        stateID1: false,
        stateID2: false,
      })
    }
  }

  handlePhone = (e) => {
    this.setState({
      stateID1: false,
    })
  }
  handlePwd = (e) => {
    this.setState({
      stateID2: false,
    })
  }

  // 点击登录按钮
  handleSubmit = (e) => {
    let this_ = this;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log(values);
        if ( !phoneNum.test(values.userName) ) {    //判断手机号码是否正确
          message.error("请输入正确的手机号码！")
        } else {
          this_.setState({
            mobile: values.userName,
            password: values.password,
            remember: values.remember,
          })
          // //以上数据都正确 在此 ajax交互
          // axios.post(global.constants.website+'/api/user/login', {
          //   // 用户注册提交的所有数据
          //   mobile: values.userName,
          //   password: values.password,
          // })
          // .then(function (response) {   //调用接口成功执行
          //   // console.log(response);
          //   // 登陆成功前 将token保存到本地
          //   if ( response.data.status ) {
          //     if ( values.remember ) {                                      //记住密码勾选执行下面
          //       localStorage.setItem("mobile", values.userName);            //将账号保存到本地
          //       localStorage.setItem("password", values.password);          //将密码保存到本地
          //     } else {                                                      //记住密码没有勾选
          //       localStorage.removeItem("mobile");                          //删除本地账号密码
          //       localStorage.removeItem("password");
          //     }
          //     // message.success(response.data.msg)
          //     message.success(response.data.msg, successSkip => {
          //       // 保存token到本地
          //       localStorage.setItem("token", response.data.token);
          //       this_.props.history.push({pathname: '/taskHallPage', state: {token: response.data.token}});
          //     })
          //   } else {  // response.data状态为 false的时候跳转
          //     message.error(response.data.msg)
          //   }
          // })
          // .catch(function (error) {   //调用接口失败执行
          //   console.log(error);
          // });
        }
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { stateID1, stateID2, animating } = this.state;
    return(
      <div>
        <WingBlank style={{ margin: '0 auto' }}>
          <img style={{ width: "100%", display: 'block', marginBottom: '0.5rem' }} src={ require("../../img/1-wap.jpg") } alt="login"/>
          <Form onSubmit={this.handleSubmit} className="login-form" style={{width: "90%"}}>
            <FormItem label="手机号：">
              {getFieldDecorator('userName', {
                rules: [{ required: true, message: '请输入手机号码!' }],
              })(
                <Input onChange={this.handlePhone} style={{ width: '100%', height: '41px', margin: '0' }} type="text" maxLength="11" placeholder="手机号" />
              )}
            </FormItem>
            <FormItem label="登录密码">
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入登录密码!' }],
              })(
                <Input onChange={this.handlePwd} style={{ width: '100%', height: '41px', margin: '0' }} type="password" placeholder="登录密码" />
              )}
            </FormItem>
            <FormItem style={{ width: "90%", margin: "0 auto" }}>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(
                <Checkbox>记住密码</Checkbox>
              )}
              {/* <a href=""></a> disabled={stateID?true: false}  */ }
              <Link className="login-form-forgot" to="/forgetPassword">忘记密码？</Link>
              <Button disabled={stateID1||stateID2?true:false} type="primary" htmlType="submit" className="login-form-buttons" id="TencentCaptcha" data-appid="2020178866" data-cbfn="callback">立即登录</Button>
              <Button className="login-form-buttons"><Link to="/registerPage">免费注册</Link></Button>
            </FormItem>

            <div className="toast-example">
              <ActivityIndicator
                toast
                text="数据验证中..."
                animating={animating}
              />
            </div>
          </Form>
        </WingBlank>
      </div>
    )
  }
}

const Login = Form.create()(Logins);
export default Login
