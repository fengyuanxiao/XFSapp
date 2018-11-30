import React, { Component } from 'react';

import './taskHall.css';
import RouteTabComponent from '../../component/routeTab/routeTab';  //tabs
import TaskList from './taskList/tiskList';

class TaskHallPage extends Component {
  constructor(props) {
    super();
    // console.log(props);
  }

  // 点击小钱包进入推荐有礼页面
  clickTuiJian = () => {
    this.props.history.push("/tuiJian")
  }

  render() {

    return(
      <div>
        <header className="tabTitle">任务大厅</header>
        {/* 任务列表 */}
        <TaskList token={ this.props.location.state.data } />
        {/* tabs */}
        <RouteTabComponent />
        <img className="getJinagli" onClick={ this.clickTuiJian } src={ require("../../img/download.gif") } alt="小钱包"/>
      </div>
    )
  }
}

export default TaskHallPage
