import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon, Cascader, Input, Button, message } from 'antd';
import axios from 'axios';
import ImagePicker from 'antd-mobile/lib/image-picker';

import './appealTask.css';

const { TextArea } = Input;
const options = [];
// {
//     value: 1,
//     label: '商品错误',
//   },{
//     value: 2,
//     label: '返款问题',
//   },{
//     value: 3,
//     label: '快递问题',
//   },{
//     value: 4,
//     label: '其他',
//     }
const data = [];

class AppealTask extends Component {
  constructor(props) {
    super();
    this.state = {
      files: data,        //图片数据
      tousu: null,        //投诉类型
      contentInput: null,  //投诉说明
    }
    // console.log(props);
  }

  componentWillMount() {
    axios.post('/api/task/appealTask',{
      order_id: localStorage.getItem("order_id"),   //获取存储到本地的order_id
    },{
      headers: {AppAuthorization: localStorage.getItem("token")}    //post 方法传 token
    })
    .then( res =>{
      let issueType = res.data.data;
      this.setState({
          optionss: options
      })
      // console.log(issueType);
    })
    .catch( error => {
      console.log(error);
    })
  }

  // 选择投诉类型
  onChange = (value) => {
    console.log(value);
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
    let _this = this.state;
    if ( _this.files.length < 2 || _this.tousu == null || _this.contentInput == null ) {
      message.error('请完善必要部分');
      console.log(_this.tousu);
      console.log(_this.contentInput);
      console.log(_this.files);
    }else {
      //此处执行ajax请求
      let datas = {
        tousu: _this.tousu,
        contentInput: _this.contentInput,
        files: _this.files
      }
      message.success('提交成功');
      console.log(datas);
    }

  }

  render() {
    const { files } = this.state;
    return(
      <div>
        <header className="tabTitle">
          <div className="return"><Link to="/myTaskDetails"><Icon type="left" theme="outlined" />返回</Link></div>
          发起申诉
        </header>
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
            onChange={this.uploadImg}
            onImageClick={(index, fs) => console.log(index, fs)}
            selectable={files.length < 2}
            accept="image/gif,image/jpeg,image/jpg,image/png"
          />
        </div>
        <Button type="primary" className="login-form-button" onClick={this.uploadShouHuo}>
          确认评价
        </Button>
      </div>
    )
  }
}

export default AppealTask
