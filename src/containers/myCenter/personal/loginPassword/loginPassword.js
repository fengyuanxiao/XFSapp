import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon, Form, Input, Button } from 'antd';

const FormItem = Form.Item;

class LoginPasswords extends Component {

  // 提交表单按钮、ajax提交数据
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return(
      <div>
        <header className="tabTitle">
          <div className="return"><Link to="/personal"><Icon type="left" theme="outlined" />返回</Link></div>
          修改登录密码
        </header>
        <Form onSubmit={this.handleSubmit} className="login-form" style={{ padding: '3.5rem 0.7rem 0 0.7rem' }}>
          <FormItem
            label="原密码"
            >
            {getFieldDecorator('yuanPassword', {
              rules: [{ required: true, message: '请输入原密码!' }],
            })(
              <Input className="buy-input" placeholder="请输入原密码" maxLength="11" />
            )}
          </FormItem>
          <FormItem
            label="新密码"
            >
            {getFieldDecorator('okPassword', {
              rules: [{ required: true, message: '请输入新密码!' }],
            })(
              <Input className="buy-input" type="text" placeholder="请输入新密码" />
            )}
          </FormItem>
          <FormItem
            label="确认密码"
            >
            {getFieldDecorator('andOkPassword', {
              rules: [{ required: true, message: '请再次确认新密码!' }],
            })(
              <Input className="buy-input" type="text" placeholder="请再次确认新密码" />
            )}
          </FormItem>
          <Button type="primary" htmlType="submit" className="accountBtn">提交</Button>
        </Form>
      </div>
    )
  }
}

const LoginPassword = Form.create()(LoginPasswords);
export default LoginPassword
