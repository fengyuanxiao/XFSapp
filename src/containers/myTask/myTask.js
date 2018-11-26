import React, { Component } from 'react';
import { Badge, Icon } from 'antd';
import { Link } from 'react-router-dom';

import './myTask.css';
import RouteTabComponent from '../../component/routeTab/routeTab';  //tabs

class MyTaskPage extends Component {
  render() {
    return(
      <div>
        <header className="tabTitle">我的任务</header>
        <RouteTabComponent />
        <ul className="myTask-box">
          {/* 已接垫付任务 */}
          <li className="myTask-box-title">
            已接垫付任务
          </li>
          <li>
            <Link to="/dfTaskNo">
              <div>
                <Icon style={{ fontSize: '1.2rem' }} type="form" theme="outlined" />
                <span>未完成</span>
              </div>
              <div>
                <Badge count={5} style={{ marginRight: '0.5rem', backgroundColor:'#007aff' }} />
                <Icon type="right" theme="outlined" />
              </div>
            </Link>
          </li>
          <li>
            <Link to="/dfTaskOk">
              <div>
                <Icon style={{ fontSize: '1.2rem' }} type="check" theme="outlined" />
                <span>已完成</span>
              </div>
              <div>
                <Badge count={1} style={{ marginRight: '0.5rem', backgroundColor:'#007aff' }} />
                <Icon type="right" theme="outlined" />
              </div>
            </Link>
          </li>
          <li>
            <Link to="/dfTaskChe">
              <div>
                <Icon style={{ fontSize: '1.2rem' }} type="rest" theme="outlined" />
                <span>已撤销</span>
              </div>
              <div>
                <Badge count={1} style={{ marginRight: '0.5rem', backgroundColor:'#007aff' }} />
                <Icon type="right" theme="outlined" />
              </div>
            </Link>
          </li>
          {/* 已接浏览任务 */}
          <li className="myTask-box-title">
            已接浏览任务
          </li>
          <li>
            <Link to="/liuLanTaskNo">
              <div>
                <Icon style={{ fontSize: '1.2rem' }} type="form" theme="outlined" />
                <span>未完成</span>
              </div>
              <div>
                <Badge count={1} style={{ marginRight: '0.5rem', backgroundColor:'#007aff' }} />
                <Icon type="right" theme="outlined" />
              </div>
            </Link>
          </li>
          <li>
            <Link to="/liuLanTaskOk">
              <div>
                <Icon style={{ fontSize: '1.2rem' }} type="check" theme="outlined" />
                <span>已完成</span>
              </div>
              <div>
                <Badge count={1} style={{ marginRight: '0.5rem', backgroundColor:'#007aff' }} />
                <Icon type="right" theme="outlined" />
              </div>
            </Link>
          </li>
          <li>
            <Link to="/liuLanTaskChe">
              <div>
                <Icon style={{ fontSize: '1.2rem' }} type="rest" theme="outlined" />
                <span>已撤销</span>
              </div>
              <div>
                <Badge count={1} style={{ marginRight: '0.5rem', backgroundColor:'#007aff' }} />
                <Icon type="right" theme="outlined" />
              </div>
            </Link>
          </li>
          {/* 已接问答任务 */}
          <li className="myTask-box-title">
            已接问答任务
          </li>
          <li>
            <Link to="/wenDaTaskNo">
              <div>
                <Icon style={{ fontSize: '1.2rem' }} type="form" theme="outlined" />
                <span>未完成</span>
              </div>
              <div>
                <Badge count={1} style={{ marginRight: '0.5rem', backgroundColor:'#007aff' }} />
                <Icon type="right" theme="outlined" />
              </div>
            </Link>
          </li>
          <li>
            <Link to="/wenDaTaskOk">
              <div>
                <Icon style={{ fontSize: '1.2rem' }} type="check" theme="outlined" />
                <span>已完成</span>
              </div>
              <div>
                <Badge count={1} style={{ marginRight: '0.5rem', backgroundColor:'#007aff' }} />
                <Icon type="right" theme="outlined" />
              </div>
            </Link>
          </li>
          <li>
            <Link to="/wenDaTaskChe">
              <div>
                <Icon style={{ fontSize: '1.2rem' }} type="rest" theme="outlined" />
                <span>已撤销</span>
              </div>
              <div>
                <Badge count={1} style={{ marginRight: '0.5rem', backgroundColor:'#007aff' }} />
                <Icon type="right" theme="outlined" />
              </div>
            </Link>
          </li>
        </ul>
      </div>
    )
  }
}

export default MyTaskPage
