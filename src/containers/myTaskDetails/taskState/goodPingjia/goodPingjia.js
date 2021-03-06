import React, { Component } from 'react';
import { Icon, Button, message } from 'antd';
import axios from 'axios';
import lrz from 'lrz';
import ImagePicker from 'antd-mobile/lib/image-picker';
import { Link } from 'react-router-dom';
import ActivityIndicator from 'antd-mobile/lib/activity-indicator';
import WingBlank from 'antd-mobile/lib/wing-blank';

import './goodPingjia.css';
import '../../../../component/apis';

const data = [];
const imgdata = [];         //图片数组1
const imgdata1 = [];        //图片数组2

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
      files01: imgdata,       //图片数组1
      files02: imgdata1,      //图片数组2
    }
    // console.log(props);
  }

  UNSAFE_componentWillMount() {
    let this_ = this;
    if ( this.props.location.state === undefined ) {
      message.warning('任务完成好评截图上传！');
      this_.props.history.push("/myTask")
    } else {
      axios.post(global.constants.website+'/api/task/receivetask', {
        order_id: this.props.location.state,
      },{
        headers: {AppAuthorization: localStorage.getItem("token")}    //post 方法传 token
      })
      .then( res=> {
        let datas = res.data.data;
        if ( res.data.status === "_0001" ) {
            message.success(res.data.msg, successSkip => {
            localStorage.removeItem("token");
            this_.props.history.push("/");
            window.location.reload();
          })
        } else {
        // console.log(datas);
        this.setState({
          order_id: datas.order_id,               //order_id
          platformname: datas.platformname,       //平台类型描述
          keywords_pic: datas.keywords_pic,       //文字要求图片
          pic_content: datas.pic_content,         //图片要求图片
          keyword_types: datas.keyword_types,     //判断是否显示文字图片
        })
      }
      })
      .catch(error => {
        console.log(error);
      })
    }
  }

  // 上传聊天截图 支付宝账单截图
  // onChange = (files, type, index) => {
  //   console.log(files);
  //   this.setState({
  //     files,
  //   });
  // }
  // 上传物流截图 好评截图
  onImageChange01 = (files01, type, index) => {
    // console.log(files01, type, index);
    if(type==='add'){
      lrz(files01[0].url, {quality:0.1})
        .then((rst)=>{
            // 处理成功会执行
            // console.log(rst)
            // console.log(rst.base64);
            this.setState({
              tu1: rst.base64
            })
          })
    }else{
        this.setState({imagesrc01:''})
    }
    this.setState({
        files01,
    });
  }
  onImageChange02 = (files02, type, index) => {
    // console.log(files02, type, index);
    if(type==='add'){
      lrz(files02[0].url, {quality:0.1})
        .then((rst)=>{
            // 处理成功会执行
            // console.log(rst)
            // console.log(rst.base64);
            this.setState({
              tu2: rst.base64
            })
          })
    }else{
        this.setState({imagesrc01:''})
    }
    this.setState({
        files02,
    });
  }
  // 提交按钮 ajax
  uploadShouHuo = () => {
    // let photos = this.state.files01;        //图片集合
    let this_ = this;
    let order_id = this.state.order_id;
    let imgs = [this.state.tu1, this.state.tu2];    //保存图片集合
    // console.log(imgs);
    if ( imgs[0] !== undefined && imgs[1] !== undefined ) {
      this_.setState({ animating: true })            //数据提交中显示的login.....
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
    const { files01,files02,platformname,animating,keyword_types,keywords_pic,pic_content } = this.state;
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
                {
                  keyword_types > 1 ?
                    <img style={{ maxWidth: '100%' }} src={keywords_pic[0]} alt="tu"/>
                  :
                  <p style={{ backgroundColor: '#fff',textAlign: 'center' }}>自行发挥相关评价十五字以上</p>
                }
                <p>图片要求(在{platformname}评价里必须上传以下图片)</p>
                {
                  keyword_types > 2 ?
                    pic_content.map((item, index) => {
                      return(
                        <img key={index} style={{ maxWidth: '100%' }} src={item} alt="tu"/>
                      )
                    })
                  :
                  <p style={{ backgroundColor: '#fff' }}>无需图片</p>
                }
              </div>
              <p>第二步 上传评价及物流截图</p>
              {/* <ImagePicker
                length={2}
                files={files}
                onChange={this.onChange}
                onImageClick={(index, fs) => console.log(index, fs)}
                selectable={files.length < 2}
              /> */}
              <ImagePicker
                length={1}
                files={files01}
                onChange={this.onImageChange01}
                onImageClick={(index, fs) => console.log(index, fs)}
                selectable={files01.length < 1}
                multiple={false}
              />
              <ImagePicker
                length={1}
                files={files02}
                onChange={this.onImageChange02}
                onImageClick={(index, fs) => console.log(index, fs)}
                selectable={files02.length < 1}
                multiple={false}
              />
              <p>注：请上传<span style={{ fontWeight:'bold',fontSize:'1rem',color:'red' }}>物流图</span>和<span style={{ fontWeight:'bold',fontSize:'1rem',color:'red' }}>好评图</span></p>

            </div>
            <Button type="primary" className="login-form-button" style={{ margin: '2rem 0 1rem 0' }} onClick={this.uploadShouHuo}>
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
