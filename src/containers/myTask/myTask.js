import React, { Component } from 'react';
import { Badge, Icon, message } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './myTask.css';
import RouteTabComponent from '../../component/routeTab/routeTab';  //tabs

class MyTaskPage extends Component {
  constructor() {
    super();
    this.state = {

    }
  }
  componentWillMount() {
    let this_ = this;
    axios.get('/api/task/mytaskindex', {
      headers: {AppAuthorization: localStorage.getItem("token")}    //post 方法传 token
    })
    .then( res=> {
      let datas = res.data.data;
      // console.log(res);
      // console.log(datas);
      if ( res.data.status === "_0001" ) {
          message.success(res.data.msg, successSkip => {
          this_.props.history.push("/");
        })
      } else {
        this.setState({
          nocomplete_task_count: datas.nocomplete_task_count,               //垫付任务未完成的订单数
          complete_task_count: datas.complete_task_count,                   //垫付任务已完成的订单数
          cancel_task_count: datas.cancel_task_count,                       //垫付任务已撤销的订单数

          nocomplete_flowtask_count: datas.nocomplete_flowtask_count,       //浏览任务未完成的订单数
          complete_flowtask_count: datas.complete_flowtask_count,           //浏览任务已完成的订单数
          cancel_flowtask_count: datas.cancel_flowtask_count,               //浏览任务已撤销的订单数

          nocomplete_answertask_count: datas.nocomplete_answertask_count,   //问答任务未完成的订单数
          complete_answertask_count: datas.complete_answertask_count,       //问答任务已完成的订单数
          cancel_answertask_count: datas.cancel_answertask_count,           //问答任务已撤销的订单数
        })
      }
    })
    .catch(error => {
      console.log(error);
    })
  }
  componentWillUnmount = () => {
    this.setState = (state,callback)=>{
      return;
    };
}

  render() {
    const { cancel_answertask_count,complete_answertask_count,nocomplete_answertask_count,cancel_flowtask_count,complete_flowtask_count,nocomplete_flowtask_count,nocomplete_task_count,complete_task_count,cancel_task_count } = this.state;
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
                <Badge count={nocomplete_task_count} style={{ marginRight: '0.5rem', backgroundColor:'#007aff' }} />
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
                <Badge count={complete_task_count} style={{ marginRight: '0.5rem', backgroundColor:'#007aff' }} />
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
                <Badge count={cancel_task_count} style={{ marginRight: '0.5rem', backgroundColor:'#007aff' }} />
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
                <Badge count={nocomplete_flowtask_count} style={{ marginRight: '0.5rem', backgroundColor:'#007aff' }} />
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
                <Badge count={complete_flowtask_count} style={{ marginRight: '0.5rem', backgroundColor:'#007aff' }} />
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
                <Badge count={cancel_flowtask_count} style={{ marginRight: '0.5rem', backgroundColor:'#007aff' }} />
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
                <Badge count={nocomplete_answertask_count} style={{ marginRight: '0.5rem', backgroundColor:'#007aff' }} />
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
                <Badge count={complete_answertask_count} style={{ marginRight: '0.5rem', backgroundColor:'#007aff' }} />
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
                <Badge count={cancel_answertask_count} style={{ marginRight: '0.5rem', backgroundColor:'#007aff' }} />
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
