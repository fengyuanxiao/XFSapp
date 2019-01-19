import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { message } from 'antd';
import PullToRefresh from 'antd-mobile/lib/pull-to-refresh';
import axios from 'axios';    //ajax

import UserCashList from '../userCashList/userCashList'; //用户提现冒泡数据

import './taskList.css';

message.config({
  duration: 1,
});

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
  }

  // 进入任务大厅 调用任务接口
  componentWillMount() {
    // Toast.loading('任务加载中...');
    // 在此调用ajax 获取任务列表
    axios.get('/api/task/tasklist',{headers: {AppAuthorization: localStorage.getItem("token")}})   //传入唯一标识
    .then(response => {
      // console.log(response.data);
      let datas = response.data.data;
      this.setState({
        task_lists: datas.task_list,                      //调用ajax 任务列表数据导入接口
        datasState: true,
        money_account: datas.money_account,               //本金
        commission_account: datas.commission_account,     //佣金
      })
    })
    .catch(error => {
      console.log(error);
    });
  }

  //垫付任务抢任务按钮 进入对应的任务详情页面
  routerTo (item) {
    let this_ = this;
    axios.post('/api/task/grabTask',
    {
      task_id: item,
    },
    {
      headers: {AppAuthorization: localStorage.getItem("token")}    //post 方法传 token
    }
  )
  .then(function (response) {
    let data_ = response.data;
    // console.log(data_);
    if ( data_.status ) {
      message.success("恭喜您，抢到啦！", successSkip => {
        // 保存order_id到本地
        localStorage.setItem("order_id", data_.data.order_id)   //点击抢任务按钮 储存order_id到本地
        this_.props.history.push({pathname: "/myTaskDetails", state: {data: data_.data.order_id}});
      })
    } else {
      message.warning(data_.msg);       //没有绑定买号提醒
    }
  })
  .catch(function (error) {
    console.log(error);
  });
    // this.props.history.push("/myTaskDetails")
  }

  // 问答任务抢任务按钮
  routerToWenda (item) {
    let this_ = this;
    axios.post('/api/task/grabquestask',
    {
      task_id: item,
    },
    {
      headers: {AppAuthorization: localStorage.getItem("token")}    //post 方法传 token
    })
    .then(function (response) {
      let data_ = response.data;
      // console.log(data_);
      if ( data_.status ) {
        message.success("恭喜您，抢到啦！", successSkip => {
          this_.props.history.push({pathname: "/questionsTask", state: {data: item}});
          // this_.props.history.push("/questionsTask");
        })
      } else {
        message.warning(data_.msg);       //没有绑定买号提醒
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    const { task_lists, datasState, money_account, commission_account } = this.state;
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
              // console.log(response.data.data.task_list);
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
              <Link to="/cash">本金：{money_account}</Link>
              <Link to="/commission">佣金：{commission_account}</Link>
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
                            {
                              item.task_type === 2 ?
                                <p style={{ fontSize: '0.9rem' }}>佣金{item.commission}元 + {item.extra_commission}元额外奖励</p>
                              :
                              <p>{item.commission}元</p>
                            }
                            <p>{item.platform}佣金任务</p>
                            <div className="amount">
                              <span>共{item.common_orderitem_num}单</span>
                              <span>剩{item.residue_order}单</span>
                            </div>
                          </div>
                          <div className="listCenter">
                            <p>{item.itemprice + item.subtotal_commission}￥</p>
                            <p>{item.task_type_text}</p>
                          </div>
                          <div className="listRight">
                            {
                              item.subtotal_commission?
                                <button className="button" onClick={ ()=>this.routerToWenda(item.task_id) }>查看任务</button>
                              :
                              <button className="button" onClick={ ()=>this.routerTo(item.task_id) }>抢此任务</button>
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
