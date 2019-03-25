import React,{ Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon, message } from 'antd';
import axios from 'axios';
import '../../../component/apis';

message.config({
  top: 300,
});

class Personal extends Component {

  componentWillMount() {
    axios.get(global.constants.website+'/api/index/userInfo', {
      headers: {AppAuthorization: localStorage.getItem("token")}
    })
    .then( res =>{
      let datas = res.data.data;
      // console.log(datas);
      this.setState({
        realname_status: datas.realname_status,
        bank_status: datas.bank_status,
      })
    })
    .catch(error => {
      console.log(error);
    });
  }
  // 处理内存泄露
  componentWillUnmount = () => {
    this.setState = (state, callback) => {
      return;
    };
  }

  // 实名认证
  Certification = () => {
    let states = this.state;
    if ( states.realname_status === 0 || states.realname_status === 3 ) {
      localStorage.setItem("realname_status", states.realname_status);            //将账号保存到本地
      this.props.history.push("/certification")
      // this.props.history.push({pathname: '/certification', state: {realname_status: states.realname_status}});
    } else if ( states.realname_status === 2 ) {
      message.warning("身份证审核中，请添加客服中心指定的微信或QQ号 加快进度审核！");
    } else {
      message.success("已认证！");
    }
  }

  // 银行卡绑定
  bindBank = () => {
    let states = this.state;
    if ( states.bank_status === 0 || states.bank_status === 3 ) {
      localStorage.setItem("bank_status", states.bank_status);            //将账号保存到本地
      this.props.history.push("/bank")
    } else if ( states.bank_status === 2 ) {
      message.warning("银行卡审核中，请确认是否已实名认证！");
    } else {
      message.success("已绑定！");
    }
  }

  render() {
    return(
      <div>
        <header className="tabTitle">
          <div className="return"><Link to="/myCenter"><Icon type="left" theme="outlined" />返回</Link></div>
          个人信息
        </header>
        <ul className="lists" style={{ marginBottom: '3.7rem', paddingTop:'3rem' }}>
          <li>
            <Link className="myCenter-A" to="/account">
              <div>
                <Icon type="user" />
                <span>修改账号</span>
              </div>
              <div>
                <Icon type="right" />
              </div>
            </Link>
          </li>
          <li>
            <Link className="myCenter-A" to="/LoginPassword">
              <div>
                <Icon type="unlock" />
                <span>修改登录密码</span>
              </div>
              <div>
                <Icon type="right" />
              </div>
            </Link>
          </li>
          {/* <li>
            <Link className="myCenter-A" to="/txPassword">
              <div>
            <Icon type="credit-card" />
            <span>修改提现密码</span>
              </div>
              <div>
            <Icon type="right" />
              </div>
            </Link>
          </li> */}
          <li>
            <Link className="myCenter-A" to="/xgQQ">
              <div>
                <Icon type="qq" />
                <span>修改QQ号</span>
              </div>
              <div>
                <Icon type="right" />
              </div>
            </Link>
          </li>
          <li>
            <div onClick={ this.Certification } className="myCenter-A">
              {/* <Link className="myCenter-A" to="/certification"> */}
              <div>
                <Icon type="idcard" />
                <span>实名认证</span>
              </div>
              <div>
                <Icon type="right" />
              </div>
              {/* </Link> */}
            </div>
          </li>
          <li>
            <div onClick={ this.bindBank } className="myCenter-A">
              {/* <Link className="myCenter-A" to="/bank"> */}
              <div>
                <Icon type="property-safety" />
                <span>银行卡绑定</span>
              </div>
              <div>
                <Icon type="right" />
              </div>
              {/* </Link> */}
            </div>
          </li>
        </ul>
      </div>
    )
  }
}

export default Personal
