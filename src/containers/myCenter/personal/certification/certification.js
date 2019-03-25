import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon, Form, Input, Button, message } from 'antd';
import axios from 'axios';
import lrz from 'lrz';
import ImagePicker from 'antd-mobile/lib/image-picker';
import ActivityIndicator from 'antd-mobile/lib/activity-indicator';
import WingBlank from 'antd-mobile/lib/wing-blank';
import '../../../../component/apis';

const FormItem = Form.Item;
const imgdata = [];         //图片数组1
const imgdata1 = [];        //图片数组2
// 身份证正则
const cards = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;

class certifications extends Component {
  constructor() {
    super();
    this.state = {
      animating: false,
      files01: imgdata,       //图片数组1
      files02: imgdata1,      //图片数组2
      num: 0,                 //如果是false 点击确认绑定就传后台放回过来的图片路径，为true就传买手上传的图片
      num1: 0,                //如果是false 点击确认绑定就传后台放回过来的图片路径，为true就传买手上传的图片
    }
  }

  componentDidMount() {
    let this_ = this;
    axios.get(global.constants.website+'/api/index/realnamechange',
    {
      headers: {AppAuthorization: localStorage.getItem("token")}    //post 方法传 token
    })
    .then(function (response) {   //调用接口成功执行
      let responses = response.data.data;
      let cardid_img = [responses.cardid_img];        //存储后台放回过来的图片路径
      let cardid_img2 = [responses.cardid_img2];      //存储后台放回过来的图片路径
      console.log(responses);
      // console.log(cardid_img2);
      this_.props.form.setFieldsValue({
        cardid_name: responses.cardid_name,
        cardid: responses.cardid,
      })
      this_.setState({
        files01: cardid_img,                             //让后端返回过来的图片 在页面做展示
        files02: cardid_img2,                            //让后端返回过来的图片 在页面做展示
        url1: responses.cardid_img.url,                  //存储返回的图片
        url2: responses.cardid_img2.url,                 //存储返回的图片
      })
    })
    .catch(function (error) {   //调用接口失败执行
      console.log(error);
    });
  }

  // 上传我的淘宝 支付宝示例图回调
  onUploadOne1 = (files01, type, index) => {
    // console.log(files01, type, index);
    if(type==='add'){
      lrz(files01[0].url, {quality:0.5})
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
      num: 1,                  //如果买手上传新图触发 将改为true
    });
  }
  // 上传我的淘宝 支付宝示例图回调
  onUploadOne2 = (files02, type, index) => {
    // console.log(files02, type, index);
    if(type==='add'){
      lrz(files02[0].url, {quality:0.5})
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
      num1: 1,                  //如果买手上传新图触发 将改为true
    });
  }

  // 提交表单按钮、ajax提交数据
  handleSubmit = (e) => {
    e.preventDefault();
    let this_ = this;
    let states = this.state;
    if ( states.num === 1 && states.num1 === 1 ) {          // num和num1为true 标明用户有新上传图片，
      var imgs1 = [states.tu1, states.tu2];                 //有新上传图片保存压缩图到数组
    } else if ( states.num1 ) {                             //num1 为srue 说明用户只上传了身份证反面图片
      var img2 = [states.url1, states.tu2]                  //后台放回过来的身份证正面图不换 只换反面新传的图片
    } else if ( states.num ) {                              //num 为srue 说明用户只上传了身份证正面图片
      var img1 = [states.tu1, states.url2]                  //后台放回过来的身份证反面图不换 只换正面新传的图片
    } else {
      var fImgs = [states.url1, states.url2];                //储存后台放回需要反显得图片
      var imgs = [states.tu1, states.tu2];                   //保存新上传的图片集合
      imgs = fImgs;                                          //
    }
    // console.log(imgs);
    this.props.form.validateFields((err, values) => {
      if ( !err === true ) {
        if ( !cards.test(values.cardid) ) {                                   //判断是否是正确的身份证号码
          message.error("请输入正确的身份证号！")
        } else {
          this_.setState({ animating: true })                                 //数据提交中显示的login.....
          // let imgs = [values.images[0].url, values.images[1].url];            //保存图片集合
          axios.post(global.constants.website+'/api/index/realnamecommit', {
            images: states.num === 1 && states.num1 === 1 ? imgs1 : ( states.num1 === 1 ? img2 : ( states.num === 1 ? img1 : imgs ) ),        //图片集合                                                     //用户身份证正反两面截图
            realName: values.cardid_name,                                        //真实姓名
            cardno: values.cardid,                                            //身份证号
          },
          {
            headers: {AppAuthorization: localStorage.getItem("token")}        //post 方法传 token
          })
          .then( response => {
            let data_ = response.data;
              // console.log(data_);
            if ( data_.status ) {                           //status 为true 执行下面代码
              this_.setState({ animating: false })          //数据提交成功关闭login.....
              message.success(data_.msg);
              this_.props.history.push("/personal");
            } else {                                        //status 为false 执行
              this_.setState({ animating: false })          //数据提交成功关闭login.....
              message.error(data_.msg);
            }
          })
          .catch( error => {
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
    const { files01, files02, animating,uploadImgs } = this.state;
    return(
      <div>
        <header className="tabTitle">
          <div className="return"><Link to="/personal"><Icon type="left" theme="outlined" />返回</Link></div>
          实名认证
        </header>
        <div className="buyAdmin-box">
          <WingBlank>
            <Form onSubmit={this.handleSubmit} className="login-form">
              <FormItem
                label="姓名"
              >
                {getFieldDecorator('cardid_name', {
                  rules: [{ required: true, message: '请输入姓名!' }],
                })(
                  <Input className="buy-input" placeholder="请输入姓名" type="text" />
                )}
              </FormItem>
              <FormItem
                label="身份证号"
              >
                {getFieldDecorator('cardid', {
                  rules: [{ required: true, message: '请输入身份证号!' }],
                })(
                  <Input className="buy-input" type="text" placeholder="请输入身份证号" maxLength="18" />
                )}
              </FormItem>
              <FormItem
                label="上传身份证正面图"
              >
                {getFieldDecorator('images1', {
                  rules: [{ required: localStorage.getItem("realname_status") === "0" ? true : false , message: '请上传身份证正面图和反面图!' }],
                })(
                  <ImagePicker
                    length={1}
                    files={files01}
                    multiple={false}
                    onChange={this.onUploadOne1}
                    onImageClick={(index, fs) => console.log(index, fs)}
                    selectable={files01.length < 1}
                  />
                )}
              </FormItem>
              <FormItem
                label="上传身份证反面图"
              >
                {getFieldDecorator('images2', {
                  rules: [{ required: localStorage.getItem("realname_status") === "0" ? true : false , message: '请上传身份证正面图和反面图!' }],
                })(
                  <ImagePicker
                    length={1}
                    files={files02}
                    onChange={this.onUploadOne2}
                    onImageClick={(index, fs) => console.log(index, fs)}
                    selectable={files02.length < 1}
                  />
                )}
              </FormItem>
              <div style={{ color:"red", paddingBottom: '0.8rem' }}>
                温馨提示：绑定的身份证名字须和支付宝实名认证一致，请认真核对，填写不正确将导致返款失败！您的信息仅用于返款用途，小跳蛙将保证信息安全不泄漏，不用于其他用途。
              </div>
              <Button type="primary" htmlType="submit" className="accountBtn">提交</Button>
              <div className="toast-example">
                <ActivityIndicator
                  toast
                  text="数据提交中..."
                  animating={animating}
                />
              </div>
            </Form>
          </WingBlank>
        </div>
      </div>
    )
  }
}

const certification = Form.create()(certifications);
export default certification
