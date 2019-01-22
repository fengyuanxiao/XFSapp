import React, { Component } from 'react';
import { Icon } from 'antd';
import { Link  } from 'react-router-dom';
import axios from 'axios';    //ajax

import './tongZhi.css';
import '../../../component/apis';

class TongZhi extends Component {
  constructor(){
    super();
    this.state = {
      shows: false,
    }
  }

  componentWillMount() {
    axios.get(global.constants.website+'/api/help/noticeList', {
      headers: {AppAuthorization: localStorage.getItem("token")}
    })
    .then( res => {
      // console.log(res.data.data);
      if ( res.data.data ) {
        this.setState({
          shows: true,
          tongZhiList: res.data.data,
        })
      }
    })
    .catch(error => {
      console.log(error);
    });
  }

  linkTo = (item) => {
    // console.log(item);
    this.props.history.push({pathname: "/tongZhiChild", state: {data: item}});
  }

  render() {
    const { shows, tongZhiList } = this.state;
    return(
      <div>
        <header className="tabTitle">
          <div className="return"><Link to="/myCenter"><Icon type="left" theme="outlined" />返回</Link></div>
          公告列表
        </header>
        {
          shows ?
            <ul className="tongZhi-box">
              {
                tongZhiList.length ?
                  tongZhiList.map((item, index) => {
                    return(
                      <li key={item.notice_id}>
                        <div onClick={ ()=>this.linkTo(item.notice_id) }>
                          <span>{item.title}</span>
                          <span>{item.dt_add}</span>
                        </div>
                      </li>
                    )
                  })
                :
                <div>没有公告！</div>
              }
            </ul>
          :
          <div className="loadings">
            <img src={require("../../../img/loading.gif")} alt="loading"/>
            <p>数据加载中...</p>
          </div>
        }

      </div>
    )
  }
}

export default TongZhi
