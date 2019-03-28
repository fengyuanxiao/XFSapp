import React, { Component } from 'react';
import { Icon, Modal, Input, Button, message } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ImagePicker from 'antd-mobile/lib/image-picker';
import ActivityIndicator from 'antd-mobile/lib/activity-indicator';
import WingBlank from 'antd-mobile/lib/wing-blank';

import './taskStateChild.css';
import '../../../../component/apis';

const data = [];

class TaskStateChilds extends Component {
  constructor(props) {
    super();
    this.state = {
      animating: false,
      onevisible: false,
      files: data,
      datas: false,
      remark_pic: "此商家没有额外要求",
      oks: false,                         //是否核对过店铺
      remarks: false,                       //判断商家是否有要求
      visible: false,
    }
  }

  componentWillMount = () => {
    this.setState({
      visible: true,
    })
    axios.post(global.constants.website+'/api/task/operateTask',
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
        searchprice: responses.searchprice,                     //搜索展示价格：
        itemnum: responses.itemnum,                             //下单商品数件
        itemprice: responses.itemprice,                         //单件商品成交价格
        platform: responses.platform,                           //指哪个平台
        platformname: responses.platformname,                   //淘宝
        charset_one: responses.charset_one,                     //关键词1
        charset_two: responses.charset_two,                     //关键词2
        tasktype_name: responses.tasktype_name,                 //任务类型名称
        tasktype_itemname: responses.tasktype_itemname,         //任务平台类型
        keyword_type_name: responses.keyword_type_name,         //"普通五星好评"
        keyword: responses.keyword,                             //搜索关键字
        sortmsg: responses.taskInfo.sortmsg,                    //排序方式
        position: responses.taskInfo.position,                  //排序位置
        goods_address: responses.taskInfo.goods_address,        //商品所在地
        maxprice: responses.taskInfo.maxprice,                  //最高价格
        minprice: responses.taskInfo.minprice,                  //最低价格
        chatpic: responses.chatpic,                             //为1需要聊天
        sku_set: responses.sku_set,                             //sku
        paychannel: responses.taskInfo.paychannel,              //支付方式
        order_id: responses.order_id,                           //订单ID
        is_muti_keyword: responses.is_muti_keyword,             //为 1 的话 标明多关键词，那必须上传三张截图
        pic_uploads_num: responses.pic_uploads_num,             //需要上传的图片张数
        pic_desc: responses.pic_desc,                           //上传图片的描述
        order_message: responses.order_message,                 //订单留言
        remark: responses.taskInfo.remark,                      //商家要求文字
        remark_pic: responses.taskInfo.remark_pic,              //商家要求图片
      })
      if ( responses.taskInfo.remark_pic === "" && responses.taskInfo.remark === "" ) {

      } else {
        this.setState({
          remarks: true,
        })
      }
      // console.log(this.state.sku_set);
      // 处理显示店铺全名
      let shop_name = this.state.shop_name;
      let goodsname = this.state.goodsname;
      if ( shop_name.length >= 3 && goodsname.length >= 4 ) {
        let newShopName = `${shop_name.substring(0,3)}*****`;
        let newGoodsname = `${goodsname.substring(0,4)}*********`;
        this.setState({
          shop_nameaa: newShopName,
          goodsname: newGoodsname,
        })
      }
    })
    .catch(error => {
      // console.log(error);
      if ( error.response.status ) {
        message.warning('服务器开小差啦！！！', 2)
        .then(this.props.history.push('/myTaskDetails'), 2)
      }
    })
  }

  // 多关键词查看示例图
  showOneShiliTu = () => {
    this.setState({
      onevisible: true,
    })
  }

  // 关闭查看示例图
  handleOk = (e) => {
    this.setState({
      onevisible: false,
      visible: false,
    });
  }
  handleCancel = (e) => {
    this.setState({
      onevisible: false,
      visible: false,
    });
  }

  // 上传聊天截图 支付宝账单截图
  onChange = (files, type, index) => {
    // console.log(files);
    this.setState({
      files,
    });
  }

  // 核对商家店铺名是否正确
  heDuiName = () => {
    let inshop_name = this.state.shop_name;
    let getshop_name = this.state.inshop_name;
    // console.log("核对商家店铺名是否正确");
    if ( inshop_name !== undefined && inshop_name === getshop_name ) {
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

  //提交多关键词任务
  submitCharset = () => {
    let thisState = this.state;
    let this_ = this;
    if ( this.state.oks === false ) {
      message.error("请先验证店铺！")
    } else {
      if ( thisState.files.length === 4 ) {
        this_.setState({ animating: true })            //数据提交中显示的login.....
        let imgs = [thisState.files[0].url, thisState.files[1].url, thisState.files[2].url, thisState.files[3].url];
        // console.log(imgs);
        axios.post(global.constants.website+'/api/task/mutikeyword', {
          order_id: thisState.order_id,
          shop_around_content: imgs,
        },{
          headers: {AppAuthorization: localStorage.getItem("token")}    //post 方法传 token
        })
        .then( res => {
          // console.log(res.data);
          if ( res.data.status ) {
            this_.setState({ animating: false })          //数据提交成功关闭login.....
            message.success(res.data.msg)
            this_.props.history.push("/myTask")
          } else {
            this_.setState({ animating: false })          //数据提交成功关闭login.....
            message.error(res.data.msg)
          }
        })
        .catch(error => {
          console.log(error);
        })
      } else {
        if ( thisState.files.length > 4 ) {
          message.error("只能上传4张必要图片")
        } else {
          message.error("请上传图片！")
        }
      }
    }
  }

  render() {
    const { remark_pic,remarks,order_message,remark,paychannel,minprice,maxprice,goods_address,files, animating,datas, platformname, user_taobao, sku_set, charset_two, charset_one, position, sortmsg, keyword, shop_nameaa, goodsname, goodspic, searchprice, itemnum, itemprice, tasktype_name, tasktype_itemname,keyword_type_name } = this.state;
    return(
      <div className="taskStateChild-box">
        <header className="tabTitle">
          <div className="return"><Link to="/myTaskDetails"><Icon type="left" theme="outlined" />返回</Link></div>
          多关键词操作任务
        </header>
        <div>
          <WingBlank style={{ margin: 0 }}>
            {/* 目标商品详情介绍 */}
            <div className="task-plan" style={{ margin:0 }}>
              {/* <div className="plan-box" style={{ marginTop: "2rem" }}>
                <p className="task-plan-list"><span>{shop_name}</span><Link to="/">如果遇到问题点击联系商家</Link></p>
              </div> */}
              <section className="taskDetail-header" style={{ padding:0 }}>
                <p className="taskDetail-header-top" style={{ marginTop: "2rem" }}>
                  <span>目标商品</span>
                </p>
                <div className="taskDetail-header-button">
                  <div style={{ width: '30%' }}>
                    <img src={goodspic} alt="商品图" style={{ width: '100%', paddingRight: '10px' }} />
                  </div>
                  <div style={{ width: '70%' }}>
                    <p style={{ fontWeight:'bold' }}>{goodsname}</p>
                    <p>搜索展示价格：<span>{searchprice}</span></p>
                    <p>商品单件成交价格：<span className="make-num">{itemprice}元</span></p>
                    <p>下单件数：<span className="make-num">{itemnum}件</span></p>
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
              <p className="task-plan-list"><span>任务类型</span><span style={{ color:'red' }}>{tasktype_name}({tasktype_itemname})</span></p>
              <p className="task-plan-list"><span>评价要求</span><span>{keyword_type_name}</span></p>
              <p className="task-plan-list" style={{ border:'none' }}><span>搜索主关键字</span><span style={{ overflow:'auto',wordBreak:'keep-all' }}>{keyword}</span></p>
              <p className="task-plan-list" style={{ border:'none' }}><span>搜索关键字1</span><span style={{ overflow:'auto',wordBreak:'keep-all' }}>{charset_one}</span></p>
              <p className="task-plan-list" style={{ border:'none' }}><span>搜索关键字2</span><span style={{ overflow:'auto',wordBreak:'keep-all' }}>{charset_two}</span></p>
              <p className="task-plan-list-Child"><span>(打开淘宝搜索关键词)</span><span className="fontsi">注：如有关键字过长请左右拖动查看</span></p>
              <p className="task-plan-list"><span>购买数量</span><span>目标商品{itemnum}件</span></p>
              {/* 循环上平规格 */}
              {
                datas ?
                  sku_set.map((item, index) => {
                    return(
                      <p key={index} className="task-plan-list"><span>商品规格：{item.attribute_key}</span><span>{item.attribute_value}</span></p>
                    )
                  })
                :
                  ""
              }
              <p className="task-plan-list"><span>排序方式</span><span>{sortmsg}排序</span></p>
              <p className="task-plan-list"><span>排序位置</span><span>约{position}人收货/付款</span></p>
              <p className="task-plan-list"><span>所在地</span><span>{goods_address? goods_address: "全国"}</span></p>
              <p className="task-plan-list"><span>价格区间</span><span>{maxprice? minprice+"—"+maxprice : "无需筛选价格"}</span></p>
              <p className="task-plan-list"><span>支付方式</span><span>{
                paychannel ?
                  "允许："
                :
                ""
              }
                {
                  paychannel ?
                    paychannel.map((item,index) => {
                      return(
                        <span key={index}>{item},</span>
                      )
                    })
                  :
                  ""
                }
              </span></p>
              <p className="task-plan-list"><span>订单留言</span><span style={{ overflow:'auto',wordBreak:'keep-all' }}>{order_message ? order_message : ""}</span></p>
              <p className="task-plan-list-Child"><span>(查看订单留言)</span><span className="fontsi">注：如内容过长请左右拖动查看</span></p>
            </div>
            {/* 商家要求 */}
            <div className="taskRenw">
              <Icon type="pushpin" theme="outlined" />
              <span>商家要求</span>
            </div>
            <div className="plan-box task-plan" style={{ marginBottom:0 }}>
              <div style={{ fontSize: '1rem' }}>
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
              <p>
                小跳蛙中接手任务的账号和淘宝/天猫上实际下单的账号必须一致，下单不可代付，如果发现直接封号
              </p>
              <p>要求至少和商家客服有4个问题互动，不得一次性复制4个问题给客服，如果客服不在线，等待时间超过10分钟可以留言“先下单了，如果有什么问题可以电话联系”然后直接下单</p>
              <p>严禁和卖家旺旺聊天提“刷单”“信誉”“小跳蛙任务”等敏感词</p>
              <p>淘宝/天猫上实际下单的地址必须和小跳蛙接任务的淘宝账号绑定的地址一致，如收货信息有变更请先更改信息后再接任务</p>
              <p>小跳蛙所有订单不允许使用淘宝客,返利红包 积分等优惠方式下单，出现将会从本金里面扣除返利佣金，两次以上永久封号</p>
              <p>不允许使用信用卡，花呗等任何信用类方式付款，不允许使用集分宝，淘金币，天猫积分等积分抵扣付款金额，否则将会从本金扣除购物金额的1%的手续费或与积分对应的金额，小跳蛙的任务不参与好评返现，如果商家在任务中有要求使用店铺优惠券的可按商家要求领取抵扣的优惠券，返款只返实际支付的金额</p>
              <p>一定要等到快递真实签收后才能确认收货并按照任务的评价要求给予5分好评</p>
            </div>
            {/* 任务步骤 */}
            <div className="taskRenw">
              <Icon type="edit" theme="outlined" />
              <span>任务步骤</span>
            </div>
            <div className="task-plan buzhou" style={{ marginBottom: 0 }}>
              <div className="buzou-title"><span>第一步 货比三家</span><span onClick={this.showOneShiliTu}>点击查看示例</span></div>
              <p>.请确认使用{user_taobao}（{platformname}账号）登入{tasktype_itemname}APP</p>
              <p>.第一个关键词<span className="charsets">（{charset_one}）</span>搜索 找到对应的主宝贝店外截图</p>
              <p>.进店浏览2-3分钟后  收藏主宝贝 退出</p>
              <p>.第二个关键词<span className="charsets">（{charset_two}）</span>搜索 找到对应的主宝贝店外截图</p>
              <p>.进店浏览2-3分钟后  关注（收藏）店铺退出</p>
              <p>.提交任务后等待审核通过,未审核前下单任务无效 </p>
              <p>.审核通过，客服会通知即可用主关键词搜索进店 浏览  拍下产品 提交任务</p>
              <p className="charsets">*请上传必要截（关键词{charset_one}搜索截图），（收藏夹截图），（关键词{charset_two}搜索截图），（关注（收藏）店铺列表截图）4张截图，上传可任意位置。</p>
              <ImagePicker
                length={4}
                files={files}
                multiple={false}
                onChange={this.onChange}
                onImageClick={(index, fs) => console.log(index, fs)}
                selectable={files.length < 4}
              />
              <h3 style={{ color:'#c15958', marginTop:'1.5rem' }}>核对商家店铺名是否正确</h3>
              <div className="shop-title">
                <span>1</span><span>商家店铺名称：{shop_nameaa}</span>
              </div>
              <div className="shop-title">
                <span>2</span>
                <Input onChange={ this.shopName } placeholder="请在此输入店铺名核对" />
                <Button type="primary" onClick={ this.heDuiName }>核对</Button>
              </div>
            </div>
            <Button onClick={ this.submitCharset } type="primary" className="login-form-button">
              提交任务
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
        {/* <LookShiliTu shop_name={shop_name} /> */}
        {/* { datas ? <LookShiliTu history={this.props.history} shop_name={shop_name} order_id={order_id} /> : "" } */}


        {/* 第一步货比三家的图片示例 */}
        <Modal
          visible={this.state.onevisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          maskClosable={true}
          okText={"知道了"}
          cancelText={"关闭"}
        >
          <img className="shilitu" src={require('../../../../img/guanjianci.png')} alt="货比三家" />
        </Modal>
        <Modal
          title="多关键词任务须知"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText={"知道了"}
          cancelText={"关闭"}
        >
          <p>该任务是多关键词任务，需客服审核通过之后才可下单，如直接下单则任务无效。若有疑问请查看示例图或联系平台客服</p>
        </Modal>
      </div>
    )
  }
}

export default TaskStateChilds
