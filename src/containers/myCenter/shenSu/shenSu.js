import React,{ Component } from 'react';
import { Icon,   } from 'antd';
import Tabs from 'antd-mobile/lib/tabs';
import axios from 'axios';
import WhiteSpace from 'antd-mobile/lib/white-space';
import { Link  } from 'react-router-dom';

import './shensu.css';

const tabs = [
  { title: '我发起的申诉' },
  { title: '我收到的申诉' },
];

class ShenSu extends Component {
  constructor() {
    super();
    this.state = {
      datasState: false,
    }
  }

  componentWillMount() {
    axios.post('/api/help/complainList', {
      typeid: 1
    },{
      headers: {AppAuthorization: localStorage.getItem("token")}        //post 方法传 token
    })
    .then( res => {
      // console.log(res.data.data);
      this.setState({
        datasState: true,
        shenSuList: res.data.data,
      })
    })
    .catch(function(error) {
      console.log(error);
    });
  }

  onTabClick = (e) => {
    // console.log(e.title);
    axios.post('/api/help/complainList', {
      typeid: e.title === "我收到的申诉" ? 2 : 1
    },{
      headers: {AppAuthorization: localStorage.getItem("token")}        //post 方法传 token
    })
    .then( res => {
      // console.log(res.data.data);
      this.setState({
        datasState: true,
        shenSuList: res.data.data,
      })
    })
    .catch(function(error) {
      console.log(error);
    });
  }

  render() {
    const { datasState, shenSuList } = this.state;
    return(
      <div>
        <header className="tabTitle">
          <div className="return"><Link to="/myCenter"><Icon type="left" theme="outlined" />返回</Link></div>
          申诉列表
        </header>
        <WhiteSpace style={{ paddingTop: '3rem' }} />
        <Tabs onTabClick={ this.onTabClick } tabs={tabs} initialPage={0} animated={false} useOnPan={false}>
          {/* 我发起的申诉 */}
          {
            datasState ?
              shenSuList.length ?
                shenSuList.map((item, index) => {
                  return(
                    <div key={item.order_id} className="bodyBox">
                      <div className="childOne">
                        <div>
                          <span>{item.complain_desc}</span>
                          {/* <span>{item.undo_time}</span> */}
                        </div>
                        {/* <div>{item.order_status_text}</div> */}
                      </div>
                      <div className="childTwo">{item.status}</div>
                    </div>
                  )
                })
              :
              <div>没有申诉内容！</div>
            :
            <div className="loading">
              <img src={require("../../../img/loading.gif")} alt="loading"/>
              <p>任务加载中...</p>
            </div>
          }

          {/* 我收到的申诉 */}
          {
            datasState ?
              shenSuList.length ?
                shenSuList.map((item, index) => {
                  return(
                    <div key={item.order_id} className="bodyBox">
                      <div className="childOne">
                        <div className="childOne_a">
                          <span>{item.complain_desc}</span>
                          <span>{item.undo_time}</span>
                        </div>
                        <div className="childOne_as">
                          <span>{item.order_status_text}</span>
                          <span>原因：{item.undo_desc}</span>
                        </div>
                        {/* <div>{item.order_status_text}</div>
                        <div>原因：{item.undo_desc}</div> */}
                      </div>
                      <div className="childTwo">{item.status}</div>
                    </div>
                  )
                })
              :
              <div>没有申诉内容！</div>
            :
            <div className="loading">
              <img src={require("../../../img/loading.gif")} alt="loading"/>
              <p>任务加载中...</p>
            </div>
          }
        </Tabs>
        <WhiteSpace />
      </div>
    )
  }
}

export default ShenSu
