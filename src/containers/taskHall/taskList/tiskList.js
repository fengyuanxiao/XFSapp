import React, {Component} from 'react';
import { Link } from 'react-router-dom';
// import { PullToRefresh } from 'antd-mobile';
import PullToRefresh from 'antd-mobile/lib/pull-to-refresh';
// import axios from 'axios';    //ajax

import UserCashList from '../userCashList/userCashList'; //用户提现冒泡数据

import './taskList.css';

const objs={
"task_list": [
{
"task_id": 30,
"task_type": 0,
"task_type_text": "垫付任务",
"is_gift": 0,
"common_orderitem_num": 10,
"residue_order": 10,
"itemprice": 1,
"commission": 5.2,
"commission_desc": "",
"subtotal_commission": 0
},
{
"task_id": 29,
"task_type": 0,
"task_type_text": "垫付任务",
"is_gift": 1,
"common_orderitem_num": 12,
"residue_order": 12,
"itemprice": 100,
"commission": 0,
"commission_desc": "",
"subtotal_commission": 0
},
{
"task_id": 28,
"task_type": 0,
"task_type_text": "垫付任务",
"is_gift": 1,
"common_orderitem_num": 10,
"residue_order": 10,
"itemprice": 99,
"commission": 5.85,
"commission_desc": "",
"subtotal_commission": 0
},
{
"task_id": 27,
"task_type": 0,
"task_type_text": "垫付任务",
"is_gift": 1,
"common_orderitem_num": 5,
"residue_order": 5,
"itemprice": 99,
"commission": 5.85,
"commission_desc": "",
"subtotal_commission": 0
},
{
"task_id": 25,
"task_type": 0,
"task_type_text": "垫付任务",
"is_gift": 1,
"common_orderitem_num": 2,
"residue_order": 2,
"itemprice": 59,
"commission": 5.85,
"commission_desc": "",
"subtotal_commission": 0
},
{
"task_id": 26,
"task_type": 0,
"task_type_text": "垫付任务",
"is_gift": 1,
"common_orderitem_num": 2,
"residue_order": 2,
"itemprice": 59,
"commission": 5.85,
"commission_desc": "",
"subtotal_commission": 0
},
{
"task_id": 34,
"task_type": 0,
"task_type_text": "垫付任务",
"is_gift": 0,
"common_orderitem_num": 1,
"residue_order": 1,
"itemprice": 34,
"commission": 7.15,
"commission_desc": "",
"subtotal_commission": 0
},
{
"task_id": 33,
"task_type": 0,
"task_type_text": "垫付任务",
"is_gift": 0,
"common_orderitem_num": 1,
"residue_order": 1,
"itemprice": 20,
"commission": 7.15,
"commission_desc": "",
"subtotal_commission": 0
},
{
"task_id": 14,
"task_type": 0,
"task_type_text": "垫付任务",
"is_gift": 0,
"common_orderitem_num": 10,
"residue_order": 10,
"itemprice": 90,
"commission": 0,
"commission_desc": "",
"subtotal_commission": 0
},
{
"task_id": 20,
"task_type": 0,
"task_type_text": "垫付任务",
"is_gift": 1,
"common_orderitem_num": 3,
"residue_order": 3,
"itemprice": 186,
"commission": 6.5,
"commission_desc": "",
"subtotal_commission": 0
},
{
"task_id": 16,
"task_type": 0,
"task_type_text": "垫付任务",
"is_gift": 1,
"common_orderitem_num": 3,
"residue_order": 3,
"itemprice": 100,
"commission": 0,
"commission_desc": "",
"subtotal_commission": 0
},
{
"task_id": 19,
"task_type": 0,
"task_type_text": "垫付任务",
"is_gift": 0,
"common_orderitem_num": 2,
"residue_order": 2,
"itemprice": 186,
"commission": 6.5,
"commission_desc": "",
"subtotal_commission": 0
},
{
"task_id": 15,
"task_type": 0,
"task_type_text": "垫付任务",
"is_gift": 0,
"common_orderitem_num": 3,
"residue_order": 3,
"itemprice": 100,
"commission": 1.3,
"commission_desc": "",
"subtotal_commission": 0
}
],
"total_page": 0,
"empty": "暂时没有任务,请稍后再来看看^-^",
"bind_prize": "哇，恭喜您获得绑定奖励元！",
"is_bind": 1
}

function genData() {
  const dataArr = [];
  for (let i = 0; i < 20; i++) {
    dataArr.push(i);
  }
  return dataArr;
}

class TaskList extends Component {
  constructor() {
      super();
      this.state = {
        taskListArr : true,
        refreshing: false,
        down: true,
        height: document.documentElement.clientHeight,
        data: [],
        task_listss: null
      }
      // this.routerTo = this.routerTo.bind(this);
  }

  componentWillMount() {
    // axios.get('user/Task/taskListData')
    // .then(response => {
    //   console.log(response);
    // })
    // .catch(error => {
    //   console.log(error);
    // })
    console.log(123);
    console.log(objs);
    this.setState({
      data: genData(),
      task_listss: objs
    })
  }

  componentDidMount() {
    console.log(321);
  }

  // routerTo (item) {
  //   console.log(item);
  //   this.props.history.push({pathname: `/myTaskDetails/${item.id}`, state: {data: item}})
  // }

  render() {
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
            this.setState({ refreshing: true });
            setTimeout(() => {
              this.setState({ refreshing: false });
              // 刷新成功在调用ajax获取任务列表
              console.log("下拉刷新成功");
            }, 1000);
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
          <ul style={{ marginBottom: '4rem' }}>
            {
              this.state.task_listss.task_list.length ?
                this.state.task_listss.task_list.map((item,index) => {
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
                        <p>垫付任务</p>
                      </div>
                      <div className="listRight">
                        {/* ../particularsPage/particularsPage?id={{item.goods_id}} */}
                        <button><Link to="/myTaskDetails">抢此任务</Link></button>
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
      </PullToRefresh>
    </div>
    )
  }
}

export default TaskList
