import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon, Form, Input, Button, message } from 'antd';
import axios from 'axios';
import ActivityIndicator from 'antd-mobile/lib/activity-indicator';
import WingBlank from 'antd-mobile/lib/wing-blank';
import '../../../../component/apis';

const FormItem = Form.Item;

class LoginPasswords extends Component {
  constructor() {
    super();
    this.state = {
      animating: false,
    }
  }

  // 提交表单按钮、ajax提交数据
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({ animating: true });            //数据提交中显示的login.....
        // 调用修改密码接口
        axios.post(global.constants.website+'/api/index/updatepwd', {
          password: values.yuanPassword,
          new_password: values.okPassword,
          re_new_password: values.andOkPassword,
        },
        {
          headers: {AppAuthorization: localStorage.getItem("token")}        //post 方法传 token
        })
        .then( response => {
          if ( response.data.status ) {
            this.setState({ animating: false })          //数据提交成功关闭login.....
            this.props.history.push('/')      //跳入跟换正确的手机号码页面
            message.success(response.data.msg);
          } else {
            this.setState({ animating: false })          //数据提交成功关闭login.....
            message.error(response.data.msg);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { animating } = this.state;
    return(
      <div>
        <header className="tabTitle">
          <div className="return"><Link to="/personal"><Icon type="left" theme="outlined" />返回</Link></div>
          修改登录密码
        </header>
        <WingBlank>
          <Form onSubmit={this.handleSubmit} className="login-form" style={{ padding: '3.5rem 0.7rem 0 0.7rem' }}>
            <FormItem
              label="原密码"
            >
              {getFieldDecorator('yuanPassword', {
                rules: [{ required: true, message: '请输入原密码!' }],
              })(
                <Input className="buy-input" type="password" placeholder="请输入原密码" />
              )}
            </FormItem>
            <FormItem
              label="新密码"
            >
              {getFieldDecorator('okPassword', {
                rules: [{ required: true, message: '请输入新密码!' }],
              })(
                <Input className="buy-input" type="password" placeholder="请输入新密码" />
              )}
            </FormItem>
            <FormItem
              label="确认密码"
            >
              {getFieldDecorator('andOkPassword', {
                rules: [{ required: true, message: '请再次确认新密码!' }],
              })(
                <Input className="buy-input" type="password" placeholder="请再次确认新密码" />
              )}
            </FormItem>
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

const LoginPassword = Form.create()(LoginPasswords);
export default LoginPassword
