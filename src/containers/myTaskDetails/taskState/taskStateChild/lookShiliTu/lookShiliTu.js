import React, { Component } from 'react';
import { Modal, Input, Button, Form, message  } from 'antd';
import ImagePicker from 'antd-mobile/lib/image-picker';
import axios from 'axios';
import ActivityIndicator from 'antd-mobile/lib/activity-indicator';
import WingBlank from 'antd-mobile/lib/wing-blank';
// import '../../../../../component/apis';

// import { pageInputScroll } from '../../../../../component/pageInputScroll';
// import TaskStateUpload from '../taskStateUpload/taskStateUpload';

const FormItem = Form.Item;
const data = [];
let taobaoOride =  /^T200P\d{18}$/;   //淘宝订单号
let jingdongOride = /^\d{11}$/;       //京东订单号
let pinduoduoOride = /^\d{6}[-]\d+$/; //拼多多订单号
let weipinhuiOride = /^\d{14}$/;      //唯品会订单号

message.config({
  top: 300,
});

class LookShiliTus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animating: false,
      onevisible: false,
      onevisibles: false,
      twovisible: false,
      threevisible: false,
      files: data,
      oks: false,                         //是否核对过店铺
      oks2: false,                         //是否核对过店铺
    }
    // console.log(props);
  }

  // componentDidMount(){
  //      pageInputScroll()
  //  }

  // 货比三家示例图
  showOneShiliTu = () => {
    this.setState({
      onevisible: true,
    })
  }
  showOneShiliTus = () => {
    this.setState({
      onevisibles: true,
    })
  }
  // 浏览店铺示例图
  showTwoShiliTu = () => {
    this.setState({
      twovisible: true
    })
  }
  // 聊天下单支付示例图
  showThreeShiliTu = () => {
    this.setState({
      threevisible: true
    })
  }

  // 核对商家店铺名是否正确
  heDuiName = () =>  {
    let inshop_name = this.state.inshop_name;
    let getshop_name = this.props.shop_name;
    // console.log("核对商家店铺名是否正确");
    if ( inshop_name === getshop_name ) {
      message.success("店铺名称正确！")
      this.setState({
        oks: true,
      })
    } else {
      message.error("店铺名称错误！")
    }
  }
  // 输入商家店铺名称value值
  shopName =(e) => {
    this.setState({
      inshop_name: e.target.value
    })
    // console.log(e.target.value);
  }

  // 输入商家设置的答案value值
  shopAnswer =(e) => {
    this.setState({
      answer: e.target.value
    })
    // console.log(e.target.value);
  }
  answerBtn = () => {
    axios.post(global.constants.website+'/api/task/checkQuestion', {
      stayanswer: this.state.answer,                           //用户输入的答案
      task_id: this.props.task_id,                             //任务ID
    },{
      headers: {AppAuthorization: localStorage.getItem("token")}    //post 方法传 token
    })
    .then( res => {
      if ( res.data.status ) {
        message.success(res.data.msg)
        this.setState({
          oks2: true,
        })
      } else {
        message.error(res.data.msg)
      }
    })
    .catch(error => {
      console.log(error);
    })
  }

  // 关闭查看示例图
  handleOk = (e) => {
    // console.log(e);
    this.setState({
      onevisible: false,
      onevisibles: false,
      twovisible: false,
      threevisible: false
    });
  }
  handleCancel = (e) => {
    // console.log(e);
    this.setState({
      onevisible: false,
      onevisibles: false,
      twovisible: false,
      threevisible: false
    });
  }

  // 上传聊天截图 支付宝账单截图
  onChange = (files, type, index) => {
    // console.log(files);
    this.setState({
      files,
    });
  }

  // niantieBtn = (e) => {
  //   var target = this;
  //   console.log(target);
  // }

  // 操作任务页面 实付金额、支付宝商户订单号
  handleSubmit = (e) => {
    e.preventDefault();
    let this_ = this;
    let photos = this.state.files;        //图片集合
    let order_id = this.props.order_id;
    let imgs = [];    //转换图片的格式
    for (var i = 0; i < photos.length; i++) {
      imgs.push(photos[i].url)
    }
    // console.log(this.props.pic_uploads_num);
    // console.log(imgs);
    this.props.form.validateFields((err, values) => {
      if ( this.state.oks === false ) {
        message.error("请先核对店铺！")
      } else if ( this.state.oks2 === false ) {
        message.error("请先核对商家问题！")
      } else {
        if ( !err === true && imgs.length === this.props.pic_uploads_num ) {
          if ( !taobaoOride.test(values.orderNumber) && !jingdongOride.test(values.orderNumber) && !pinduoduoOride.test(values.orderNumber) && !weipinhuiOride.test(values.orderNumber) ) {
            message.error("请输入正确的订单号！")
          } else {
            this_.setState({ animating: true })            //数据提交中显示的login.....
            // 此处执行ajax请求
            axios.post(global.constants.website+'/api/task/operateTaskCommit', {
              taobao_ordersn: values.orderNumber,   //用户下单的订单号
              order_id: order_id,                   //订单ID
              need_principal: values.money,         //实际返款金额
              chat_pay_content: imgs,               //聊天、支付或者下单详情截图
            },{
              headers: {AppAuthorization: localStorage.getItem("token")}    //post 方法传 token
            })
            .then( res => {
              // console.log(res.data.data);
              if ( res.data.status ) {
                this_.setState({ animating: false })          //数据提交成功关闭login.....
                this_.props.history.push("/myTaskDetails");
                message.success(res.data.msg);
              } else {
                this_.setState({ animating: false })          //数据提交成功关闭login.....
                message.error(res.data.msg)
              }
            })
            .catch(error => {
              console.log(error);
            })
          }
        }else {
          if ( imgs.length > this.props.pic_uploads_num ) {
            message.error('只能上传'+ this.props.pic_uploads_num + '张必要图片');
          } else {
            message.error('请完善信息');
          }
        }
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { files, animating } = this.state;
    const { stay_pic, stayquestion, itemnum, itemprice,chatpic,is_muti_keyword,shop_namess, pic_uploads_num, pic_desc, platform,tasktype_itemname,platformname,user_taobao } = this.props;
    return(
      <div>
        {/* 第一步货比三家 */}
        <div className="task-plan buzhou" style={{ marginBottom: '0' }}>
          <WingBlank>
            <div className="buzou-title"><span>第一步 货比商品</span><span onClick={this.showOneShiliTu}>点击查看示例</span></div>
            <p>.请确认使用 <span style={{ color: 'red' }}>{user_taobao}</span>（{platformname}账号）登入{tasktype_itemname}APP</p>
            <p>.打开{tasktype_itemname}，在搜索框手动输入指定关键词（禁止复制关键词）</p>
            <p>.按任务要求先浏览任意2-4家同类产品1-3分钟（或者按商家要求货比）</p>
            <p>.做单期间全程不要截图，需要提交的图片在按要求完成付款后截取:需要店外截图关键词的，请截图后退出关闭{platformname}APP，一分钟后再重新登入{platformname}APP继续后续操作</p>
            <div style={{ display: 'flex', alignItems:'center',justifyContent:'space-between' }}>
              <h3 style={{ color:'#c15958', marginTop:'1rem' }}>核对商家店铺名是否正确</h3>
              {
                stay_pic === "" ?
                  ''
                :
                <p onClick={this.showOneShiliTus} style={{ marginTop: '1rem',fontSize: '1rem',color:'red' }}>点击答案提示</p>
              }
            </div>
            <div className="shop-title">
              <span>1</span><span>商家店铺名称:{shop_namess}</span>
            </div>
            <div className="shop-title">
              <span>2</span>
              <Input onChange={ this.shopName } placeholder="请在此输入店铺名核对" />
              <Button type="primary" onClick={ this.heDuiName }>核对</Button>
            </div>
            {
              stayquestion === "" ?
                ""
              :
              <div>
                <div className="shop-title">
                  <span>3</span><span>商家设置的问题:{stayquestion}</span>
                </div>
                <div className="shop-title">
                  <span>4</span>
                  <Input onChange={ this.shopAnswer } placeholder="请在此输入答案" />
                  <Button type="primary" onClick={ this.answerBtn }>核对</Button>
                </div>
              </div>
            }
            {/* 第二步 浏览店铺 */}
            <div className="buzou-title"><span>第二步 浏览店铺</span><span onClick={this.showTwoShiliTu}>点击查看示例</span></div>

            {
              platform === 5 ?
                <div>
                  <p>.找到任务商家对应店铺产品并点击进入，浏览任务商品详情2-3分钟</p>
                  <p>按照商家指定的下单方式进行下单，下单方式请拉到顶部查看拼团类型</p>
                </div>
              :
              platform === 6 ?
                <div>
                  <p>.找到任务商家对应店铺产品并点击进入，浏览任务商品详情2-3分钟</p>
                  <p>.把任务商品加入购物车，并同时浏览该店铺任意一款商品1分钟</p>
                  <p>.然后从购物车提交订单</p>
                </div>
              :
              platform === 2 ?
                <div>
                  <p>.找到任务商家对应店铺产品并点击进入，浏览任务商品详情2-3分钟</p>
                  <p>.把任务商品加入购物车，并同时浏览该店铺任意一款商品1分钟</p>
                  <p>.返回任务商品，直接点击购买（警示：勿从购物车提交订单)</p>
                </div>
              :
              platform === 7 ?
                <div>
                  <p>.找到任务商家对应店铺产品并点击进入，浏览任务商品详情2-3分钟</p>
                  <p>.把任务商品加入购物车，并同时浏览该店铺任意一款商品1分钟</p>
                </div>
              :
              <div>
                <p>.找到任务商家对应店铺产品并点击进入，浏览任务商品详情，评价，问大家2-3分钟</p>
                <p>.把任务商品先收藏宝贝加入购物车，并同时浏览该店铺任意一款商品1分钟</p>
                <p>.返回任务商品，直接点击购买或按商家要求提交购买付款（警示:请根据商家任务要求下单请勿直接购物车提交订单或者秒拍）</p>
              </div>
            }
            {/* 第三步 聊天下单支付 */}
            {
              platform === 1 ?
                <div>
                  <div className="buzou-title"><span>第三步 {platform === 1 ? "聊天下单支付" : "上传订单截图"}</span><span onClick={this.showThreeShiliTu}>点击查看示例</span></div>
                  {is_muti_keyword ?
                    <div>
                      <p>.主关键词搜索 找到对应任务宝贝店外截图 进店浏览2-3分钟 任务宝贝加入购物车 退出 上传正确的图</p>
                      <p>.点开购物车 截图购物车里的任务宝贝 上传正确的图</p>
                    </div>
                  :
                    ""
                  }
                  <p>.需按商家要求选择是否聊天下单支付，或直接提交订单不聊天</p>
                  <p>.付款完成后，进入支付宝APP—右下角我的→账单→对应任务账单详情页面，截图上传（警示：支付宝商户订单号是支付宝APP内的，禁止复制淘宝的订单号，禁止淘宝任何截图）</p>
                  {/* <p style={{ color:'red', fontWeight:'bold' }}>.如商家备注无需聊天，聊天图上传支付宝账单替代</p> */}
                  {
                    is_muti_keyword ?
                      ""
                    :
                    (chatpic ?
                      <p className="liaotian">此任务商家要求聊天</p>
                    :
                    <p className="liaotian">此任务不需要聊天</p>)
                  }
                </div>
              :
              (platform === 2 ?
                <div className="buzou-title"><span>第三步 上传订单截图</span><span onClick={this.showThreeShiliTu}>点击查看示例</span></div>
              :
              (platform === 5 ? <div className="buzou-title"><span>第三步 上传订单截图</span><span onClick={this.showThreeShiliTu}>点击查看示例</span></div>
              : <div className="buzou-title"><span>第三步 上传订单截图</span><span onClick={this.showThreeShiliTu}>点击查看示例</span></div> )
              )
            }
            {/* 支付宝 账单截图 */}
            <ImagePicker
              length={pic_uploads_num}
              files={files}
              multiple={false}
              onChange={this.onChange}
              onImageClick={(index, fs) => console.log(index, fs)}
              selectable={files.length < pic_uploads_num}
            />
            <p className="jietuFont">注：请上传<span style={{ fontWeight:'bold',fontSize:'1rem',color:'red' }}>（{pic_desc}）</span></p>
            <div className="buzou-title"><span style={{ color:'#63bb95' }}>第四步 订单信息核对</span></div>
            <p>应垫付金额:{itemprice*itemnum}元(请按实际垫付金额填写，实际相差超50元请取消任务)</p>
            {
              platform === 1 ?
                <p style={{ color: 'red', fontWeight:'bold', marginBottom:'1rem' }}>商户订单号可在支付宝账单详情中复制</p>
              :
              <p style={{ color: 'red', fontWeight:'bold', marginBottom:'1rem' }}>订单号可在订单详情中复制</p>
            }
            <Form className="login-form" layout="inline" onSubmit={this.handleSubmit}>
              <FormItem>
                {getFieldDecorator('money', {
                  rules: [{ required: true, message: '请输入实际付款金额!' }],
                })(
                  <Input type="Number" placeholder="请输入实际付款金额" className="jineInput" />
                )}
              </FormItem>
              {
                platformname === "淘宝" ?
                  <FormItem>
                    {getFieldDecorator('orderNumber', {
                      rules: [{ required: true, message: '请输入支付宝商户订单号!' }],
                    })(
                      <Input placeholder="请输入支付宝商户订单号" className="jineInput animated-router-forward-enter-done" />
                      // <div style={{ display: 'flex',}}>
                      //   <Input placeholder="请输入支付宝商户订单号" className="jineInput" />
                      //   <Button onClick={ this.niantieBtn } style={{ marginTop: 0 }}>黏贴</Button>
                      // </div>
                    )}
                  </FormItem>
                :
                <FormItem>
                  {getFieldDecorator('orderNumber', {
                    rules: [{ required: true, message: '请输入订单号!' }],
                  })(
                    <Input placeholder="请输入订单号" className="jineInput" />
                  )}
                </FormItem>
              }
              <FormItem>
                <Button type="primary" htmlType="submit" className="login-form-button">
                  提交任务
                </Button>
              </FormItem>
            </Form>
            <div className="toast-example">
              <ActivityIndicator
                toast
                text="数据提交中..."
                animating={animating}
              />
            </div>
          </WingBlank>
        </div>


        {/* 第一步货比三家的图片示例 */}
        <Modal
          visible={this.state.onevisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          maskClosable={true}
          okText={"知道了"}
          cancelText={"关闭"}
        >
          <img className="shilitu" src={require('../../../../../img/4444.jpg')} alt="货比三家" />
        </Modal>
        <Modal
          visible={this.state.onevisibles}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          maskClosable={true}
          okText={"知道了"}
          cancelText={"关闭"}
        >
          <img className="shilitu" src={stay_pic} alt="货比三家" />
        </Modal>
        {/* 第二步浏览店铺的图片示例 */}
        <Modal
          visible={this.state.twovisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          maskClosable={true}
          okText={"知道了"}
          cancelText={"关闭"}
        >
          <img className="shilitu" src={require('../../../../../img/5555.jpg')} alt="浏览店铺" />
        </Modal>
        {/* 第三步聊天下单支付的图片示例 */}
        <Modal
          visible={this.state.threevisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          maskClosable={true}
          okText={"知道了"}
          cancelText={"关闭"}
        >
          <img className="shilitu" src={platform === 1? require('../../../../../img/6666.jpg') : (platform === 2? require('../../../../../img/jdshili.jpg') : (platform === 5? require('../../../../../img/pddorder.png') : require('../../../../../img/wphorder.jpg')))} alt="聊天下单" />
        </Modal>
      </div>
    )
  }
}

const LookShiliTu = Form.create()(LookShiliTus);
export default LookShiliTu
