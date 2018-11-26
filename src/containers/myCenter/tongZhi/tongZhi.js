import React, { Component } from 'react';
import { Icon } from 'antd';
import { Link  } from 'react-router-dom';

import './tongZhi.css';

class TongZhi extends Component {
  render() {
    return(
      <div>
        <header className="tabTitle">
          <div className="return"><Link to="/myCenter"><Icon type="left" theme="outlined" />返回</Link></div>
          公告列表
        </header>
        <ul className="tongZhi-box">
          <li>
            <Link to="/tongZhiChild">
              <span>23反垃圾垃圾客流集散点附近</span>
              <span>18-04-11</span>
            </Link>
          </li>
        </ul>
      </div>
    )
  }
}

export default TongZhi
