import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon, Cascader, Input, Button, message } from 'antd';
import axios from 'axios';
import ImagePicker from 'antd-mobile/lib/image-picker';
import ActivityIndicator from 'antd-mobile/lib/activity-indicator';
import WingBlank from 'antd-mobile/lib/wing-blank';

import './appealTask.css';
import '../../../../component/apis';

const { TextArea } = Input;
const options = [{
    value: 1,
    label: '商品错误',
  },{
    value: 2,
    label: '返款问题',
  },{
    value: 3,
    label: '快递问题',
  },{
    value: 4,
    label: '其他',
    }];
const data = [];

class AppealTask extends Component {
  constructor(props) {
    super();
    this.state = {
      animating: false,
      files: data,        //图片数据
      tousu: null,        //投诉类型
      contentInput: null,  //投诉说明
    }
    // console.log(props);
  }

  UNSAFE_componentWillMount() {
    let this_ = this;
    axios.post(global.constants.website+'/api/task/appealTask',{
      order_id: localStorage.getItem("order_id"),   //获取存储到本地的order_id
    },{
      headers: {AppAuthorization: localStorage.getItem("token")}    //post 方法传 token
    })
    .then( res =>{
      let issueType = res.data.data;
      if ( res.data.status === "_0001" ) {
          message.success(res.data.msg, successSkip => {
          localStorage.removeItem("token");
          this_.props.history.push("/");
          window.location.reload();
        })
      } else {
      this.setState({
        order_id: issueType.order_id
      })
    }
      // console.log(issueType);
    })
    .catch( error => {
      console.log(error);
    })
  }

  // 选择投诉类型
  onChange = (value) => {
    // console.log(value);
    this.setState({
      tousu: value
    })
  }

  // 图片上传证据
  uploadImg = (files, type, index) => {
    // console.log(files);
    this.setState({
      files,
    });
  }
  // 投诉说明
  contentInput = (e) => {
    this.setState({
      contentInput: e.target.value
    })
    // console.log(e.target.value);
  }

  // 提交按钮 ajax
  uploadShouHuo = () => {
    let this_ = this;
    let _this = this.state;
    let photos = this.state.files;        //图片集合
    // 图片集合存入imgs 传给后端
      let imgs = [];
      if ( photos ) {                   //num为true 说明买手有新图片上传 并走新图去循环去base图路径
        for (var i = 0; i < photos.length; i++) {
          imgs.push(photos[i].url)
        }
      }
    if ( _this.tousu == null || _this.contentInput == null || photos.length > 2 ) {
      if ( photos.length > 2 ) {
        message.error('只能上传2张必要图片');
      } else {
        message.error('请完善必要部分');
      }
    }else {
      this_.setState({ animating: true })            //数据提交中显示的login.....
      // let imgs = [photos[0].url, photos[1].url];    //转换图片的格式
      let numType = _this.tousu[0];
      //此处执行ajax请求
      axios.post(global.constants.website+'/api/task/appealTaskCommit',{
        order_id: _this.order_id,
        complain_type: numType,
        complain_desc: _this.contentInput,
        images: imgs,
      },{
        headers: {AppAuthorization: localStorage.getItem("token")}    //post 方法传 token
      })
      .then( res => {
        // console.log(res);
        if ( res.data.status ) {
          this_.setState({ animating: false })          //数据提交成功关闭login.....
          message.success(res.data.msg);
          this_.props.history.push("/myTask");
        } else {
          this_.setState({ animating: false })          //数据提交成功关闭login.....
          message.success(res.data.msg);
        }
      })
      .catch( error => {
        console.log(error);
      })
    }

  }

  render() {
    const { files,animating } = this.state;
    return(
      <div>
        <header className="tabTitle">
          <div className="return"><Link to="/myTaskDetails"><Icon type="left" theme="outlined" />返回</Link></div>
          发起申诉
        </header>
        <div>
          <WingBlank>
            <div className="shensu-box">
              <p className="_p" style={{ marginBottom: '0' }}>发起申诉</p>
            </div>
            <div className="shensu-box-child">
              <p className="_p" style={{ marginBottom: '1rem' }}>选择投诉类型</p>
              <Cascader style={{ width:'100%' }} options={options} onChange={this.onChange} placeholder="请选择类型" />
              <p className="_p __p">填写投诉说明</p>
              <TextArea style={{ width:'100%' }} rows={4} onChange={ this.contentInput } placeholder="请输入投诉说明" />
              <p className="_p">上传图片证据</p>
              <ImagePicker
                length={2}
                files={files}
                multiple={false}
                onChange={this.uploadImg}
                onImageClick={(index, fs) => console.log(index, fs)}
                selectable={files.length < 2}
              />
            </div>
            <Button type="primary" className="login-form-button" onClick={this.uploadShouHuo}>
              确认申诉
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

export default AppealTask
