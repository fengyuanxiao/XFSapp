import React, { Component } from 'react';
import { Modal, Input, Button, Form, message  } from 'antd';
import ImagePicker from 'antd-mobile/lib/image-picker';
import axios from 'axios';
import ActivityIndicator from 'antd-mobile/lib/activity-indicator';
import WingBlank from 'antd-mobile/lib/wing-blank';
import '../../../../../component/apis';

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
      twovisible: false,
      threevisible: false,
      files: data,
    }
    // console.log(props);
  }

  // 货比三家示例图
  showOneShiliTu = () => {
    this.setState({
      onevisible: true,
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
  // 关闭查看示例图
  handleOk = (e) => {
    // console.log(e);
    this.setState({
      onevisible: false,
      twovisible: false,
      threevisible: false
    });
  }
  handleCancel = (e) => {
    // console.log(e);
    this.setState({
      onevisible: false,
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
      if ( !err === true && imgs.length >= this.props.pic_uploads_num ) {
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
        message.error('请完善信息');
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { files, animating } = this.state;
    const { chatpic,is_muti_keyword,shop_name, pic_uploads_num, pic_desc, platform,tasktype_itemname,platformname,user_taobao } = this.props;
    return(
      <div>
        {/* 第一步货比三家 */}
        <div className="task-plan buzhou">
          <WingBlank>
            <div className="buzou-title"><span>第一步 货比三家</span><span onClick={this.showOneShiliTu}>点击查看示例</span></div>
            <p>.请确认使用{user_taobao}（{platformname}账号）登入{tasktype_itemname}APP</p>
            <p>.打开{tasktype_itemname}，在搜索框手动输入指定关键词</p>
            <p>.按任务要求先浏览任意三家同类产品1-3分钟</p>
            <h3 style={{ color:'#c15958', marginTop:'1rem' }}>核对商家店铺名是否正确</h3>
            <div className="shop-title">
              <span>1</span><span>商家店铺名称:{shop_name}</span>
            </div>
            <div className="shop-title">
              <span>2</span>
              <Input onChange={ this.shopName } placeholder="请在此输入店铺名核对" />
              <Button type="primary" onClick={ this.heDuiName }>核对</Button>
            </div>
            {/* 第二步 浏览店铺 */}
            <div className="buzou-title"><span>第二步 浏览店铺</span><span onClick={this.showTwoShiliTu}>点击查看示例</span></div>
            <p>.找到任务商家对应店铺产品并点击进入，浏览任务商品详情2-3分钟</p>
            {
              platform === 5 ?
                <p>按照商家指定的下单方式进行下单，下单方式请拉到顶部查看拼团类型</p>
              :
              (platform === 6 ?
                <div>
                  <p>.把任务商品加入购物车，并同时浏览该店铺任意一款商品1分钟</p>
                  <p>.然后从购物车提交订单</p>
                </div>
              :
              <div>
                <p>.把任务商品加入购物车，并同时浏览该店铺任意一款商品1分钟</p>
                <p>.返回任务商品，直接点击购买（警示：勿从购物车提交订单）</p>
              </div>)
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
                  <p>.付款完成后，进人支付宝账单详情页面，截图上传</p>
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
              onChange={this.onChange}
              onImageClick={(index, fs) => console.log(index, fs)}
              selectable={files.length < pic_uploads_num}
              accept="image/gif,image/jpeg,image/jpg,image/png"
            />
            <p className="jietuFont">注：请上传<span style={{ fontWeight:'bold',fontSize:'1rem',color:'red' }}>（{pic_desc}）</span></p>
            <div className="buzou-title"><span style={{ color:'#63bb95' }}>第四步 订单信息核对</span></div>
            <p>应垫付金额:100元(请按实际垫付金额填写，实际相差超50元请取消任务)</p>
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
              <FormItem>
                {getFieldDecorator('orderNumber', {
                  rules: [{ required: true, message: '请输入支付宝商户订单号!' }],
                })(
                  <Input placeholder="请输入支付宝商户订单号" className="jineInput" />
                )}
              </FormItem>
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
