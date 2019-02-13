import React, { Component } from 'react';

import './taskHall.css';
import RouteTabComponent from '../../component/routeTab/routeTab';  //tabs
import TaskList from './taskList/tiskList';

class TaskHallPage extends Component {
  constructor(props) {
    super();
    // 打印获取token
    // console.log(localStorage.getItem("token"));
  }

  // 处理内存泄露
  componentWillUnmount = () => {
    this.setState = (state,callback)=>{
      return;
    };
  }

  // 点击小钱包进入推荐有礼页面
  clickTuiJian = () => {
    this.props.history.push("/tuiJian")
  }

  render() {

    return(
      <div>
        <header className="tabTitle" style={{ position: 'inherit' }}>任务大厅</header>
        {/* 任务列表 toke={ this.props.location.state.token }  */}
        <TaskList history ={this.props.history} />
        {/* tabs */}
        <RouteTabComponent />
        <img className="getJinagli" onClick={ this.clickTuiJian } src={ require("../../img/download.gif") } alt="小钱包"/>
      </div>
    )
  }
}

export default TaskHallPage
