import React, { Component } from 'react';
import { Icon } from 'antd';
import { Link  } from 'react-router-dom';

class TongZhiChild extends Component {
  render() {
    return(
      <div>
        <header className="tabTitle">
          <div className="return"><Link to="/tongZhi"><Icon type="left" theme="outlined" />返回</Link></div>
          公告详情
        </header>
        <div className="tongZhiChild">
          <h3>23反垃圾垃圾客流集散点附近</h3>
          <p>这是图片放大预览示例，点击如下图片体验全屏预览功能</p>
          <img src={ require("../../../../img/headerImg.png") } alt="tu" />
          <p>图片全屏后，双击或双指缩放均可对图片进行放大、缩小操作，左右滑动可查看同组(data-preview-group相同的图片为一组)其它图片，点击会关闭预览</p>
        </div>
      </div>
    )
  }
}

export default TongZhiChild
