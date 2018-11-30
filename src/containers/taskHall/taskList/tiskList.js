import React, {Component} from 'react';
import { Link } from 'react-router-dom';
// import { PullToRefresh } from 'antd-mobile';
import PullToRefresh from 'antd-mobile/lib/pull-to-refresh';
import axios from 'axios';    //ajax

import UserCashList from '../userCashList/userCashList'; //用户提现冒泡数据

import './taskList.css';

class TaskList extends Component {
  constructor(props) {
      super();
      this.state = {
        taskListArr : true,
        refreshing: false,
        down: true,
        height: document.documentElement.clientHeight,
        task_lists: null,            //调用ajax 任务列表数据导入接口
        datasState: false,      //进入任务大厅调用ajax 请求延时状态
      }
      // console.log(props);   //token
  }

  componentWillMount() {
    // 在此调用ajax 获取任务列表
    axios.get('/api/task/tasklist',{headers: {AppAuthorization: this.props.token}})   //传入唯一标识
    .then(response => {
      console.log(response.data.data.task_list);
      this.setState({
        task_lists: response.data.data.task_list,
        datasState: true
      })
    })
    .catch(error => {
      console.log(error);
    });
  }

  componentDidMount() {

  }

  // routerTo (item) {
  //   console.log(item);
  //   this.props.history.push({pathname: `/myTaskDetails/${item.id}`, state: {data: item}})
  // }

  render() {
    const { task_lists } = this.state;
    // http://m.xhx2018.com/user/Task/taskListData
    return (
      <div style={{ paddingTop: '3.3rem' }}>
        <PullToRefresh
          damping={80}
          style={{
            height: this.state.height,
            overflow: 'auto',
          }}
          refreshing={this.state.refreshing}
          onRefresh={() => {
            // 下拉状态为 true
            this.setState({ refreshing: true });
            // 刷新成功在调用ajax获取任务列表
            axios.get('/api/task/tasklist',{headers: {AppAuthorization: this.props.token}})   //传入唯一标识
            .then(response => {
              console.log(response.data.data.task_list);
              this.setState({
                task_lists: response.data.data.task_list,
                refreshing: false     //获取任务列表成功 下拉状态将改为 false  隐藏
              })
            })
            .catch(error => {
              console.log(error);
            });
          }}
        >
          {/* 本金佣金 */}
          <section className="task-hall-top">
            <div className="task-hall-top-child">
              <Link to="/cash">本金：100</Link>
              <Link to="/commission">佣金：3.00</Link>
            </div>
          </section>
          {/* 提现用户数据冒泡 */}
          <UserCashList />
          {/* 任务列表 */}
          {
            this.state.datasState ?
              <ul style={{ marginBottom: '4rem' }}>
                {
                  task_lists.length ?
                    task_lists.map((item,index) => {
                      return(
                        <li key={item.task_id} className="task-list">
                          <div className="listLeft">
                            <p>佣金{item.commission}元{item.commission_desc}</p>
                            <div className="amount">
                              <span>共{item.common_orderitem_num}单</span>
                              <span>剩{item.residue_order}单</span>
                            </div>
                          </div>
                          <div className="listCenter">
                            <p>{item.itemprice}￥</p>
                            <p>{item.task_type_text}</p>
                          </div>
                          <div className="listRight">
                            {/* ../particularsPage/particularsPage?id={{item.goods_id}} */}
                            {
                              item.subtotal_commission?
                                <button><Link to="/questionsTask">查看任务</Link></button>
                              :
                              <button><Link to="/myTaskDetails">抢此任务</Link></button>
                            }
                            {/* <button><Link to={{ pathname: `myTaskDetails/${item.task_id}`, state: item }}>抢此任务</Link></button> */}
                            {/* <button onClick={ ()=>this.routerTo(item) }>抢此任务</button> */}
                          </div>
                        </li>
                      )
                    })
                  :
                  <li className="null-list">暂时没有任务，稍后再来看看^-^</li>
                }
              </ul>
            :
            <div>正在加载数据.....</div>
          }
      </PullToRefresh>
    </div>
    )
  }
}

export default TaskList
