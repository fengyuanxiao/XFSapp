import React, { Component } from 'react';
import { Icon, Button, message } from 'antd';
import axios from 'axios';
import ImagePicker from 'antd-mobile/lib/image-picker';
import { Link } from 'react-router-dom';
import ActivityIndicator from 'antd-mobile/lib/activity-indicator';
import WingBlank from 'antd-mobile/lib/wing-blank';

import './goodPingjia.css';

const data = [];

//消息提示距离顶部的位置
message.config({
  top: 300,
});

class AddPingJia extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animating: false,
      files: data,
    }
    // console.log(props);
  }

  componentWillMount() {
    axios.post('/api/task/additionalTask', {
      order_id: localStorage.getItem("order_id"),   //获取存储到本地的order_id
    },{
      headers: {AppAuthorization: localStorage.getItem("token")}    //post 方法传 token
    })
    .then( res=> {
      let datas = res.data.data;
      // console.log(datas);
      this.setState({
        order_id: datas.order_id,                   //order_id
        template_pic: datas.template_pic,           //追评文字图片
        additional_pic: datas.additional_pic,       //追评图片
      })
    })
    .catch(error => {
      console.log(error);
    })
  }

  // 上传聊天截图 支付宝账单截图
  onChange = (files, type, index) => {
    // console.log(files);
    this.setState({
      files,
    });
  }
  // 提交按钮 ajax
  uploadShouHuo = () => {
    let photos = this.state.files;        //图片集合
    let this_ = this;
    if ( photos.length === 1 ) {
      this_.setState({ animating: true })            //数据提交中显示的login.....
      let imgs = [photos[0].url];    //转换图片的格式
      axios.post('/api/task/additioncommit',{
        order_id: localStorage.getItem("order_id"),   //获取存储到本地的order_id,           //订单ID
        addition_pic: imgs,             //传的图片集合
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
    const { additional_pic,template_pic,files,animating } = this.state;
    return(
      <div>
        <header className="tabTitle">
          <div className="return"><Link to="/myTaskDetails"><Icon type="left" theme="outlined" />返回</Link></div>
          确认追加评价
        </header>
        <div>
          <WingBlank>
            <div className="goodPingJia-box">
              <h2>  注意：务必按照商家要求追加评论!</h2>
              <p>商家要求的追评内容</p>
              <div className="goodPingJia-box-child">
                <p>追评文字图片</p>
                <p>
                  {
                    template_pic ?
                      template_pic.map((item, index) => {
                        return(
                          <img key={index} style={{ maxWidth: '100%' }} src={item} alt="文字图片"/>
                        )
                      })
                    :
                    ""
                  }
                </p>
                <p>追评图片</p>
                <p>
                  {
                    additional_pic ?
                      additional_pic.map((item, index) => {
                        return(
                          <img key={index} style={{ maxWidth: '100%' }} src={item} alt="文字图片"/>
                        )
                      })
                    :
                    ""
                  }
                </p>
              </div>
              <p>第二步 上传评价及物流截图</p>
              <ImagePicker
                length={1}
                files={files}
                onChange={this.onChange}
                onImageClick={(index, fs) => console.log(index, fs)}
                selectable={files.length < 1}
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

export default AddPingJia
