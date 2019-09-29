import React, { Component } from 'react';
import { Icon, Drawer, Menu, Button,message } from 'antd';
import Modal from 'antd-mobile/lib/modal';
import { Link } from 'react-router-dom';
import axios from 'axios';

import './appealTask.css';
import '../../../../component/apis';

const prompt = Modal.prompt;
const alert = Modal.alert;

class AppealTaskDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,             //申请撤销任务按钮
      huifushensu: false,         //申请回复任务按钮
      itme_key: null,             //用户取消任务选取的 key值
    }
    // console.log(props.location.state.data);
  }

  UNSAFE_componentWillMount() {
    axios.post(global.constants.website+'/api/task/appealTaskDetail',{
      order_id: this.props.location.state.data,   //获取存储到本地的order_id
    },{
      headers: {AppAuthorization: localStorage.getItem("token")}    //post 方法传 token
    })
    .then( res => {
      // console.log(res);
      let datas = res.data.data;
      this.setState({
        goodspic: datas.goodspic,                   //商品图片
        // seller_qq: datas.seller_qq,                 //商家QQ
        order_id: datas.order_id,                   //订单ID
        complain_type: datas.complain_type,         //申诉类型描述
        complain_desc: datas.complain_desc,         //申诉内容描述
        images: datas.images,                       //申诉图片
        start_time: datas.start_time,               //申诉开始时间
        complain_status: datas.complain_status,     //为1 三个按钮读不显示
        is_self: datas.is_self,                     //为1 显示申诉完结按钮
        complain_consult: datas.complain_consult,   //申诉协商记录，为[]时代表没有协商记录，有值表示有协商记录
      })
      // console.log(res.data);
    })
    .catch( error => {
      console.log(error);
    })
  }
  componentWillUnmount = () => {
    this.setState = (state,callback)=>{
      return;
    };
}

  // 申请取消任务按钮
  showDrawer = () => {
    this.setState({
      visible: true
    })
  }
  // 申请取消任务的 取消按钮
  onClose = () => {
    this.setState({
      visible: false,
    });
  };
  // 申请取消任务的 确认按钮
  onConfirm = () => {
    let dataState = this.state;
      // console.log(dataState.itme_key);
    let this_ = this;
    if ( dataState.itme_key === null ) {
      message.error("请选择原因再确认")
    } else {
      axios.post(global.constants.website+'/api/task/backoutTaskApply', {
        order_id: dataState.order_id,           //订单ID
        backout_type: dataState.itme_key,       //撤销类型
        backout_cause: dataState.itme_key === "1" ? "拍错店铺或者商品" : ( dataState.itme_key === "2" ? "用户串号" : (dataState.itme_key === "3" ? "用户已申请退款" : (dataState.itme_key === "5" ? "未拍下或未付款" : (dataState.itme_key === "6" ? "问题任务" : "用户操作不符合要求" )) ))
      },{
        headers: {AppAuthorization: localStorage.getItem("token")}    //post 方法传 token
      })
      .then( res => {
        // console.log(res);
        if ( res.data.status ) {
          this.setState({
            visible: false,
          });
          this_.props.history.push('/myTask');
          message.success(res.data.msg);
        } else {
          message.error(res.data.msg);
        }
      })
      .catch( error => {
        console.log(error);
      })
    }
  }

  // 回复申诉按钮
  plainTextPrompt = () => {
    prompt('申诉回复', '请输入回复的内容', [
      {text: '取消'},
      {text: '提交', onPress: value => {
        axios.post(global.constants.website+'/api/task/replyComplain',{
          order_id: localStorage.getItem("order_id"),   //获取存储到本地的order_id
          consult_desc: value,        //回复内容val
        },{
          headers: {AppAuthorization: localStorage.getItem("token")}    //post 方法传 token
        })
        .then( res => {
          console.log(res.data);
          if ( res.data.status ) {
            message.success(res.data.msg);
          } else {
            message.error(res.data.msg)
          }
        })
        .catch( error => {
          console.log(error);
        })
      }}
    ])
  }

  // 完结申诉按钮
  showConfirm = () => {
    let this_ = this;
    alert('完结申诉', '确定完结申诉？', [
      {text: '取消', onPress: () => {console.log('取消了')}},
      {text: '确定', onPress: () => {
        axios.post(global.constants.website+'/api/task/completeAppeal',{
          order_id: localStorage.getItem("order_id"),   //获取存储到本地的order_id
        },{
          headers: {AppAuthorization: localStorage.getItem("token")}    //post 方法传 token
        })
        .then( res => {
          console.log(res.data);
          if ( res.data.status ) {
            message.success(res.data.msg)
            this_.props.history.push("/myTask");
          } else {
            message.error(res.data.msg)
          }
        })
        .catch( error => {
          console.log(error);
        })
      }}
    ])
  }

  // 申请平台介入按钮
  jieruBtn = () => {
    alert('平台介入', '确定申请平台介入？', [
      {text: '取消', onPress: () => {console.log('取消了')}},
      {text: '确定', onPress: () => {
        axios.post(global.constants.website+'/api/task/applyToPlatfrom',{
          order_id: localStorage.getItem("order_id"),   //获取存储到本地的order_id
        },{
          headers: {AppAuthorization: localStorage.getItem("token")}    //post 方法传 token
        })
        .then( res => {
          console.log(res.data);
          if ( res.data.status ) {
            message.success(res.data.msg)
          } else {
            message.error(res.data.msg)
          }
        })
        .catch( error => {
          console.log(error);
        })
      }}
    ])
  }

  render() {
    const { is_self,complain_status,complain_consult,start_time,images,complain_desc,complain_type,order_id,goodspic } = this.state;
    return(
      <div>
        <header className="tabTitle">
          <div className="return"><Link to="/dfTaskNo"><Icon type="left" theme="outlined" />返回</Link></div>
          申诉详情
        </header>
        <div className="top_">
          <div className="_header">
            <div className="_headerImg">
              <img src={goodspic} alt="商品主图"/>
            </div>
            <ul>
              <li>
                <p>订单编号</p>
                <p>{order_id}</p>
              </li>
              {/* <li>
                <p>QQ号码</p>
                <p>{seller_qq}</p>
              </li> */}
              <li>
                <p>其他联系方式申请平台介入提供</p>
              </li>
            </ul>
          </div>
          <div className="quxiaoBtn">
            <Button type="primary" onClick={this.showDrawer}>我不想做了，申请取消这个任务</Button>
          </div>
          <p>注：商家同意后任务取消，平台返款的本金将返回到商家本金账户，任务佣金将扣回或取消</p>
          <div className="center_detail">
            <img src={require('../../../../img/zhong.png')} alt="图标"/>
            <p>状态详情</p>
          </div>
          <div className="shop-titles">
            <span>1</span><span className="shop-titles_span">申诉内容 {start_time}</span>
            <div className="shensu_phones">
              {
                images ?
                  images.map((item, index) => {
                    return(
                      <img key={index} src={item} alt="申诉图片"/>
                    )
                  })
                :
                <img src={require("../../../../img/img2.png")} alt="申诉图片"/>
              }
              <p>类型：{complain_type} 原因：{complain_desc}</p>
            </div>
          </div>
          <div className="shop-titles">
            <span style={ complain_consult ? {backgroundColor: "#66caa8"} : {backgroundColor: "#ccc"} }>2</span><span className="shop-titles_span">协商处理</span>
            <div className="shensu_phones">
              {
                complain_consult ?
                  complain_consult.map((item, index) => {
                    return(
                      <div key={index} className="xieshang">
                        <p>{item.addtime}</p>
                        <p>{item.type}：{item.consult_desc}</p>
                      </div>
                    )
                  })
                :
                ""
              }
            </div>
          </div>
          <div className="shop-titles">
            <span style={ complain_status === 1 ? {backgroundColor: "#66caa8"} : {backgroundColor: "#ccc"} }>3</span><span className="shop-titles_span">已完结</span>
            <div className="shensu_phones">

            </div>
          </div>
          {
            complain_status ?
              ""
            :
            <div className="shensu_btns">
              <Button type="primary" onClick={this.plainTextPrompt}>回复申诉</Button>
              {
                is_self ?
                  <Button type="primary" onClick={this.showConfirm}>完结申诉</Button>
                :
                  ""
              }
              <Button type="primary" onClick={this.jieruBtn}>申请平台介入</Button>
            </div>
          }
        </div>


        <Drawer
          title="取消任务"
          width={"90%"}
          placement="right"
          onClose={this.onClose}
          maskClosable={false}
          visible={this.state.visible}
          style={{
            height: 'calc(100% - 55px)',
            overflow: 'auto',
            paddingBottom: 53,
            padding:0
          }}>
          <Menu
            defaultOpenKeys={['sub1']}
            mode="inline"
            theme="white"
            inlineCollapsed={this.state.collapsed}
            onClick={item => {this.setState({itme_key: item.key})}}  //取消任务选项获取key值 传给后台
          >
            <Menu.Item key="1">
              <Icon type="stop" theme="twoTone" />
              <span>拍错店铺或者商品</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="warning" theme="twoTone" />
              <span>用户串号</span>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="money-collect" theme="twoTone" />
              <span>用户已申请退款</span>
            </Menu.Item>
            <Menu.Item key="5">
              <Icon type="shopping" theme="twoTone" />
              <span>未拍下或未付款</span>
            </Menu.Item>
            <Menu.Item key="6">
              <Icon type="alert" theme="twoTone" />
              <span>问题任务</span>
            </Menu.Item>
            <Menu.Item key="7">
              <Icon type="api" theme="twoTone" />
              <span>用户操作不符合要求</span>
            </Menu.Item>
          </Menu>
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              width: '100%',
              borderTop: '1px solid #e8e8e8',
              padding: '10px 16px',
              textAlign: 'right',
              left: 0,
              background: '#fff',
              borderRadius: '0 0 4px 4px',
            }}>
            <Button style={{ marginRight: 8,}} onClick={this.onClose}>取消</Button>
            <Button onClick={this.onConfirm} type="primary">确认</Button>
          </div>
        </Drawer>
      </div>
    )
  }
}

export default AppealTaskDetails
