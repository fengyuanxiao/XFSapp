import React, { Component } from 'react';
import { Form, Input, Button, Checkbox, message } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './login.css';

const FormItem = Form.Item;

class Logins extends Component {

  // 点击登录按钮
  handleSubmit = (e) => {
    let this_ = this;
    e.preventDefault();
    let phoneNum = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;   //手机号码正则
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // console.log(Number(values.userName));
        if ( !phoneNum.test(values.userName) ) {    //判断手机号码是否正确
          message.error("请输入正确的手机号码！")
        } else {
          //以上数据都正确 在此 ajax交互
          axios.post('/api/user/login', {
            // 用户注册提交的所有数据
            mobile: values.userName,
            password: values.password,
          })
          .then(function (response) {   //调用接口成功执行
            // console.log(response);
            // 登陆成功前 将token保存到本地
            localStorage.setItem("token", response.data.token);
            if ( response.data.status ) {
              // message.success(response.data.msg)
              message.success(response.data.msg, successSkip => {
                this_.props.history.push('/taskHallPage')
                  // this_.props.history.push({pathname: '/taskHallPage', state: {data: response.data.token}})
              })
            } else {  // response.data状态为 false的时候跳转
              message.error(response.data.msg)
            }
          })
          .catch(function (error) {   //调用接口失败执行
            console.log(error);
          });
        }
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return(
      <div>
        <img style={{ width: "100%", display: 'block', marginBottom: '0.5rem' }} src={ require("../../img/1-wap.jpg") } alt="login"/>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem label="手机号：">
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: '请输入手机号码!' }],
            })(
              <Input style={{ width: '100%', height: '41px', margin: '0' }} type="text" maxLength="11" placeholder="手机号" />
            )}
          </FormItem>
          <FormItem label="登录密码">
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入登录密码!' }],
            })(
              <Input style={{ width: '100%', height: '41px', margin: '0' }} type="password" placeholder="登录密码" />
            )}
          </FormItem>
          <FormItem style={{ width: "90%", margin: "0 auto" }}>
            {getFieldDecorator('remember', {
               valuePropName: 'checked',
               initialValue: true,
            })(
              <Checkbox>记住密码</Checkbox>
             )}
             {/* <a href=""></a> */}
             <Link className="login-form-forgot" to="/forgetPassword">忘记密码？</Link>
             <Button type="primary" htmlType="submit" className="login-form-buttons">立即登录</Button>
             <Button className="login-form-buttons"><Link to="/registerPage">免费注册</Link></Button>
           </FormItem>
         </Form>
      </div>
    )
  }
}

const Login = Form.create()(Logins);
export default Login
