import React, { Component } from 'react';
import { Icon, Button } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Tabs from 'antd-mobile/lib/tabs';
import WhiteSpace from 'antd-mobile/lib/white-space';

import '../dianFuTask/dianFuTask.css';
import '../../component/apis';

const tabs = [
  { title: '商家审核' },
  { title: '提交问答..' },
  { title: '待返佣金' },
  { title: '所有' },
];

class WenDaTaskNo extends Component {
  constructor() {
    super();
    this.state = {
      datasShow: false,         //为true 显示任务列表
    }
  }

  componentWillMount() {
    axios.post(global.constants.website+'/api/task/mytaskanswerlist',{
      status: 5
    },{
      headers: {AppAuthorization: localStorage.getItem("token")}    //post 方法传 token
    })
    .then( res => {
      let resData = res.data.data;
      // console.log(resData);
      this.setState({
        datasShow: true,                              //为true 显示任务列表
        task_lists: resData.task_list,                //任务列表数据
      });
    })
    .catch( error => {
      console.log(error);
    })
  }

  // Tabs 跳转传递不同类型参数
  onChange =(e) => {
    // console.log(e.title);
    if ( e.title === "商家审核" ) {
      axios.post(global.constants.website+'/api/task/mytaskanswerlist',{
        status: 0,
      },{
        headers: {AppAuthorization: localStorage.getItem("token")}    //post 方法传 token
      })
      .then( res => {
        // console.log(res.data.data.task_list);
        this.setState({
          statea: res.data.data.task_list,
        })
      })
      .catch( error => {
        console.log(error);
      })
    } else if ( e.title === "提交问答.." ) {
      axios.post(global.constants.website+'/api/task/mytaskanswerlist',{
        status: 1,
      },{
        headers: {AppAuthorization: localStorage.getItem("token")}    //post 方法传 token
      })
      .then( res => {
        // console.log(res.data.data);
        this.setState({
          stateb: res.data.data.task_list,
        })
      })
      .catch( error => {
        console.log(error);
      })
    } else if ( e.title === "待返佣金" ) {
      axios.post(global.constants.website+'/api/task/mytaskanswerlist',{
        status: 4,
      },{
        headers: {AppAuthorization: localStorage.getItem("token")}    //post 方法传 token
      })
      .then( res => {
        this.setState({
          statec: res.data.data.task_list,
        })
      })
      .catch( error => {
        console.log(error);
      })
    } else {
      axios.post(global.constants.website+'/api/task/mytaskanswerlist',{
        status: 5,
      },{
        headers: {AppAuthorization: localStorage.getItem("token")}    //post 方法传 token
      })
      .then( res => {
        // console.log(res.data.data);
      })
      .catch( error => {
        console.log(error);
      })
    }
  }

  render() {
    const { task_lists,datasShow,statea,stateb,statec } = this.state;
    return(
      <div>
        <header className="tabTitle">
          <div className="return"><Link to="/myTask"><Icon type="left" theme="outlined" />返回</Link></div>
          未完成任务
        </header>
        <WhiteSpace style={{ paddingTop: '3rem' }} />
        <Tabs tabs={tabs} initialPage={3} animated={false} useOnPan={false} onTabClick={this.onChange}>
          {/* 待操作 */}
          <div style={{ padding: '0.3rem 0.3rem', backgroundColor: '#fff' }}>
            {/* 循环 all-task div */}
            {
              statea ?
                statea.map((item, index) => {
                  return(
                    <div key={index} className="all-task">
                      <div className="left-img">
                        <img src={item.goodspic} alt=""/>
                      </div>
                      <div className="right">
                        {/* top */}
                        <div className="right-top">
                          <span style={{ display: 'flex' }}>
                            <img style={{ paddingRight: '5px' }} src={item.taskitem_pic} alt="平台图标"/>
                            {item.user_taobao}
                          </span>
                          <span>
                            {item.addtime}
                          </span>
                        </div>
                        {/* center */}
                        <div className="right-center">
                          <p>￥{item.commission}</p>
                        </div>
                      </div>
                    </div>
                  )
                })
              :
              <div className="taskLists">还没有任务噢,快去任务大厅看看吧^-^</div>
            }
          </div>
          {/* 待返款 */}
          <div style={{ padding: '0.3rem 0.3rem', backgroundColor: '#fff' }}>
            {
              stateb ?
                stateb.map((item, index) => {
                  return(
                    <div key={index} className="all-task">
                      <div className="left-img">
                        <img src={item.goodspic} alt=""/>
                      </div>
                      <div className="right">
                        {/* top */}
                        <div className="right-top">
                          <span style={{ display: 'flex' }}>
                            <img style={{ paddingRight: '5px' }} src={item.taskitem_pic} alt="平台图标"/>
                            {item.user_taobao}
                          </span>
                          <span>
                            {item.addtime}
                          </span>
                        </div>
                        {/* center */}
                        <div className="right-center">
                          <p>￥{item.commission}</p>
                          <Button type="primary"><Link to={{ pathname: '/questionsTasks', state: item.order_id }}>{item.order_status_texts}</Link></Button>
                        </div>
                      </div>
                    </div>
                  )
                })
              :
              <div className="taskLists">还没有任务噢,快去任务大厅看看吧^-^</div>
            }
          </div>
          {/* 待评价 */}
          <div style={{ padding: '0.3rem 0.3rem', backgroundColor: '#fff' }}>
            {
              statec ?
                statec.map((item, index) => {
                  return(
                    <div key={index} className="all-task">
                      <div className="left-img">
                        <img src={item.goodspic} alt=""/>
                      </div>
                      <div className="right">
                        {/* top */}
                        <div className="right-top">
                          <span style={{ display: 'flex' }}>
                            <img style={{ paddingRight: '5px' }} src={item.taskitem_pic} alt="平台图标"/>
                            {item.user_taobao}
                          </span>
                          <span>
                            {item.addtime}
                          </span>
                        </div>
                        {/* center */}
                        <div>
                          <div className="right-center">
                            <p>￥{item.commission}</p>
                            {
                              item.order_status === 1 ?
                                <Button type="primary"><Link to={{ pathname: '/questionsTasks', state: item.order_id }}>{item.order_status_texts}</Link></Button>
                              :
                              ""
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })
              :
              <div className="taskLists">还没有任务噢,快去任务大厅看看吧^-^</div>
            }
          </div>
          {/* 所有 */}
          <div style={{ padding: '0.3rem 0.3rem', backgroundColor: '#fff' }}>
            {/* 循环 all-task div */}
            {
              datasShow ?
                task_lists.length ?
                  task_lists.map((item, index) => {
                    return(
                      <div className="all-task" key={index}>
                        <div className="left-img">
                          <img src={ item.goodspic } alt=""/>
                        </div>
                        <div className="right">
                          {/* top */}
                          <div className="right-top">
                            <span style={{ display: 'flex' }}>
                              <img style={{ paddingRight: '5px' }} src={item.taskitem_pic} alt="平台图标"/>
                              {item.user_taobao}
                            </span>
                            <span>
                              {item.addtime}
                            </span>
                          </div>
                          {/* center */}
                          {/* 显示所有，并且判断任务是否过期 */}
                          <div className="right-center">
                            <p>￥{item.commission}</p>
                            {
                              item.order_status === 1 ?
                                <Button type="primary"><Link to={{ pathname: '/questionsTasks', state: item.order_id }}>{item.order_status_texts}</Link></Button>
                              :
                              ""
                            }
                          </div>
                        </div>
                      </div>
                    )
                  })
                :
                <div className="taskLists">还没有任务噢,快去任务大厅看看吧^-^</div>
              :
              <div className="loading">
                <img src={require("../../../img/loading.gif")} alt="loading"/>
                <p>任务加载中...</p>
              </div>
            }
          </div>
        </Tabs>
        <WhiteSpace />
      </div>
    )
  }
}

export default WenDaTaskNo
