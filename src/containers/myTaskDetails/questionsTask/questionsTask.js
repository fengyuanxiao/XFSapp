import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon, Modal, Radio, Button, Input, message } from 'antd';
import axios from 'axios';
import ImagePicker from 'antd-mobile/lib/image-picker';
import ActivityIndicator from 'antd-mobile/lib/activity-indicator';
import WingBlank from 'antd-mobile/lib/wing-blank';

import './questionsTask.css';
import '../../../component/apis';

const RadioGroup = Radio.Group;
const data = [];

class QuestionsTask extends Component {
  constructor(props) {
    super(props);
    this.state= {
      animating: false,
      visible: false,           //示例图显示状态
      value: null,                 //单选框 刷手选择的问题
      inputValue: null,         //手动输入收到的问答
      files: data,              //上传图片数据
    }
    // console.log(props.location.state.data);
  }

  UNSAFE_componentWillMount() {
    let this_ = this;
    if ( this.props.location.state === undefined ) {
      message.warning('任务待商家审核中！');
      this_.props.history.push("/taskHallPage")
    } else {
      axios.post(global.constants.website+'/api/task/asktaskOne',
      {
        task_id: this_.props.location.state.data,
      },
      {
        headers: {AppAuthorization: localStorage.getItem("token")}    //post 方法传 token
      })
      .then(function (response) {
        let data_ = response.data.data;
        if ( response.data.status === "_0001" ) {
            message.success(response.data.msg, successSkip => {
            localStorage.removeItem("token");
            this_.props.history.push("/");
            window.location.reload();
          })
        } else {
        this_.setState({
          id: data_.id,                       //任务ID
          goodsname: data_.goodsname,         //商品名称
          goodspic: data_.goodspic,           //商品图片
          questype: data_.questype,           //问题类型
          quescontent: data_.quescontent,     //问题内容
        })
      }
        // console.log(data_);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }

  // 点击查看示例图按钮  显示
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  // 点击知道了按钮隐藏示例图
  handleOk = (e) => {
    this.setState({
      visible: false,
    });
  }
  // 点击关闭按钮隐藏示例图
  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }

  // 问答任务单选框
  onChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  }

  // 上传我的淘宝 支付宝示例图回调
  onUploadOne = (files, type, index) => {
    // console.log(files, type, index);
    this.setState({
      files,
    });
  }

  //手动输入收到的问答
  onInputValue = (e) => {
    this.setState({
      inputValue: e.target.value
    })
  }

  // 提交商家审核按钮
  submitBtn = () => {
    let _this = this.state;
    let this_ = this;
    if ( _this.questype === 1 ) {
      if ( _this.value === null || _this.files.length !== 1 ) {
        if ( _this.files.length !== 1 ) {
          message.error("只能上传1张必要图片")
        } else {
          message.error("请完善必要信息")
        }
      } else {
        this_.setState({ animating: true })            //数据提交中显示的login.....
        let infoPhoto = _this.files[0].url;
        axios.post(global.constants.website+'/api/task/addOrder',{
          task_id: _this.id,                       //任务ID
          check_question: _this.value,                 //买手在商家问题列表中选择自己收到的问题
          question_pic_content: infoPhoto,             //买手上传收到的问题截图
        },{
          headers: {AppAuthorization: localStorage.getItem("token")}    //post 方法传 token
        })
        .then( res => {
          // console.log(res.data);
          if ( res.data.status ) {
            this_.setState({ animating: false })          //数据提交成功关闭login.....
            this_.props.history.push("/wenDaTaskNo");
            message.success(res.data.msg);
          } else {
            this_.setState({ animating: false })          //数据提交成功关闭login.....
            message.success(res.data.msg);
          }
        })
        .catch( err => {
          console.log(err);
        })
      }
    } else {
      if ( _this.inputValue === null || _this.files.length < 1 ) {
        message.error("请完善必要信息")
      } else {
        this_.setState({ animating: true })            //数据提交中显示的login.....
        let infoPhoto = _this.files[0].url;
        axios.post(global.constants.website+'/api/task/addOrder',{
          task_id: _this.id,                           //任务ID
          question_content: _this.inputValue,          //买手自己提交的问题
          question_pic_content: infoPhoto,             //买手上传收到的问题截图
        },{
          headers: {AppAuthorization: localStorage.getItem("token")}    //post 方法传 token
        })
        .then( res => {
          if ( res.data.status ) {
            this_.setState({ animating: false })          //数据提交成功关闭login.....
            this_.props.history.push("/wenDaTaskNo");
            message.success(res.data.msg);
          } else {
            this_.setState({ animating: false })          //数据提交成功关闭login.....
            message.success(res.data.msg);
          }
        })
        .catch( err => {
          console.log(err);
        })
      }
    }

  }


  render() {
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };
    const { goodsname,goodspic,quescontent,questype,files,animating } = this.state;
    return(
      <div>
        <header className="tabTitle">
          <div className="return"><Link to="/taskHallPage"><Icon type="left" theme="outlined" />返回</Link></div>
          问答任务
        </header>
        <div>
          <WingBlank style={{ margin: '0' }}>
            <div className="questionsTask-box">
              <h2>注意：此类任务需要商家审核，如商家审核未通过做了该任务没有佣金</h2>
              <div className="product-details">
                <div style={{ width: '30%' }}>
                  <img style={{ maxWidth: '100%',paddingRight: '0.5rem' }} src={goodspic} alt="产品主图"/>
                </div>
                <p style={{ width: '70%' }}>{goodsname}</p>
              </div>
              <p className="lookShili" onClick={ this.showModal }>查看示例图>></p>
              <div className="taskList">
                {
                  questype === 1 ?
                    <div>
                      <p className="centerTitle">商家需要回答的问题列表：(请选择互动消息中收到的问答)</p>
                      <p style={{ textAlign: 'center', color: 'red' }}>注：如有问题文字过长请左右拖动查看</p>
                      <RadioGroup onChange={this.onChange} value={this.state.value} style={{ width: '100%', wordBreak: 'keep-all', overflow: 'auto' }}>
                        {
                          quescontent.map((item, index) => {
                            return(
                              <Radio key={index} style={radioStyle} value={item}>{item}</Radio>
                            )})
                        }
                      </RadioGroup>
                    </div>
                  :
                  <div>
                    <p className="centerTitle">淘宝互动消息中收到对应商品的问答：</p>
                    <Input onChange={ this.onInputValue } id="input" placeholder="请手动输入收到的问答" />
                  </div>
                }
              </div>
              <p className="fontTu">请在淘宝互动消息中查找收到的该商品的问答并截图上传!</p>
              <ImagePicker
                length={1}
                files={files}
                multiple={false}
                onChange={this.onUploadOne}
                onImageClick={(index, fs) => console.log(index, fs)}
                selectable={files.length < 1}
              />
            </div>
            <Button onClick={ this.submitBtn } className="btn-buy" type="primary">点击提交商家审核</Button>
            <div className="toast-example">
              <ActivityIndicator
                toast
                text="数据提交中..."
                animating={animating}
              />
            </div>
          </WingBlank>
        </div>


        <Modal
          title="示例图"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText={"知道了"}
          cancelText={"关闭"}
        >
          <img className="shilitu" src={require("../../../img/wenda.png")} alt="问答任务示例图" />
        </Modal>
      </div>
    )
  }
}
export default QuestionsTask
