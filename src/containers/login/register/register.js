import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {
  Icon,
  Form,
  Input,
  Button,
  Row,
  Col,
  message,
  Modal
} from 'antd';
import axios from 'axios';

import Hongbao from '../../../img/hongbao.png';
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
      sid: null,          //图片验证码 码sid
      time: null,         //time
      hongbao: false,     //注册成功注册的红包显示
      openhonbao: false,  //打开红包状态
      visible: false,      //点击打开红包显示得到的金额弹窗
      register_money: null  //获得的红包金额
    }
  }

  // 生命周期函数 此函数最先执行
  componentWillMount() {
    axios.get('/api/user/getcaptcha')
    .then(response => {
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
    this.setState = (state,callback)=>{
      return;
    };
}

  // 点击图片验证码重新获取 图片
  getVerifyCode = () => {
    axios.get('/api/user/getcaptcha')
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
    let dataCode_ = this.state;
    let this_ = this;   //存入  this
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
        tuCode: dataCode_.tuCode,
        phoneNum: dataCode_.placeholder
      })
      .then(function (response) {   //调用接口成功执行
        console.log(response.data);
        // 判断后台返回数据 status 状态 true 图片验证码正确 执行下面
        if ( response.data.status ) {
          // 倒计时 获取短信验证码
          let codeNum = dataCode_.codeNum;
          const timer = setInterval(() => {
          this_.setState({
            getCodesState:false,
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
      let this_ = this;
      this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          // console.log('Received values of form: ', values);
          if (!phoneNumber.test(values.phoneNum)) {
            message.error("请输入正确的手机号码！")
          } else if (values.loginPassword !== values.aloginPassword) {
            message.error("两次密码不一致！")
          } else {
            // console.log(values);
            // 在此提交ajax数据
            axios.post('/api/user/register', {
              // 用户注册提交的所有数据
              QQnum: values.QQnum,
              phoneNum: values.phoneNum,
              loginpassword: values.loginPassword,
              aloginpassword: values.aloginPassword,
              tuCode: values.tuCode,
              captcha: values.captcha,
              yqcode: values.yqcode
            })
            .then(function (response) {   //调用接口成功执行
              // console.log(response.data);
              // response.data状态为 true的时候跳转
              if ( response.data.status ) {
                // 保存token到本地
                localStorage.setItem("token", response.data.token);
                message.success(response.data.msg);
                // 显示红包
                this_.setState({
                  hongbao: true,
                  register_money: response.data.data.register_money,
                })
                // 注册成功后执行回调跳转到任务大厅
                // message.success("注册成功！", successSkip => {
                //   this.props.history.push('/taskHallPage')
                // })
              } else {  // response.data状态为 false的时候跳转
                message.error(response.data.msg)
              }
            })
            .catch(function (error) {   //调用接口失败执行
              console.log(error);
            });
            // console.log(values);
          }
        }
      });
    }

    // 关闭红包遮罩层
    handleCancel = () => {
      this.setState({hongbao: false})
    }

    // 打开红包
    openBtn = () => {
      this.setState({openhonbao: true});
      setTimeout( () => {
  			this.setState({openhonbao: false, visible: true, hongbao:false});
  		},2000);
    }

    // 前往任务大厅
    gotoTaskHall = () => {
      this.props.history.push('/taskHallPage')
    }

    // 前往提现页面
    gotoCash = () => {
      this.props.history.push('/cash')
    }

    render() {
      const { hongbao, openhonbao, visible, register_money } = this.state;
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
            padding: "3.7rem 1.5rem 0 1.5rem"
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
          <FormItem {...formItemLayout} label="QQ号" style={{ marginBottom: '4rem' }}>
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
            <Button className="btn-buy" type="primary" htmlType="submit">免费注册</Button>
          </FormItem>
        </Form>

        {/* 注册成功红包弹窗 */}
        <Modal className={ openhonbao ? "shake" : "" } visible={hongbao} footer={null} onCancel={this.handleCancel}>
          <img onClick={ this.openBtn } alt="红包" style={{ width: '100%' }} src={Hongbao} />
        </Modal>

        {/* 打开红包获取奖励的金额弹窗 */}
        <Modal
          title="平台注册成功奖励！"
          visible={visible}
          onOk={this.gotoTaskHall}
          onCancel={this.gotoCash}
          okText={"前往任务大厅"}
          cancelText={"去提现"}
        >
          <p>{ register_money }</p>
        </Modal>

      </div>)
    }
  }

  const RegisterPage = Form.create()(RegisterPages);
  export default RegisterPage
