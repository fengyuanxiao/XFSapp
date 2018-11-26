import React,{ Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';

class Personal extends Component {
  render() {
    return(
      <div>
        <header className="tabTitle">
          <div className="return"><Link to="/myCenter"><Icon type="left" theme="outlined" />返回</Link></div>
          个人信息
        </header>
        <ul style={{ marginBottom: '3.7rem', paddingTop:'3rem' }}>
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
          <li>
            <Link className="myCenter-A" to="/txPassword">
              <div>
                <Icon type="credit-card" />
                <span>修改提现密码</span>
              </div>
              <div>
                <Icon type="right" />
              </div>
            </Link>
          </li>
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
            <Link className="myCenter-A" to="/certification">
              <div>
                <Icon type="idcard" />
                <span>实名认证</span>
              </div>
              <div>
                <Icon type="right" />
              </div>
            </Link>
          </li>
          <li>
            <Link className="myCenter-A" to="/bank">
              <div>
                <Icon type="property-safety" />
                <span>银行卡绑定</span>
              </div>
              <div>
                <Icon type="right" />
              </div>
            </Link>
          </li>
        </ul>
      </div>
    )
  }
}

export default Personal
