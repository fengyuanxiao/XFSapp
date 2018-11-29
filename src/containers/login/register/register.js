import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {
  Icon,
  Form,
  Input,
  Button,
  Row,
  Col,
  message
} from 'antd';
import axios from 'axios';

import './register.css';

const FormItem = Form.Item;
let phoneNumber = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/; //手机号码正则

class RegisterPages extends Component {
  constructor() {
    super();
    this.state = {
      getCodesState: true,
      codeNum: 60,        //倒计时 60 秒
      TestGetCode: "获取验证码",
      placeholder: "请输入手机号",
      tuCodeLink: null,   //图片验证码链接
      tuCode: null,       //图片验证码内容
      sid: null,          //sid
      time: null          //time
    }
  }

  // 生命周期函数 此函数最先执行
  componentDidMount() {
    axios.get('/api/user/getVerifyCode')
    .then(response => {
      this.setState({
        tuCodeLink: response.data.data,
        sid: response.data.sid,
        time: response.data.time
      })
      console.log(response.data);
    })
    .catch(error => {
      console.log(error);
    })
  }

  // 点击图片验证码重新获取 图片
  getVerifyCode = () => {
    axios.get('/api/user/getVerifyCode')
    .then(response => {
      this.setState({
        tuCodeLink: response.data.data,
        sid: response.data.sid,
        time: response.data.time
      })
      // console.log(response.data.data);
    })
    .catch(error => {
      console.log(error);
    })
    // console.log(this.state.tuCode);
  }

  // 电话号码 onChange事件修改 placeholder值 让短信验证码按钮判断调用获取验证码接口
  onChange = (e) => {
    this.setState({placeholder: e.target.value})
  }
  // 图形验证码
  tuCodes = (e) => {
    this.setState({tuCode: e.target.value})
  }

  // 获取短信验证码按钮
  getCodes = () => {
    let dataCode_ = this.state
    // let verifys = {
    //   sid: dataCode_.sid,
    //   time: dataCode_.time,
    //   tuCode: dataCode_.tuCode,
    //   phoneNum: dataCode_.placeholder
    // }
    // console.log(verifys);
    if (dataCode_.placeholder === "请输入手机号") {
      message.error("请输入手机号码！");
    } else if (!phoneNumber.test(dataCode_.placeholder)) {
      message.error("请输入正确的手机号码！");
    } else if (dataCode_.tuCode === null) {
      message.error("请输图形验证码！");
    } else {
      // 获取短信验证码接口ajax
      axios.post('/api/user/sendcode', {
        sid: dataCode_.sid,
        time: dataCode_.time,
        tuCode: dataCode_.tuCode,
        phoneNum: dataCode_.placeholder
      })
      .then(function (response) {   //调用接口成功执行
        console.log(response.data);
        // 判断后台返回数据 status 状态 true 图片验证码正确 执行下面
        if ( response.data.status ) {
          // 倒计时 获取短信验证码
          let codeNum = dataCode_.codeNum
          const timer = setInterval(() => {
          this.setState({
            getCodesState:false,
            codeNum: (codeNum--)
            }, () => {
                if (codeNum === 0) {
                clearInterval(timer);
                this.setState({
                  getCodesState: true,
                  codeNum: 60,
                  TestGetCode: "重新获取"
                })
              }
            })
          }, 1000)
          // 图片验证码正确显示提示
          message.success(response.data.msg);
        } else {  // 判断后台返回数据 status 状态 false执行else
          // 图片验证码错误显示提示
          message.error(response.data.msg);
        }
      })
      .catch(function (error) {   //调用接口失败执行
        console.log(error);
      });
      }
    }

    // 提交注册按钮 提交数据
    handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          // console.log('Received values of form: ', values);
          if (!phoneNumber.test(values.phoneNum)) {
            message.error("请输入正确的手机号码！")
          } else if (values.loginPassword !== values.aloginPassword) {
            message.error("两次密码不一致！")
          } else {
            // 在此提交ajax数据
            // axios.post('/api/user/register', {
            //   phoneNum: values,
            // })
            // .then(function (response) {   //调用接口成功执行
            //   console.log(response.data);
            // })
            // .catch(function (error) {   //调用接口失败执行
            //   console.log(error);
            // });
            console.log(values);
            // message.success("注册成功！", successSkip => { // 注册成功后执行回调跳转到任务大厅
            //   this.props.history.push('/taskHallPage')
            // })
            message.success("注册成功！")
          }
        }
      });
    }

    render() {
      const {getFieldDecorator} = this.props.form;
      const formItemLayout = {
        labelCol: {
          xs: {
            span: 24
          },
          sm: {
            span: 8
          }
        },
        wrapperCol: {
          xs: {
            span: 24
          },
          sm: {
            span: 16
          }
        }
      };
      const tailFormItemLayout = {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0
          },
          sm: {
            span: 16,
            offset: 8
          }
        }
      };

      return (<div>
        <header className="tabTitle">
          <div className="return">
            <Link to="/"><Icon type="left" theme="outlined"/>返回</Link>
          </div>
          用户注册
        </header>
        <Form onSubmit={this.handleSubmit} style={{
            padding: "3.7rem 0.6rem 0 0.6rem"
        }}>
          <FormItem {...formItemLayout} label="手机号：">
            {
              getFieldDecorator('phoneNum', {
                rules: [
                {
                    required: true,
                    message: '请输入手机号码!'
                }
                ]
              })(<Input className="register-input" onChange={this.onChange} maxLength="11" placeholder={this.state.placeholder}/>)
            }
          </FormItem>
          <FormItem {...formItemLayout} label="图形验证码：">
            <div>
              <img onClick={ this.getVerifyCode } style={{
                  width: "100%"
              }} src={this.state.tuCodeLink} alt="图形验证码"/>
              {/* <a onClick={ this.getVerifyCode } style={{width: "100%"}} href={this.state.tuCode}></a> */}
            </div>
            {
              getFieldDecorator('tuCode', {
                rules: [
                {
                    required: true,
                    message: '请输入图形验证码!'
                }
                ]
              })(<Input className="register-input" onChange={ this.tuCodes } placeholder="请输入图形验证码"/>)
            }
          </FormItem>
          <FormItem {...formItemLayout} label="短信验证码">
            <Row gutter={8}>
              <Col span={16}>
                {
                  getFieldDecorator('captcha', {
                    rules: [
                    {
                        required: true,
                        message: '请输入短信验证码!'
                    }
                    ]
                  })(<Input className="register-input" placeholder="请输入短信验证码"/>)
                }
              </Col>
              <Col span={8}>
                {
                  this.state.getCodesState
                    ? <Button onClick={this.getCodes}>{ this.state.TestGetCode }</Button>
                    : <Button disabled="disabled">{this.state.codeNum}秒</Button>
                }
              </Col>
            </Row>
          </FormItem>
          <FormItem {...formItemLayout} label="登录密码">
            {
              getFieldDecorator('loginPassword', {
                rules: [
                {
                    required: true,
                    message: '请输入登录密码!'
                }
                ]
              })(<Input className="register-input" placeholder="请输入6-16为数字，字母组合"/>)
            }
          </FormItem>
          <FormItem {...formItemLayout} label="确认密码">
            {
              getFieldDecorator('aloginPassword', {
                rules: [
                {
                    required: true,
                    message: '请确认登录密码!'
                }
                ]
              })(<Input className="register-input" placeholder="请输入6-16为数字，字母组合"/>)
            }
          </FormItem>
          <FormItem {...formItemLayout} label="邀请码">
            {
              getFieldDecorator('yqcode', {
                rules: [
                {
                    required: true,
                    message: '请输入邀请码!'
                }
                ]
              })(<Input className="register-input" placeholder="必填邀请码"/>)
            }
          </FormItem>
          <FormItem {...formItemLayout} label="QQ号">
            {
              getFieldDecorator('QQnum', {
                rules: [
                  {
                    required: true,
                    message: '请输入QQ号!'
                  }
                ]
              })(<Input className="register-input" type="Number" placeholder="请输入QQ号"/>)
            }
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button className="zhuceBtn" type="primary" htmlType="submit">免费注册</Button>
          </FormItem>
        </Form>
      </div>)
    }
  }

  const RegisterPage = Form.create()(RegisterPages);
  export default RegisterPage
