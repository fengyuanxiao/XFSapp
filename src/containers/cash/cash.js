import React, { Component } from 'react';
import { Icon, Input, Button, message } from 'antd';
import { Link } from 'react-router-dom';
import { Tabs, WhiteSpace } from 'antd-mobile';

import './cash.css';

const tabs = [
  { title: '本金提现' },
  { title: '佣金提现' },
];

class CashPage extends Component {
  constructor() {
    super();
    this.state = {
      cashYJ: 99.00,  //佣金金额
      cashBJ: 999.00, //本金金额
      inputYJ: null,  //佣金提现input内输入金额
      inputBJ: null   //本金提现input内输入金额
    }

    this.yJTiXianBtn = this.yJTiXianBtn.bind(this);
    this.yongJin = this.yongJin.bind(this);
    this.bJTiXianBtn = this.bJTiXianBtn.bind(this);
  }

  // 全部提现按钮
  allTiXianBtn = (e) => {
    this.setState({
      inputYJ: this.state.cashYJ
    })
    console.log(this.state.cashYJ);
  }
  // 佣金input输入提现金额
  yongJin = (e) => {
    this.setState({
      inputYJ: e.target.value
    })
    // console.log(e.target.value);
  }
  // 佣金提现按钮
  yJTiXianBtn = (e) => {
    if ( this.state.inputYJ == null ) {
      message.error('请输入提现金额！');
    } else {
      message.success('提现成功，2-24小时内到账！');
    }
    console.log(this.state.inputYJ);
  }

  // 本金input输入提现金额
  benJin = (e) => {
    this.setState({
      inputBJ: e.target.value
    })
  }
  // 本金提现按钮
  bJTiXianBtn = () => {
    console.log(this);
    if ( this.state.inputBJ == null ) {
      message.error('请输入提现金额！');
    } else {
      message.success('提现成功，2-24小时内到账！');
      console.log(this.state.inputBJ);
    }
  }

  render() {
    return(
      <div>
        <header className="tabTitle">
          <div className="return"><Link to="/myCenter"><Icon type="left" theme="outlined" />返回</Link></div>
          提现
        </header>
        <WhiteSpace style={{ paddingTop: '3rem' }} />
          <Tabs tabs={tabs} initialPage={0} animated={false} useOnPan={false}>
            {/* 本金提现 */}
            <div className="cash">
              <p>
                <span style={{ color: '#01AAED' }}>本金余额：</span>
                <span>￥ { this.state.cashBJ }元</span>
              </p>
              <div className="cash-money">
                <p>
                  <span>本金提现：</span>
                  <Input value={ this.state.inputBJ } onChange={ this.benJin } placeholder="提现金额" />元
                </p>
                {/* <p>
                  <span style={{ color: '#01AAED' }}>全部提现</span>
                </p> */}
              </div>
              <Button onClick={ this.bJTiXianBtn } style={{ width: '80%', margin: '0 auto', display: 'block', marginBottom: '1rem' }} type="primary">立即提现</Button>
              <div className="cash-footer">
                <p>1.本金佣金每天各有一次提现次数</p>
                <p>2.财务处理返款时间</p>
                  <p>&nbsp;&nbsp;a.12:00(处理昨日18:00-今日12:00间的提现申请)</p>
                  <p>&nbsp;&nbsp;b.18:00(处理今日12:00-今日18:00间的提现申请)</p>
                  <p>实际到账时间以银行处理时间为准</p>
              </div>
            </div>
            {/* 佣金提现 */}
            <div className="cash">
              <p>
                <span style={{ color: '#01AAED' }}>佣金余额：</span>
                <span>￥ { this.state.cashYJ }元</span>
              </p>
              <div className="cash-money">
                <p>
                  <span>佣金提现：</span>
                  <Input value={ this.state.inputYJ } onChange={ this.yongJin } placeholder="提现金额" />元
                </p>
                <p>
                  <span onClick={ this.allTiXianBtn } style={{ color: '#01AAED' }}>全部提现</span>
                </p>
              </div>
              <Button onClick={ this.yJTiXianBtn } style={{ width: '80%', margin: '0 auto', display: 'block', marginBottom: '1rem' }} type="primary">立即提现</Button>
              <div className="cash-footer">
                <p>1.本金佣金每天各有一次提现次数</p>
                <p>2.财务处理返款时间</p>
                  <p>&nbsp;&nbsp;a.12:00(处理昨日18:00-今日12:00间的提现申请)</p>
                  <p>&nbsp;&nbsp;b.18:00(处理今日12:00-今日18:00间的提现申请)</p>
                  <p>实际到账时间以银行处理时间为准</p>
              </div>
            </div>
          </Tabs>
        <WhiteSpace />
      </div>
    )
  }
}

export default CashPage
