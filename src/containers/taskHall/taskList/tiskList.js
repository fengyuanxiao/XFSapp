import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { message, Button } from 'antd';
import PullToRefresh from 'antd-mobile/lib/pull-to-refresh';
import axios from 'axios';    //ajax

import UserCashList from '../userCashList/userCashList'; //用户提现冒泡数据
// import { pageInputScroll } from '../../../component/pageInputScroll';

import './taskList.css';
import '../../../component/apis';

message.config({
  duration: 1,
});
// console.log(pageInputScroll.onPlusReady);

class TaskList extends Component {
  constructor(props) {
      super();
      this.state = {
        taskListArr : true,
        refreshing: false,
        down: true,
        height: document.documentElement.clientHeight,
        datasState: false,      //进入任务大厅调用ajax 请求延时状态
        buttonState: false,
      }
  }

  // 进入任务大厅 调用任务接口
  componentWillMount() {
    let this_ = this;
    // Toast.loading('任务加载中...');
    // 在此调用ajax 获取任务列表
    axios.get(global.constants.website+'/api/task/tasklist',{headers: {AppAuthorization: localStorage.getItem("token")}})   //传入唯一标识
    .then(response => {
      let datas = response.data.data;
      // console.log(response.data);
      if ( response.data.status === "_0001" ) {
          message.success(response.data.msg, successSkip => {
          this_.props.history.push("/");
        })
      } else {
        this.setState({
          task_lists: datas.task_list,                      //调用ajax 任务列表数据导入接口
          datasState: true,
          money_account: datas.money_account,               //本金
          commission_account: datas.commission_account,     //佣金
          is_bind: datas.is_bind,                           //是否绑定淘宝号
          bind_status: datas.bind_status,                   //是否为被冻结账号提供绑定买号入口，1是的
        })
      }
    })
    .catch(error => {
      console.log(error);
    });
  }
  // 处理内存泄露
  componentWillUnmount = () => {
    this.setState = (state,callback)=>{
      return;
    };
  }

  //垫付任务抢任务按钮 进入对应的任务详情页面
  routerTo (item, encrypt, is_gift) {
    let this_ = this;
    // console.log(item, encrypt);
    // 按钮状态被点击后进入失效状态
    this_.setState({
      buttonState: true,
    })
    axios.post(global.constants.website+'/api/task/grabTask',
    {
      task_id: item,
      encrypt: encrypt,
      latitude: localStorage.getItem("latitude"),                         //经度
      altitude: localStorage.getItem("longitude"),                        //纬度
    },
    {
      headers: {AppAuthorization: localStorage.getItem("token")}    //post 方法传 token
    })
    .then(function (response) {
      let data_ = response.data;
      // console.log(data_);
      if ( data_.status ) {
        //   message.success("恭喜您，抢到啦！", successSkip => {
        // })
        // 保存order_id到本地
        localStorage.setItem("order_id", data_.data.order_id)   //点击抢任务按钮 储存order_id到本地
        localStorage.setItem("order_type", is_gift===3?1:0)     //order_type 为3 说明浏览任务
        if ( is_gift === 4 ) {
          this_.props.history.push({pathname: "/taskPingjia", state: {data: data_.data.order_id}});
        } else {
          this_.props.history.push({pathname: "/myTaskDetails", state: {data: data_.data.order_id}});
        }
        // 按钮状态被点击后数据返回成功再次进入可点击状态
        this_.setState({
          buttonState: false,
        })
      } else {
        message.warning(data_.msg);       //没有绑定买号提醒
        this_.setState({
          buttonState: false,
        })
      }
    })
    .catch(function (error) {
      console.log(error);
    });
    // this.props.history.push("/myTaskDetails")
  }

  // 问答任务抢任务按钮
  routerToWenda (item, encrypt) {
    let this_ = this;
    // 按钮状态被点击后进入失效状态
    this_.setState({
      buttonState: true,
    })
    axios.post(global.constants.website+'/api/task/grabquestask',
    {
      task_id: item,
      encrypt: encrypt,
      latitude: localStorage.getItem("latitude"),                         //经度
      altitude: localStorage.getItem("longitude"),                      //纬度
    },
    {
      headers: {AppAuthorization: localStorage.getItem("token")}    //post 方法传 token
    })
    .then(function (response) {
      let data_ = response.data;
      // console.log(data_);
      if ( data_.status ) {
        this_.props.history.push({pathname: "/questionsTask", state: {data: item}});
        // 按钮状态被点击后数据返回成功再次进入可点击状态
        this_.setState({
          buttonState: false,
        })
      } else {
        this_.setState({
          buttonState: false,
        })
        message.warning(data_.msg);       //没有绑定买号提醒
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    const { bind_status, is_bind,task_lists, datasState, money_account, commission_account, buttonState } = this.state;
    return (
      <div>
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
            axios.get(global.constants.website+'/api/task/tasklist',{headers: {AppAuthorization: localStorage.getItem("token")}})   //传入唯一标识
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
          <div style={{ backgroundColor: '#ffe479' }} className="is_bind">
            {/* <span></span> */}
            <Link style={{ color: 'red' }} to="/activity">你有一笔奖励金待领取，速领 >></Link>
          </div>
          {
            bind_status === 6 ?
              <div className="is_bind">
                <span>是否已经很久没有任务啦？试试换一个帐号</span>
                <Link to="/taobao">前往绑定 >></Link>
              </div>
            :
            bind_status === 0 ?
              <div className="is_bind">
                <span>未绑定淘宝账号！</span>
                <Link to="/buyAdmin">前往绑定 >></Link>
              </div>
            :
            bind_status === 3 ?
              <div className="is_bind">
                <span>淘宝账号审核未通过 ！</span>
                <Link to="/buyAdmin">前往修改 >></Link>
              </div>
            :
              ''
          }
          {/* {
            bind_status === 0 || bind_status ===  ?
              ""
            :
            <div className="is_bind">
              <span>未绑定淘宝账号！</span>
              <Link to="/buyAdmin">前往绑定 >></Link>
            </div>
          } */}
          {/* {新用户红包状态
            is_bind ?
              ""
            :
            <div className="is_bind">
              <span>未绑定淘宝账号！</span>
              <Link to="/buyAdmin">前往绑定 >></Link>
            </div>
          } */}
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
                                <p style={{ fontSize: '0.9rem', color:'#ff6235', fontSize:'1.2rem' }}>佣金{item.commission}元 {item.commission_desc}</p>
                              :
                              (
                                item.task_type === 0 ?
                                  <div>
                                    <p>{item.commission}元</p>
                                    <p style={{ fontSize: '15px' }}>{item.commission_desc}</p>
                                  </div>
                                :
                                (
                                  item.task_type === 1 ?
                                    <p style={{ fontSize: '0.9rem', color:'#ff6235', fontSize:'1.2rem' }}>最低0.4元起{item.commission_desc}</p>
                                  :
                                  <p style={{ fontSize: '0.9rem', color:'#ff6235', fontSize:'1.2rem' }}>佣金{item.commission}元{item.commission_desc}</p>
                                )
                              )
                            }
                            <p>{item.platform}佣金任务</p>
                            <div className="amount">
                              <span>共{item.common_orderitem_num}单</span>
                              <span>剩{item.residue_order}单</span>
                            </div>
                          </div>
                          <div className="listCenter">
                            {
                              item.task_type === 0 ?
                                <div>
                                  <p>{item.itemprice + item.subtotal_commission}￥</p>
                                  <p style={{ color: '#797979',fontSize: '0.9rem' }}>{item.task_type_text}</p>
                                </div>
                              :
                              <p style={{ fontSize: '0.9rem',color: '#797979' }}>{item.task_type_text}</p>
                            }
                          </div>
                          <div className="listRight">
                            {
                              item.is_gift === 2 ?
                                <Button disabled={buttonState ? "disabled" : ""} className="button" onClick={ ()=>this.routerToWenda(item.task_id, item.encrypt) }>查看任务</Button>
                              :
                              <Button disabled={buttonState ? "disabled" : ""} className="button" onClick={ ()=>this.routerTo(item.task_id, item.encrypt, item.is_gift) }>抢此任务</Button>
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
