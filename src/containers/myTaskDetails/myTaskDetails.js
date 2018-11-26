import React, { Component } from 'react';
import { Icon } from 'antd';
import { Link } from 'react-router-dom';

import RouteTabComponent from '../../component/routeTab/routeTab';  //tabs
import DetailsPouduct from './detailsProduct/detailsProduct';
import TaskState from './taskState/taskState';
import TaskPlan from './taskPlan/taskPlan';
import './myTaskDetails.css';

class MyTaskDetails extends Component {
  // constructor(props, context) {
  //   super(props, context);
  //   console.log(props.location.state);
  // }

  // 页面未加载就开始执行 生命周期函数，componentWillMount最先执行   此处函数调 ajax数据交互
  componentWillMount() {
    // axios.get('user/Task/taskListData')
    // .then(response => {
    //   console.log(response);
    // })
    // .catch(error => {
    //   console.log(error);
    // })
    console.log("最先执行");
  }

  render() {
    return(
      <div>
        <header className="tabTitle">
          <div className="return"><Link to="/taskHallPage"><Icon type="left" theme="outlined" />返回</Link></div>
          我的任务详情
        </header>
        {/* 商品成交价格、件数 */}
        <DetailsPouduct />
        {/* 任务状态 */}
        <TaskState />
        {/* 任务进度 */}
        <TaskPlan />
        {/* tabs */}
        <RouteTabComponent />
      </div>
    )
  }
}

export default MyTaskDetails
