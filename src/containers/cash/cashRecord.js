import React, { Component } from 'react';
import { Icon } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Tabs from 'antd-mobile/lib/tabs';
import Modal from 'antd-mobile/lib/modal';
import WhiteSpace from 'antd-mobile/lib/white-space';

import './cash.css';
import '../../component/apis';

const tabs = [
  { title: '本金记录' },
  { title: '佣金记录' },
];
const alert = Modal.alert;

class cashRecord extends Component {
  constructor() {
    super();
    this.state = {
      datasState: false,      //进入任务大厅调用ajax 请求延时状态
    }
  }

  componentWillMount() {
    axios.post(global.constants.website+'/api/index/applycashlist',{
      type: 1
    },
    {
      headers: {AppAuthorization: localStorage.getItem("token")}
    })
    .then( res => {
      let datas = res.data.data;
      this.setState({
        datasState: true,
        datasLists: datas,                      //本金提现列表
      });
      if ( datas[0].lately_check_content ) {
        this.setState({
          lately_check_content: datas[0].lately_check_content,
        })
        this.jieruBtn()
      }
        // console.log(res.data.data);
    })
    .catch(error => {
      console.log(error);
    });
  }
  componentWillUnmount = () => {
    this.setState = (state,callback)=>{
      return;
    };
  }

  // 申请平台介入按钮
  jieruBtn = () => {
    alert('提现未通过', this.state.lately_check_content, [
      {text: '知道了', onPress: () => {console.log('知道了')}},
    ])
  }

  // Tabs 跳转传递不同类型参数
  onChange =(e) => {
    // console.log(e.title);
    axios.post(global.constants.website+'/api/index/applycashlist',{
      type: e.title === "佣金记录" ? 2 : 1
    },
    {
      headers: {AppAuthorization: localStorage.getItem("token")}
    })
    .then( res => {
      let datas = res.data.data;
      this.setState({
        datasState: true,
        datasLists: datas,                      //本金提现列表
      });
      if ( datas[0].lately_check_content ) {
        this.setState({
          lately_check_content: datas[0].lately_check_content,
        })
        this.jieruBtn()
      }
        // console.log(res.data.data);
    })
    .catch(error => {
      console.log(error);
    });
  }

  render() {
    const { datasLists,datasState } = this.state;
    return(
      <div>
        <header className="tabTitle">
          <div className="return"><Link to="/myCenter"><Icon type="left" theme="outlined" />返回</Link></div>
          提现记录
        </header>
        <WhiteSpace style={{ paddingTop: '3rem' }} />
        <Tabs tabs={tabs} initialPage={0} animated={false} useOnPan={false} onTabClick={this.onChange}>
          {/* 本金提现 */}
          <div>
            <div className="cash_Record">
              <p>实际到账金额</p>
              <p>状态</p>
              <p>时间</p>
            </div>
            {
              datasState ?
                <ul className="caseList">
                  {
                    datasLists.length ?
                      datasLists.map((item, index) => {
                        return(
                          <li key={index} className={item.status === 0 ? "lis" : (item.status === 1 ? "lia" : "lib")}>
                            <p>{item.to_account_money}</p>
                            {
                              item.status === 1?
                                <p>已审核</p>
                              :
                              (item.status === 0?
                                <p>审核中</p>
                              :
                              <p>未通过</p>)
                            }
                            <p>{item.addtime}</p>
                          </li>
                        )
                      })
                    :
                    <li className="null-list">没有提现记录^-^</li>
                  }
                </ul>
              :
              <div className="loading">
                <img src={require("../../img/loading.gif")} alt="loading"/>
                <p>任务加载中...</p>
              </div>
            }
          </div>
          {/* 佣金提现 */}
          <div>
            <div className="cash_Record">
              <p>实际到账金额</p>
              <p>状态</p>
              <p>时间</p>
            </div>
            {
              datasState ?
                <ul className="caseList">
                  {
                    datasLists.length ?
                      datasLists.map((item, index) => {
                        return(
                          <li key={index} className={item.status === 0 ? "lis" : (item.status === 1 ? "lia" : "lib")}>
                            <p>{item.to_account_money}</p>
                            {
                              item.status === 1?
                                <p>已审核</p>
                              :
                              (item.status === 0?
                                <p>审核中</p>
                              :
                              <p>未通过</p>)
                            }
                            <p>{item.addtime}</p>
                          </li>
                        )
                      })
                    :
                    <li className="null-list">没有提现记录^-^</li>
                  }
                </ul>
              :
              <div className="loading">
                <img src={require("../../img/loading.gif")} alt="loading"/>
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

export default cashRecord
