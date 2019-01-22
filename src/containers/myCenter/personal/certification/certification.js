import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon, Form, Input, Button, message } from 'antd';
import axios from 'axios';
import ImagePicker from 'antd-mobile/lib/image-picker';
import ActivityIndicator from 'antd-mobile/lib/activity-indicator';
import WingBlank from 'antd-mobile/lib/wing-blank';
import '../../component/apis';

const FormItem = Form.Item;
const data = [];
// 身份证正则
const cards = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;

class certifications extends Component {
  constructor() {
    super();
    this.state = {
      animating: false,
      files: data,
    }
  }

  // 上传我的淘宝 支付宝示例图回调
  onUploadOne = (files, type, index) => {
    // console.log(files, type, index);
    this.setState({
      files,
    });
  }

  // 提交表单按钮、ajax提交数据
  handleSubmit = (e) => {
    let this_ = this;
    e.preventDefault();
    let _this = this.state.files;
    this.props.form.validateFields((err, values) => {
      if (!err === true && _this.length >= 2) {
      // console.log(values);
        if ( !cards.test(values.cardno) ) {                                   //判断是否是正确的身份证号码
          message.error("请输入正确的身份证号！")
        } else {
          this_.setState({ animating: true })                                 //数据提交中显示的login.....
          let imgs = [values.images[0].url, values.images[1].url];            //保存图片集合
          axios.post(global.constants.website+'/api/index/realnamecommit', {
            images: imgs,                                                     //用户身份证正反两面截图
            realName: values.realName,                                        //真实姓名
            cardno: values.cardno,                                            //身份证号
          },
          {
            headers: {AppAuthorization: localStorage.getItem("token")}        //post 方法传 token
          })
          .then( response => {
            let data_ = response.data;
              // console.log(data_);
            if ( data_.status ) {                           //status 为true 执行下面代码
              this_.setState({ animating: false })          //数据提交成功关闭login.....
              message.success(data_.msg);
              this_.props.history.push("/personal");
            } else {                                        //status 为false 执行
              this_.setState({ animating: false })          //数据提交成功关闭login.....
              message.error(data_.msg);
            }
          })
          .catch( error => {
            console.log(error);
          })
        }
      }else {
        message.error('请完善信息');
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { files, animating } = this.state;
    return(
      <div>
        <header className="tabTitle">
          <div className="return"><Link to="/personal"><Icon type="left" theme="outlined" />返回</Link></div>
          实名认证
        </header>
        <div className="buyAdmin-box">
          <WingBlank>
            <Form onSubmit={this.handleSubmit} className="login-form">
              <FormItem
                label="姓名"
              >
                {getFieldDecorator('realName', {
                  rules: [{ required: true, message: '请输入姓名!' }],
                })(
                  <Input className="buy-input" placeholder="请输入姓名" type="text" />
                )}
              </FormItem>
              <FormItem
                label="身份证号"
              >
                {getFieldDecorator('cardno', {
                  rules: [{ required: true, message: '请输入身份证号!' }],
                })(
                  <Input className="buy-input" type="text" placeholder="请输入身份证号" maxLength="18" />
                )}
              </FormItem>
              <FormItem
                label="上传身份证正面图和反面图"
              >
                {getFieldDecorator('images', {
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
      </div>
    )
  }
}

const certification = Form.create()(certifications);
export default certification
