import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';

import './questionsTask.css';

class QuestionsTask extends Component {
  render() {
    return(
      <div>
        <header className="tabTitle">
          <div className="return"><Link to="/taskHallPage"><Icon type="left" theme="outlined" />返回</Link></div>
          问答任务
        </header>
        <div className="questionsTask-box">
          <h2>注意：此类任务需要商家审核，如商家审核未通过做了该任务没有佣金</h2>
          <div className="product-details">
            <img src={require("../../../img/custom-qq_03.png")} alt="产品主图"/>
            <p>飞鹤奶粉宝宝奶粉 君乐宝 乐铂 400g 三段</p>
          </div>
          <p className="lookShili">查看示例图</p>
        </div>
      </div>
    )
  }
}

export default QuestionsTask
