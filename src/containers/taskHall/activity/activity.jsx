import React,{ Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon, Input, message } from 'antd';
import axios from 'axios';
import copy from 'copy-to-clipboard';             //点击按钮拷贝

import '../../myCenter/tuiJian/tuijian.css';
import '../../../component/apis';

// const text = <span>邀请奖励说明</span>;
// const content = (
//   <div className="contents">
//     <p><Icon type="check-circle" theme="twoTone" />一级好友：通过你的推广链接注册的用户。</p>
//     <p><Icon type="check-circle" theme="twoTone" />一级好友完成首单任务你可获得1-3元奖励。</p>
//     <p><Icon type="check-circle" theme="twoTone" />一级好友绑定淘宝帐号成功你和好友都可获得0.3-88元奖励。</p>
//     <p><Icon type="check-circle" theme="twoTone" />二级好友：你的好友邀请注册的用户。</p>
//     <p><Icon type="check-circle" theme="twoTone" />好友每完成一笔任务，一级好友<span style={{ color: '#2897ff', fontWeight: 'bold' }}>奖励你该任务佣金的10%，二级好友奖励5%。</span>此奖永久有效。</p>
//   </div>
// );

class ActivityPage extends Component {
  constructor() {
    super();
    this.state= {
      visible: false,
    }
  }

  componentWillMount() {
    axios.get(global.constants.website+'/api/index/action_invite', {
      headers: {AppAuthorization: localStorage.getItem("token")}        //post 方法传 token
    })
    .then( res => {
      let datas = res.data.data;
      // console.log(datas);
      this.setState({
        YQcode: datas.code,                                 //用户专属邀请码
        active_num: datas.active_num,                       //邀请的二级用户数中激活的人数
        use_num: datas.use_num,                             //已邀请的二级用户数
        placeholder: datas.share_link,                     //下载链接
      })
    })
    .catch(function(error) {
      console.log(error);
    });
  }

  // 点击复制APP下载链接
  cloneBtn = (e) => {
    copy(this.state.placeholder);        //点击按钮拷贝
    message.success('复制成功，如果失败，请手动复制。');
  }

  // 复制邀请码按钮
  copyYQcode = () => {
    copy(this.state.YQcode);             //点击按钮拷贝
    message.success('复制成功，如果失败，请手动复制。');
  }

  // 邀请收益说明
  hide = () => {
    this.setState({
      visible: false,
    });
  }
  handleVisibleChange = (visible) => {
    this.setState({ visible });
  }

  render() {
    const { YQcode, active_num, use_num } = this.state;
    return(
      <div style={{ backgroundColor: '#ed3c0e' }}>
        <header className="tabTitle">
          <div className="return"><Link to="/taskHallPage"><Icon type="left" theme="outlined" />返回</Link></div>
          奖励多多
        </header>
        <img className="top-img" src={ require("../../../img/activity.png") } alt="topImg" />
        <div className="links-list" style={{ paddingBottom: '1.5rem' }}>
          <div className="links-list-top">
            <img src={ require("../../../img/a22.png") } alt="aa" />
          </div>
          <div className="zhuanshuCode">
            你的专属邀请码：<span>{ YQcode }</span>
            <button onClick={ this.copyYQcode } style={{ backgroundColor: '#ed3c0e', marginTop: '0' }}>点击复制</button>
          </div>
          <Input disabled={true} style={{ width: '100%', fontSize: '1rem' }} placeholder={ this.state.placeholder } />
          <button onClick={ this.cloneBtn } className="download-btn1">点击复制APP下载链接</button>
          <div className="contents" style={{ padding: '15px', fontSize: '15px' }}>
            <p style={{ textAlign: 'center', fontWeight:'bold', paddingBottom:'7px' }}>活动时间：即日起至6月10日止</p>
            <p><Icon type="check-circle" theme="twoTone" />成功激活用户数<span className="spanStyle">10人</span>额外奖励<span className="spanStyle">10元</span></p>
            <p><Icon type="check-circle" theme="twoTone" />成功激活用户数<span className="spanStyle">30人</span>额外奖励<span className="spanStyle">36元</span></p>
            <p><Icon type="check-circle" theme="twoTone" />成功激活用户数<span className="spanStyle">50人</span>额外奖励<span className="spanStyle">75元</span></p>
            <p><Icon type="check-circle" theme="twoTone" />成功激活用户数量奖励<span className="spanStyle">上不封顶</span>.....</p>
          </div>
          {/* <Popover
            content={content}
            title={text}
            trigger="click"
            visible={this.state.visible}
            onVisibleChange={this.handleVisibleChange}
            >
            <div className="shouyi">
              <div>
            <Icon type="question-circle" theme="twoTone" />
            <p>邀请奖励说明</p>
              </div>
            </div>
          </Popover> */}
          <ul>
            <li>
              <span>活动期间邀请人数</span>
              <span>{ use_num }个</span>
            </li>
            <li>
              <span>活动期间激活人数</span>
              <span>{ active_num }个</span>
            </li>
          </ul>
          <div style={{ paddingTop: '15px' }}>
            <p><span style={{ color: '#ed3c0e', fontSize: '20px' }}>*</span>只要你的小伙伴给力 注册多多奖励多多哟！</p>
            <p><span style={{ color: '#ed3c0e', fontSize: '20px' }}>*</span>（激活用户是指：用户成功绑定淘宝买号审核且通过）</p>
            <p><span style={{ color: '#ed3c0e', fontSize: '20px' }}>*</span>奖励金将在活动截止后3个工作日内发放到各位的账户 如有疑问可咨询客服了解详情！</p>
            <p><span style={{ color: '#ed3c0e', fontSize: '20px' }}>*</span>活动时间内，活动奖励与平台正常奖励同时享受</p>
            <p><span style={{ color: '#ed3c0e', fontSize: '20px' }}>*</span>并且悄悄告诉你，以后他们做的每一单你还有任务佣金哦（平台补贴，不扣你朋友佣金）</p>
          </div>
        </div>
      </div>
    )
  }
}

export default ActivityPage
