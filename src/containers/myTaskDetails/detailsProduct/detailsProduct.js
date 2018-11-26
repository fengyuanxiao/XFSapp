import React, { Component } from 'react';

class DetailsPouduct extends Component {
  render() {
    return(
      <section className="taskDetail-header">
        <p className="taskDetail-header-top" style={{ marginTop:'2.7rem' }}>
          <span>目标商品</span>
          <span><img className="iphone" src={require('../../../img/icon1.png')} alt="手机端" /></span>
          <span>平台返款</span>
        </p>
        <div className="taskDetail-header-button">
          <img src={require('../../../img/custom-qq_03.png')} alt="商品图" />
          <div>
            <p>商品成交价格：<span className="make-num">100.00元</span></p>
            <p>件数：<span className="make-num">1件</span></p>
          </div>
        </div>
      </section>
    )
  }
}

export default DetailsPouduct
