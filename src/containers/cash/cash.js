import React, { Component } from 'react';
import { Icon, Input, Button, message, Modal, Form } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import WhiteSpace from 'antd-mobile/lib/white-space';

import './cash.css';
import '../../component/apis';

class CashPage extends Component {
  constructor() {
    super();
    this.state = {
      inputYJ: "",                      //佣金提现input内输入金额
      inputBJ: "",                      //本金提现input内输入金额
      visibleBJ: false,                   //本金点击提现按钮显示modal
      getCodesState: true,                //如果为true 显示 获取验证码按钮
      codeNum: 60,                        //获取验证码按钮 倒计时 60s
      tuValue: null,                      //图形验证码value值
      phoneCodes: null,                   //短信验证码input 值
      TestGetCode: "获取验证码",           //获取短信验证码按钮文字
    }
  }

  componentWillMount() {
    axios.get(global.constants.website+'/api/index/cash',
    {
      headers: {AppAuthorization: localStorage.getItem("token")}
    })
    .then( res => {
      console.log(res.data.data);
      let datas = res.data.data;
      this.setState({
        cashBJ: datas.money_account,                      //本金
        cashYJ: datas.commission_account,                 //佣金
        mobile: datas.mobile,                             //手机号
        bank_name: datas.bank_name,                       //提现银行名称
        bank_card_NO: datas.bank_card_NO,                 //银行卡卡号末尾四位数
        bank_status: datas.bank_status,                   //银行卡绑定状态 0未绑定 1已审核 2 审核中 3未通过
        realname_status:datas.realname_status,            //实名认证状态 0未绑定 1已审核 2 审核中 3未通过
        is_black: datas.is_black,                         //1表示用户被冻结
        withdraw_account: datas.withdraw_account,         //可提现总金额
      });
    })
    .catch(error => {
      console.log(error);
    });

    // 图形验证码
    axios.get(global.constants.website+'/api/user/getcaptcha')
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
    axios.get(global.constants.website+'/api/user/getcaptcha')
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

  // 图片验证码value值
  tuCode = (e) => {
    this.setState({
      tuValue: e.target.value
    })
  }
  //短信验证码 value值
  phoneCode = (e) => {
    this.setState({
      phoneCodes: e.target.value
    })
  }

  // 获取短信验证码
  setCode = () => {
    let states = this.state;
    let this_ = this;   //存入  this
    if (states.tuValue === null) {
      message.error("请输图形验证码！");
    } else {
      // 再次调用获取验证码接口
      axios.post(global.constants.website+'/api/user/sendcode', {
        sid: states.sid,
        tuCode: states.tuValue,
        phoneNum: states.mobile
      })
      .then(function (response) {   //调用接口成功执行
        // console.log(response.data);
        // 判断后台返回数据 status 状态 true 图片验证码正确 执行下面
        if ( response.data.status ) {
          // 倒计时 获取短信验证码
          let codeNum = states.codeNum;
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
    // console.log("在此调用获取短信验证码接口");
  }

  // 本金提现按钮
  bJTiXianBtn = () => {
    let this_ = this;
    let stateData = this.state;
    // console.log(this.state.cashBJ);
    if ( stateData.bank_status === 1 && stateData.realname_status === 1 && stateData.is_black === 0 ) {
      if ( this.state.withdraw_account === "0.00" ) {
        message.error('没有本金可提现！');
      } else {
        this_.setState({
          visibleBJ: true,
        });
        // message.success('提现成功，2-24小时内到账！');
      }
    } else if ( stateData.bank_status === 2 ) {
      message.warning('银行卡在审核中！');
    } else if ( stateData.bank_status === 3 ) {
      message.warning('银行卡审核未通过！');
      this_.props.history.push("/bank");
    } else if ( stateData.bank_status === 0 ) {
      message.warning('请先绑定银行卡！');
      this_.props.history.push("/bank");
    } else if ( stateData.realname_status === 0 ) {
      message.warning('请先绑定身份证！');
      this_.props.history.push("/certification");
    } else if ( stateData.realname_status === 2 ) {
      message.warning('身份证在审核中！');
    } else if ( stateData.realname_status === 3 ) {
      message.warning('实名绑定未通过！');
      this_.props.history.push("/certification");
    } else if ( stateData.is_black === 1 ) {
      message.warning('该账号被冻结！');
    }
  }
  //立即提现按钮回调
  BJhandleOk = (e) => {
    let that = this.state;
    if ( that.tuValue === null || that.phoneCodes === null ) {
      message.error("请输入必填项")
    } else {
      axios.post(global.constants.website+'/api/index/cashcommit', {
        money: that.withdraw_account,
        smscode: that.phoneCodes,
      },{
        headers: {AppAuthorization: localStorage.getItem("token")}
      })
      .then( res => {
        // console.log(res.data);
        if ( res.data.status ) {
          this.setState({
            visibleBJ: false,
          });
          message.success(res.data.msg);
          this.props.history.push("/myCenter");
        } else {
          this.setState({
            visibleBJ: false,
          });
          message.error(res.data.msg);
        }
      })
      .catch(function (error) {   //调用接口失败执行
        console.log(error);
      });
    }
  }

  BJhandleCancel = (e) => {
    this.setState({
      visibleBJ: false,
    });
  }

  render() {
    const { withdraw_account, tuCodeLink, codeNum, TestGetCode,bank_name,bank_card_NO } = this.state;
    return(
      <div>
        <header className="tabTitle">
          <div className="return"><Link to="/myCenter"><Icon type="left" theme="outlined" />返回</Link></div>
          提现
          <div className="returns"><Link to="/cashRecord">提现记录</Link></div>
        </header>
        <WhiteSpace style={{ paddingTop: '3rem' }} />
        <div className="tongs">
          <Icon style={{ paddingRight: '0.4rem' }} type="property-safety" theme="twoTone" />
          <span>将提现到您 尾号（{bank_card_NO} {bank_name}）</span>
        </div>
        {/* 本金提现 */}
        <div className="cash">
          <p>
            <span style={{ color: '#01AAED' }}>可提现总余额：</span>
            <span>￥ { withdraw_account }元</span>
          </p>
          <div className="cash-money">
            <p>
              <span>提现余额：</span>
              <Input value={ withdraw_account } type="Number" disabled={true} onChange={ this.benJin } placeholder="提现金额" />元
            </p>
            {/* <p>
                <span style={{ color: '#01AAED' }}>全部提现</span>
            </p> */}
          </div>
          <Button onClick={ this.bJTiXianBtn } style={{ width: '80%', margin: '0 auto', display: 'block', marginBottom: '1rem' }} type="primary">立即提现</Button>
          <div className="cash-footer">
            <p>1.银行卡提现每天只能一次</p>
            <p>2.提现满500奖励1元，满1000奖励2元，以此类推！</p>
            <p>3.财务处理返款时间</p>
            <p>&nbsp;&nbsp;a.12:00(处理昨日18:00-今日12:00间的提现申请)</p>
            <p>&nbsp;&nbsp;b.18:00(处理今日12:00-今日18:00间的提现申请)</p>
            <p>实际到账时间以银行处理时间为准</p>
          </div>
        </div>
        <WhiteSpace />

        <Modal
          title="发送短信验证码到你注册手机号"
          visible={this.state.visibleBJ}
          onOk={this.BJhandleOk}
          onCancel={this.BJhandleCancel}
          okText="立即提现"
          cancelText="取消"
        >
          <Form onSubmit={this.handleSubmit}>
            <p>图片验证码</p>
            <div className="modal-top">
              <Input onChange={ this.tuCode } placeholder="请输入图片验证码" />
              <img onClick={ this.getVerifyCode } src={tuCodeLink} alt="图片验证码"/>
            </div>
            <p>手机短信验证码</p>
            <div className="modal-top">
              <Input onChange={ this.phoneCode } placeholder="请输入短信验证码" />
              {
                this.state.getCodesState
                  ? <Button style={{ marginTop: 0 }} onClick={this.setCode}>{ TestGetCode }</Button>
                  : <Button style={{ marginTop: 0 }} disabled="disabled">{codeNum}秒</Button>
              }
            </div>
          </Form>
        </Modal>
      </div>
    )
  }
}

export default CashPage
