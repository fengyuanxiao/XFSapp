import React, { Component } from 'react';
import {  Link } from 'react-router-dom';
import { Icon } from 'antd';

import './routeTab.css';

class RouteTabComponent extends Component {
  render() {
    return(
      <ul className="route-tab">
        <li><Link to='/taskHallPage'><Icon style={{ fontSize: '20px' }} twoToneColor="#52c41a" type="fire" theme="twoTone" /><p>任务大厅</p></Link></li>
        <li><Link to='/myTask'><Icon style={{ fontSize: '20px' }} twoToneColor="#52c41a" type="profile" theme="twoTone" /><p>我的任务</p></Link></li>
        <li><Link to='/myCenter'><Icon style={{ fontSize: '20px' }} twoToneColor="#52c41a" type="dollar" theme="twoTone" /><p>个人中心</p></Link></li>
      </ul>
    )
  }
}

export default RouteTabComponent
