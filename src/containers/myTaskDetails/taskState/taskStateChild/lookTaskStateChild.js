import React, { Component } from 'react';
import { Icon, message, Input, Button } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ImagePicker from 'antd-mobile/lib/image-picker';

import './taskStateChild.css';
import '../../../../component/apis';
const data = [];
const { TextArea } = Input;

class LookTaskStateChild extends Component {
  constructor(props) {
    super();
    this.state = {
      datas: false,
      remark_pic: "此商家没有额外要求",
      animating: false,
      remarks: false,                       //判断商家是否有要求
      files: data,
      oks: false,                         //是否核对过店铺
    }
    // console.log(props);
  }

  componentWillMount = () => {
    axios.post(global.constants.website+'/api/task/operateFlowTask',
    {
      order_id: localStorage.getItem("order_id"),   //获取存储到本地的order_id
    },
    {
      headers: {AppAuthorization: localStorage.getItem("token")}    //post 方法传 token
    })
    .then(response => {
      let responses = response.data.data.taskDetail;
      // console.log(responses);   //任务详情数据，完成的任务进度
      this.setState({
        datas: true,

        shop_name: responses.shop_name,                         //店铺名称
        goodsname: responses.goodsname,                         //商品名称
        goodspic: responses.goodspic,                           //商品主图
        tasktype_name: responses.tasktype_name,                 //任务类型名称
        tasktype_itemname: responses.tasktype_itemname,         //任务平台类型
        keyword_type_name: responses.keyword_type_name,         //"普通五星好评"
        keyword_type: responses.keyword_type,                   //为3优先显示rule
        keyword: responses.keyword,                             //搜索关键字
        sortmsg: responses.taskInfo.sortmsg,                    //排序方式
        position: responses.taskInfo.position,                  //排序位置
        goods_address: responses.taskInfo.goods_address,        //商品所在地
        platformname: responses.platformname,                   //淘宝
        paychannel: responses.taskInfo.paychannel,              //支付方式
        pic_uploads_num: responses.pic_uploads_num,             //需要上传的图片张数
        pic_desc: responses.pic_desc,                           //上传图片的描述
        remark: responses.taskInfo.remark,                      //商家要求文字
        remark_pic: responses.taskInfo.remark_pic,              //商家要求图片
        task_type: responses.task_type,                         //为 1 是浏览任务
        order_id: responses.order_id,                           //订单id
        task_id: responses.task_id,                             //任务id
      })
      if ( responses.taskInfo.remark_pic === "" && responses.taskInfo.remark === "" ) {

      } else {
        this.setState({
          remarks: true,
        })
      }
      // 处理显示店铺全名
      let shop_name = this.state.shop_name;
      let goodsname = this.state.goodsname;
      if ( shop_name.length >= 3 && goodsname.length >= 4 ) {
        let newShopName = `${shop_name.substring(0,3)}*****`;
        let newGoodsname = `${goodsname.substring(0,4)}*********`;
        this.setState({
          shop_namess: newShopName,
          goodsname: newGoodsname,
        })
      }
    })
    .catch(error => {
      // console.log(error.response.status);
      if ( error.response.status ) {
        message.warning('服务器开小差啦！！！', 2)
        .then(this.props.history.push('/myTaskDetails'), 2)
      }
    })
  }


  onChange = (files, type, index) => {
    // console.log(files);
    this.setState({
      files,
    });
  }

  linkOk = (e) => {
    // console.log(e.target.value);
    this.setState({
      linkValues: e.target.value,       //用户输入的链接
    })
  }

  // 核对商家店铺名是否正确
  heDuiName = () =>  {
    axios.post(global.constants.website+'/api/task/checkGood', {
      url: this.state.linkValues,                                ////用户输入的链接
      task_id: this.state.task_id,                             //订单ID
      isAndroid: 1,               //安卓或ios localStorage.getItem("platform")
    },{
      headers: {AppAuthorization: localStorage.getItem("token")}    //post 方法传 token
    })
    .then( res => {
      if ( res.data.status ) {
        message.success(res.data.msg)
        this.setState({
          oks: true,
        })
      } else {
        message.error(res.data.msg)
      }
    })
    .catch(error => {
      console.log(error);
    })
  }

  // 提交任务
  handleSubmit = (e) => {
    e.preventDefault();
    let this_ = this;
    let photos = this.state.files;        //图片集合
    let order_id = this.state.order_id;
    let imgs = [];    //转换图片的格式
    for (var i = 0; i < photos.length; i++) {
      imgs.push(photos[i].url)
    }

    if ( this.state.oks === false ) {
      message.error("请先核对商品链接！")
    } else {
      if ( imgs.length < this.state.pic_uploads_num ) {
        message.error("请上传必要截图！")
      }else {
        this_.setState({ animating: true })            //数据提交中显示的login.....
        // 此处执行ajax请求
        axios.post(global.constants.website+'/api/task/flowTaskCommit', {
          order_id: order_id,                   //订单ID
          fav_flow_content: imgs,               //聊天、支付或者下单详情截图
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
    }
  }

  render() {
    const { files } = this.state;
    const { shop_namess, remark_pic,remarks,shop_name,charset_two,charset_one,remark,maxprice,minprice,goods_address, pic_desc, pic_uploads_num, is_muti_keyword, position, sortmsg, keyword, goodsname, goodspic, tasktype_name } = this.state;
    return(
      <div className="taskStateChild-box">
        <header className="tabTitle">
          <div className="return"><Link to="/myTaskDetails"><Icon type="left" theme="outlined" />返回</Link></div>
          操作任务
        </header>
        {/* 目标商品详情介绍 */}
        <div className="task-plan" style={{ margin:0 }}>
          <div className="plan-box" style={{ marginTop: "2rem" }}>
            <p className="task-plan-list"><span>{shop_namess}</span>
              {/* <Link to="mqqwpa://im/chat?chat_type=wpa&uin=3527307663&version=1&src_type=web&web_src=qzone.com">如遇到问题点击联系平台客服</Link> */}
              <a href="mqqwpa://im/chat?chat_type=wpa&uin=3527307663&version=1&src_type=web&web_src=qzone.com">如遇到问题点击联系平台客服</a>
            </p>
          </div>
          <section className="taskDetail-header" style={{ padding:0 }}>
            <p className="taskDetail-header-top">
              <span>目标商品</span>
            </p>
            <div className="taskDetail-header-button">
              <div style={{ width: '30%' }}>
                <img src={goodspic} alt="商品图" style={{ width:"100%",paddingRight:"0.3rem" }} />
              </div>
              <div style={{ width: '70%' }}>
                <p style={{ fontWeight:'bold' }}>{goodsname}</p>
                {/* <p>搜索展示价格：<span>{searchprice}</span></p>
                  <p>商品单件成交价格：<span className="make-num">{itemprice}元</span></p>
                <p>下单件数：<span className="make-num">{itemnum}件</span></p> */}
                <p style={{ fontSize: '1rem', color: 'red' }}>浏览任务，请勿付款</p>
              </div>
            </div>
          </section>
        </div>
        {/* 任务要求 */}
        <div className="taskRenw">
          <Icon type="pushpin" theme="outlined" />
          <span>任务要求</span>
        </div>
        <div className="plan-box task-plan" style={{ marginBottom:0 }}>
          <p className="task-plan-list"><span>任务类型</span><span style={{ color:'red' }}>{tasktype_name}(手机淘宝)</span></p>
          {/* <p className="task-plan-list"><span>评价要求</span><span>{keyword_type_name}</span></p> */}
          <p className="task-plan-list" style={{ border:'none' }}><span>搜索关键字</span><span style={{ overflow:'auto',wordBreak:'keep-all' }}>{keyword}</span></p>
          {
            is_muti_keyword ?
              <div>
                <p className="task-plan-list" style={{ border:'none' }}><span>搜索关键字1</span><span style={{ overflow:'auto',wordBreak:'keep-all' }}>{charset_two}</span></p>
                <p className="task-plan-list" style={{ border:'none' }}><span>搜索关键字2</span><span style={{ overflow:'auto',wordBreak:'keep-all' }}>{charset_one}</span></p>
              </div>
            :
            ""
          }
          <p className="task-plan-list-Child"><span>(打开淘宝搜索关键词)</span><span className="fontsi">注：如有关键字过长请左右拖动查看</span></p>
          {/* <p className="task-plan-list"><span>购买数量</span><span>目标商品{itemnum}件</span></p> */}
          {/* 循环上平规格 */}
          <p className="task-plan-list"><span>排序方式</span><span>{sortmsg}排序</span></p>
          <p className="task-plan-list"><span>排序位置</span><span>约{position}人收货/付款</span></p>
          <p className="task-plan-list"><span>所在地</span><span>{goods_address? goods_address: "全国"}</span></p>
          <p className="task-plan-list"><span>价格区间</span><span>{maxprice? minprice+"—"+maxprice : "无需筛选价格"}</span></p>

          {/* <p className="task-plan-list"><span>订单留言</span><span style={{ overflow:'auto',wordBreak:'keep-all' }}>{order_message ? order_message : ""}</span></p> */}
          {/* <p className="task-plan-list-Child"><span>(查看订单留言)</span><span className="fontsi">注：如内容过长请左右拖动查看</span></p> */}
        </div>
        {/* 商家要求 */}
        <div className="taskRenw">
          <Icon type="pushpin" theme="outlined" />
          <span>商家要求</span>
        </div>
        <div className="plan-box task-plan" style={{ marginBottom:0 }}>
          <div style={{ fontSize: '1.2rem' }}>
            <span style={{ color:'red' }}>商家要求：</span>
            {/* <span style={{ width: '70%',textAlign:'initial'}}>{this.props.location}</span> */}
          </div>
          <div>
            <p style={{ fontSize: '1rem', color: '#0156B1' }}>{remark}</p>
            { remarks ?
              remark_pic !== "" ?
                remark_pic.map((item, index) => {
                  return(
                    <img style={{ maxWidth:'100%' }} key={index} src={item} alt="要求图"/>
                  )
                })
              :
              ""
            :
            <p style={{ fontSize: '1rem', color: '#0156B1' }}>商家没有额外要求</p>
            }
          </div>
        </div>
        {/* 注意事项 */}
        <div className="taskRenw">
          <Icon type="exclamation-circle" theme="outlined" />
          <span>注意事项</span>
        </div>
        <div className="task-plan detailss" style={{ marginBottom:0 }}>
          <p>.根据商家提供的关键词搜索浏览后，进入到该商品页面，浏览详情及评价3分钟，长按商品名字可以选择复制商品链接或者点击右上角按钮选择分享也可以复制商品链接，复制商品链接粘贴到核对链接框内验证是否浏览正确，如链接能核对上则验证通过，提交任务等待审核。</p>
          <p>.如果验证提示找不到宝贝链接，苹果手机请长按产品名即可复制产品链接验证，安卓手机验证不了就放弃任务，严禁旺旺联系商家</p>
          <p>.如商家要求收藏及加购截图，则需上传正确的截图。</p>
        </div>
        {/* 任务步骤 */}
        <div className="taskRenw">
          <Icon type="edit" theme="outlined" />
          <span>任务步骤</span>
        </div>
        <div className="task-plan buzhou" style={{ marginBottom: '0' }}>
          <div className="buzou-title"><span>第一步 核对商品链接</span></div>
          <p className="linkok">核对商品链接是否正确</p>
          <TextArea rows={4} onChange={this.linkOk} style={{ width: "100%" }} placeholder="请输入链接" />
          <div style={{ marginBottom: '30px' }}>
            <Button style={{ display: 'block', margin: '0 auto', width: '40%' }} type="primary" onClick={ this.heDuiName }>核对</Button>
          </div>
          {
            pic_uploads_num > 0 ?
              <div>
                <div className="buzou-title"><span>第二步 浏览收藏加购</span></div>
                <p>.收藏商品，完成上传收藏商品列表截图</p>
                <p>.收藏店铺，完成后上传收藏店铺列表截图</p>
                <ImagePicker
                  length={pic_uploads_num}
                  files={files}
                  multiple={false}
                  onChange={this.onChange}
                  onImageClick={(index, fs) => console.log(index, fs)}
                  selectable={files.length < pic_uploads_num}
                />
                <p className="jietuFont">注：请上传<span style={{ fontWeight:'bold',fontSize:'1rem',color:'red' }}>（{pic_desc}）</span></p>
              </div>
            :
              ''
          }
        </div>
        <Button onClick={this.handleSubmit} type="primary" className="login-form-button">提交任务</Button>
        {/* 在此判断是否是浏览任务 任务步骤 lookShiliTu.js */}

      </div>
    )
  }
}

export default LookTaskStateChild
