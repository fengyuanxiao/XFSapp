import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon, Form, Input, Button, message } from 'antd';
import axios from 'axios';
import ActivityIndicator from 'antd-mobile/lib/activity-indicator';
import WingBlank from 'antd-mobile/lib/wing-blank';

const FormItem = Form.Item;

class XgQQs extends Component {
  constructor() {
    super();
    this.state = {
      animating: false,
    }
  }

  componentDidMount() {
    // 获取QQ号
    axios.get('/api/index/getmobilephone', {
        headers: {
          AppAuthorization: localStorage.getItem("token")
        } //post 方法传 token
      })
      .then(response => {
        // console.log(response.data);
        this.props.form.setFieldsValue({
          yuanQQ: response.data.data.qq, //获取手机号
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  // 提交表单按钮、ajax提交数据
  handleSubmit = (e) => {
    e.preventDefault();
    let Submitthis = this;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        Submitthis.setState({ animating: true });            //数据提交中显示的login.....
        axios.post('/api/index/changeQQ', {
          qq: values.newQQ,
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
    const { animating } = this.state;
    return(
      <div>
        <header className="tabTitle">
          <div className="return"><Link to="/personal"><Icon type="left" theme="outlined" />返回</Link></div>
          修改QQ号
        </header>
        <WingBlank>
          <Form onSubmit={this.handleSubmit} className="login-form" style={{ padding: '3.5rem 0.7rem 0 0.7rem' }}>
            <FormItem
              label="原QQ"
            >
              {getFieldDecorator('yuanQQ', {
                rules: [{ required: true, message: '请输入原QQ!' }],
              })(
                <Input className="buy-input" placeholder="请输入原QQ" type="Number" />
              )}
            </FormItem>
            <FormItem
              label="新QQ"
            >
              {getFieldDecorator('newQQ', {
                rules: [{ required: true, message: '请输入新QQ!' }],
              })(
                <Input className="buy-input" type="Number" placeholder="请输入新QQ" />
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

const XgQQ = Form.create()(XgQQs);
export default XgQQ
