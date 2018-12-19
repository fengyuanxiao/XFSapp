import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { message } from 'antd';
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
        datasState: false,      //进入任务大厅调用ajax 请求延时状态
      }
      // console.log(props);
      // console.log(localStorage.getItem("token"));
  }

  // 进入任务大厅 调用任务接口
  componentWillMount() {
    // Toast.loading('任务加载中...');
    // 在此调用ajax 获取任务列表
    axios.get('/api/task/tasklist',{headers: {AppAuthorization: localStorage.getItem("token")}})   //传入唯一标识
    .then(response => {
      console.log(response.data);
      this.setState({
        task_lists: response.data.data.task_list,     //调用ajax 任务列表数据导入接口
        datasState: true
      })
    })
    .catch(error => {
      console.log(error);
    });
  }

  componentDidMount() {

  }

  //点击抢任务 进入对应的任务详情页面
  routerTo (item) {
    let this_ = this;
    axios.post('/api/task/grabTask',
    {
      task_id: item.task_id,
    },
    {
      headers: {AppAuthorization: localStorage.getItem("token")}    //post 方法传 token
    }
  )
  .then(function (response) {
    let data_ = response.data;
    console.log(data_);
    if ( data_.status ) {
      this_.props.history.push({pathname: `/myTaskDetails/${data_.order_id}`, state: {data: data_.order_id}})
    } else {
      message.warning(data_.message);       //没有绑定买号提醒
    }
  })
  .catch(function (error) {
    console.log(error);
  });
  //   console.log(item);
  //   console.log(localStorage.getItem("token"));
    // this.props.history.push({pathname: `/myTaskDetails/${item.id}`, state: {data: item}})
  }

  render() {
    const { task_lists, datasState } = this.state;

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
            axios.get('/api/task/tasklist',{headers: {AppAuthorization: localStorage.getItem("token")}})   //传入唯一标识
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
            datasState ?
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
                                <button className="button"><Link to="/questionsTask">查看任务</Link></button>
                                /* <button><Link to={{ pathname: `myTaskDetails/${item.task_id}`, state: item }}>抢此任务</Link></button> */
                              :
                              // <button><Link to="/myTaskDetails">抢此任务</Link></button>
                              <button className="button" onClick={ ()=>this.routerTo(item) }>抢此任务</button>
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
            <div className="loading">
              <img src={require("../../../img/loading.gif")} alt="loading"/>
              <p>任务加载中...</p>
            </div>
            // Toast.loading('任务加载中...')
          }
      </PullToRefresh>
    </div>
    )
  }
}

export default TaskList
