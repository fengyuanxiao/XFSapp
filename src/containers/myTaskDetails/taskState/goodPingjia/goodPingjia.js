import React, { Component } from 'react';
import { Icon, Button, message } from 'antd';
// import { ImagePicker } from 'antd-mobile';
import ImagePicker from 'antd-mobile/lib/image-picker';
import { Link } from 'react-router-dom';

import './goodPingjia.css';

const data = [];

//消息提示距离顶部的位置
message.config({
  top: 300,
});

class GoodPingJia extends Component {
  constructor() {
    super();
    this.state = {
      files: data,
    }
    this.uploadShouHuo = this.uploadShouHuo.bind(this);
  }

  // 上传聊天截图 支付宝账单截图
  onChange = (files, type, index) => {
    console.log(files);
    this.setState({
      files,
    });
  }
  // 提交按钮 ajax
  uploadShouHuo = () => {
    let _this = this.state.files;
    if ( _this.length < 2 ) {
      message.error('请上传还未上传的图片');
    }else {
      //此处执行ajax请求
      message.success('提交成功');
      console.log(_this);
    }

  }

  render() {
    const { files } = this.state;

    return(
      <div>
        <header className="tabTitle">
          <div className="return"><Link to="/myTaskDetails"><Icon type="left" theme="outlined" />返回</Link></div>
          确认收货并好评
        </header>
        <div className="goodPingJia-box">
          <h2> 注意：务必等待物流签收后再评价，否则拉入黑名单!</h2>
          <p>第一步 去淘宝评价并截图</p>
          <div className="goodPingJia-box-child">
            <p>文字要求(在淘宝评价里必须按以下文字要求评价)</p>
            <p style={{ backgroundColor: '#fff',textAlign: 'center' }}>自行发挥相关评价十五字以上</p>
            <p>图片要求(在淘宝评价里必须上传以下图片)</p>
            <p style={{ backgroundColor: '#fff' }}>无需图片</p>
          </div>
          <p>第二步 上传评价及物流截图</p>
          <ImagePicker
            length={2}
            files={files}
            onChange={this.onChange}
            onImageClick={(index, fs) => console.log(index, fs)}
            selectable={files.length < 2}
            accept="image/gif,image/jpeg,image/jpg,image/png"
          />
          <p>注：请上传<span style={{ fontWeight:'bold',fontSize:'1rem',color:'red' }}>物流图</span>和<span style={{ fontWeight:'bold',fontSize:'1rem',color:'red' }}>好评图</span></p>
        </div>
        <Button type="primary" className="login-form-button" onClick={this.uploadShouHuo}>
          确认评价
        </Button>
      </div>
    )
  }
}

export default GoodPingJia
