import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon, Form, Input, Button } from 'antd';

const FormItem = Form.Item;

class XgQQs extends Component {

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
            label="原QQ"
            >
            {getFieldDecorator('yuanPassword', {
              rules: [{ required: true, message: '请输入原QQ!' }],
            })(
              <Input className="buy-input" placeholder="请输入原QQ" type="Number" />
            )}
          </FormItem>
          <FormItem
            label="新QQ"
            >
            {getFieldDecorator('okPassword', {
              rules: [{ required: true, message: '请输入新QQ!' }],
            })(
              <Input className="buy-input" type="Number" placeholder="请输入新QQ" />
            )}
          </FormItem>
          <Button type="primary" htmlType="submit" className="accountBtn">提交</Button>
        </Form>
      </div>
    )
  }
}

const XgQQ = Form.create()(XgQQs);
export default XgQQ
