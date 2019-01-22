import React, { Component } from 'react';
import { Icon, Button, message } from 'antd';
import axios from 'axios';
import ImagePicker from 'antd-mobile/lib/image-picker';
import { Link } from 'react-router-dom';
import ActivityIndicator from 'antd-mobile/lib/activity-indicator';
import WingBlank from 'antd-mobile/lib/wing-blank';

import './goodPingjia.css';
import '../../../../component/apis';

const data = [];

//消息提示距离顶部的位置
message.config({
  top: 300,
});

class GoodPingJia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animating: false,
      files: data,
    }
    // console.log(props);
  }

  componentWillMount() {
    axios.post(global.constants.website+'/api/task/receivetask', {
      order_id: this.props.location.state,
    },{
      headers: {AppAuthorization: localStorage.getItem("token")}    //post 方法传 token
    })
    .then( res=> {
      let datas = res.data.data;
      // console.log(datas);
      this.setState({
        order_id: datas.order_id,               //order_id
        platformname: datas.platformname,       //平台类型描述
        keywords_pic: datas.keywords_pic,       //文字要求图片
        pic_content: datas.pic_content,         //图片要求图片
      })
    })
    .catch(error => {
      console.log(error);
    })
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
    let photos = this.state.files;        //图片集合
    let this_ = this;
    let order_id = this.state.order_id;
    if ( photos.length === 2 ) {
      this_.setState({ animating: true })            //数据提交中显示的login.....
      let imgs = [photos[0].url, photos[1].url];    //转换图片的格式
      axios.post(global.constants.website+'/api/task/receivetaskcommit',{
        order_id: order_id,                         //订单ID
        receive_evaluate_content: imgs,             //传的图片集合
      },{
        headers: {AppAuthorization: localStorage.getItem("token")}    //post 方法传 token
      })
      .then( res => {
        // console.log(res.data.status);
        if ( res.data.status ) {
          this_.setState({ animating: false })          //数据提交成功关闭login.....
          this_.props.history.push("/myTaskDetails");
          message.success(res.data.msg);
        } else {
          this_.setState({ animating: false })          //数据提交成功关闭login.....
          message.error(res.data.msg)
        }
      })
      .catch( error => {
        console.log(error);
      })
    }else {
      //此处执行ajax请求
      message.error('请上传还未上传的图片');
    }

  }

  render() {
    const { files,platformname,animating } = this.state;
    return(
      <div>
        <header className="tabTitle">
          <div className="return"><Link to="/myTaskDetails"><Icon type="left" theme="outlined" />返回</Link></div>
          确认收货并好评
        </header>
        <div>
          <WingBlank>
            <div className="goodPingJia-box">
              <h2> 注意：务必等待物流签收后再评价，否则拉入黑名单!</h2>
              <p>第一步 去{platformname}评价并截图</p>
              <div className="goodPingJia-box-child">
                <p>文字要求(在{platformname}评价里必须按以下文字要求评价)</p>
                <p style={{ backgroundColor: '#fff',textAlign: 'center' }}>自行发挥相关评价十五字以上</p>
                <p>图片要求(在{platformname}评价里必须上传以下图片)</p>
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
            <div className="toast-example">
              <ActivityIndicator
                toast
                text="数据提交中..."
                animating={animating}
              />
            </div>
          </WingBlank>
        </div>
      </div>
    )
  }
}

export default GoodPingJia
