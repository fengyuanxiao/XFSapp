import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ImagePicker } from 'antd-mobile';
import { Icon, Form, Input, Button, message } from 'antd';

const FormItem = Form.Item;
const data = [];

class certifications extends Component {
  constructor() {
    super();
    this.state = {
      files: data,
    }
  }

  // 上传我的淘宝 支付宝示例图回调
  onUploadOne = (files, type, index) => {
    console.log(files, type, index);
    this.setState({
      files,
    });
  }

  // 提交表单按钮、ajax提交数据
  handleSubmit = (e) => {
    e.preventDefault();
    let _this = this.state.data
    this.props.form.validateFields((err, values) => {
      if (!err === true && _this.length >= 2) {
        console.log(values);
        message.success('提交成功，待审核！');
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
          修改登录密码
        </header>
        <Form onSubmit={this.handleSubmit} className="login-form" style={{ padding: '3.5rem 0.7rem 0 0.7rem' }}>
          <FormItem
            label="姓名"
            >
            {getFieldDecorator('names', {
              rules: [{ required: true, message: '请输入姓名!' }],
            })(
              <Input className="buy-input" placeholder="请输入姓名" type="text" />
            )}
          </FormItem>
          <FormItem
            label="身份证号"
            >
            {getFieldDecorator('card', {
              rules: [{ required: true, message: '请输入身份证号!' }],
            })(
              <Input className="buy-input" type="text" placeholder="请输入身份证号" maxLength="18" />
            )}
          </FormItem>
          <FormItem
            label="上传身份证正面图和反面图"
            >
            {getFieldDecorator('userCard', {
              rules: [{ required: true, message: '请上传身份证正面图和反面图!' }],
            })(
              <ImagePicker
                length={2}
                files={files}
                onChange={this.onUploadOne}
                onImageClick={(index, fs) => console.log(index, fs)}
                selectable={files.length < 2}
                accept="image/gif,image/jpeg,image/jpg,image/png"
              />
            )}
          </FormItem>
          <div style={{ color:"red", paddingBottom: '0.8rem' }}>
            温馨提示：绑定的身份证名字须和支付宝实名认证一致，请认真核对，填写不正确将导致返款失败！您的信息仅用于返款用途，小浣熊将保证信息安全不泄漏，不用于其他用途。
          </div>
          <Button type="primary" htmlType="submit" className="accountBtn">提交</Button>
        </Form>
      </div>
    )
  }
}

const certification = Form.create()(certifications);
export default certification
