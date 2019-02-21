import React, { Component } from 'react';
import { Icon, Button } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../../component/apis';

class DfTaskNo extends Component {
  constructor() {
    super()
    this.state ={
      datasState: false,      //进入任务大厅调用ajax 请求延时状态
    }
  }

  componentWillMount() {
    axios.post(global.constants.website+'/api/task/mytasklist',{
      status: 10,             //已撤销
    },{
      headers: {AppAuthorization: localStorage.getItem("token")}    //post 方法传 token
    })
    .then( res => {
      // console.log(res.data.data.task_list);
      this.setState({
        task_lists: res.data.data.task_list,
        datasState: true,                       //状态改为true
      })
    })
    .catch( err => {
      console.log(err);
    })
  }

  render() {
    const { task_lists,datasState } = this.state;
    return(
      <div>
        <header className="tabTitle">
          <div className="return"><Link to="/myTask"><Icon type="left" theme="outlined" />返回</Link></div>
          已撤回任务
        </header>
        <div style={{ padding: '0.3rem 0.3rem', backgroundColor: '#fff', paddingTop: '3rem' }}>
          {/* 循环 all-task div */}
          {
            datasState ?
              task_lists ?
                task_lists.map((item, index) => {
                  return(
                    <div key={index} className="all-task">
                      <div className="left-img">
                        <img src={item.goodspic} alt=""/>
                      </div>
                      <div className="right">
                        {/* top */}
                        <div className="right-top">
                          <span style={{ display: 'flex', alignItems: 'center' }}>
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
                            <Button type="primary">{item.order_status_text}</Button>
                          </div>
                          <div className="right-bottom">
                            <p className="paddingBottom">
                              <span>垫资{item.need_principal}元</span>
                              <span>{item.refundtext}</span>
                            </p>
                            {/* <p className="taskss">请在{item.limittime}前操作</p> */}
                          </div>
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
            // Toast.loading('任务加载中...')
          }
        </div>
      </div>
    )
  }
}

export default DfTaskNo
