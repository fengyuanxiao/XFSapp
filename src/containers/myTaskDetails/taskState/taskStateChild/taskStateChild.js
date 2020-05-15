import React, { Component } from 'react';
import { Icon, message } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';

import LookShiliTu from './lookShiliTu/lookShiliTu';
import './taskStateChild.css';
import '../../../../component/apis';

class TaskStateChild extends Component {
  constructor(props) {
    super();
    this.state = {
      datas: false,
      remark_pic: "此商家没有额外要求",
      remarks: false,                       //判断商家是否有要求
    }
    // console.log(props);
  }

  componentDidMount = () => {
    let this_ = this;
    axios.post(global.constants.website+'/api/task/operateTask',
    {
      order_id: localStorage.getItem("order_id"),   //获取存储到本地的order_id
    },
    {
      headers: {AppAuthorization: localStorage.getItem("token")}    //post 方法传 token
    })
    .then(response => {
      let responses = response.data.data.taskDetail;
      if ( response.data.status === "_0001" ) {
          message.success(response.data.msg, successSkip => {
          localStorage.removeItem("token");
          this_.props.history.push("/");
          window.location.reload();
        })
      } else {
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
        tasktype_name: responses.tasktype_name,                 //任务类型名称
        tasktype_itemname: responses.tasktype_itemname,         //任务平台类型
        keyword_type_name: responses.keyword_type_name,         //"普通五星好评"
        keyword_type: responses.keyword_type,                   //为3优先显示rule
        rule: responses.rule,                                   //keyword_type为3优先显示rule
        charset_one: responses.charset_one,
        charset_two: responses.charset_two,
        user_taobao: responses.user_taobao,                     //买手账号名字
        keyword: responses.keyword,                             //搜索关键字
        sortmsg: responses.taskInfo.sortmsg,                    //排序方式
        position: responses.taskInfo.position,                  //排序位置
        goods_address: responses.taskInfo.goods_address,        //商品所在地
        maxprice: responses.taskInfo.maxprice,                  //最高价格
        minprice: responses.taskInfo.minprice,                  //最低价格
        chatpic: responses.chatpic,                             //为1需要聊天
        sku_set: responses.sku_set,                             //sku
        platformname: responses.platformname,                   //淘宝
        paychannel: responses.taskInfo.paychannel,              //支付方式
        order_id: responses.order_id,                           //订单ID
        task_id: responses.task_id,                             //任务ID
        is_muti_keyword: responses.is_muti_keyword,             //为 1 的话 标明多关键词，那必须上传三张截图
        pic_uploads_num: responses.pic_uploads_num,             //需要上传的图片张数
        pic_desc: responses.pic_desc,                           //上传图片的描述
        order_message: responses.order_message,                 //订单留言
        // remark_pic: responses.remark_pic,                       //商家要求图片
        remark: responses.taskInfo.remark,                      //商家要求文字
        remark_pic: responses.taskInfo.remark_pic,              //商家要求图片
        stayquestion: responses.stayquestion,                   //商家设置的问题
        stay_pic: responses.stay_pic,                           //答案图
        is_staytime: responses.is_staytime,                     //为1说明有商家问题
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
        let newShopName = `${shop_name.substring(0,1)}*****${shop_name.substring(shop_name.length-1)}`;
        let newGoodsname = `${goodsname.substring(0,1)}********${goodsname.substring(goodsname.length-3)}`;
        this.setState({
          shop_namess: newShopName,
          goodsname: newGoodsname,
        })
      }
    }
    })
    .catch(error => {
      // console.log(error.response.status);
      if ( error.response.status ) {
        message.warning('服务器开小差啦！！！', 2)
        .then(this.props.history.push('/myTaskDetails'), 2)
      }
    })

    //发起打标接口
    axios.post(global.constants.website+'/api/task/markingOrder',
    {
      order_id: localStorage.getItem("order_id"),   //获取存储到本地的order_id
    },
    {
      headers: {AppAuthorization: localStorage.getItem("token")}    //post 方法传 token
    })
    .then( res => {
      // console.log(res.data.msg);
    } )
    .catch(error => {
      // console.log(error.response.status);
      if ( error.response.status ) {
        message.warning('服务器开小差啦！！！', 2)
        .then(this.props.history.push('/myTaskDetails'), 2)
      }
    })
  }

  render() {
    const { is_staytime, stay_pic,task_id,stayquestion,rule,keyword_type,remark_pic,remarks,order_message,shop_name,charset_two,charset_one,remark,maxprice,minprice,goods_address,paychannel,chatpic,user_taobao,platformname,platform, pic_desc, pic_uploads_num, is_muti_keyword, sku_set, order_id, datas, position, sortmsg, keyword, shop_namess, goodsname, goodspic, searchprice, itemnum, itemprice, tasktype_name, tasktype_itemname,keyword_type_name } = this.state;
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
              <a href="mqqwpa://im/chat?chat_type=wpa&uin=1243979841&version=1&src_type=web&web_src=qzone.com">如遇到问题点击联系平台客服</a>
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
          <p className="task-plan-list"><span>购买数量</span><span>目标商品{itemnum}件</span></p>
          {/* 循环上平规格 */}
          {
            datas ?
              sku_set.map((item, index) => {
                return(
                  // <p key={index} className="task-plan-list"><span>商品规格：{item.attribute_key}</span><span>{item.attribute_value}</span></p>
                    <p key={index} className="task-plan-list"><span>商品规格：</span>{ keyword_type === '3'? <span>{rule}</span> : <span><span>{item.attribute_key},</span><span>{item.attribute_value},</span></span> }</p>
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
          <p>幸福树中接手任务的账号和淘宝/天猫上实际下单的账号必须一致，下单不可代付，如果发现直接封号</p>
          <p>要求至少和商家客服有4个问题互动，不得一次性复制4个问题给客服，如果客服不在线，等待时间超过10分钟可以留言“先下单了，如果有什么问题可以电话联系”然后直接下单</p>
          <p>严禁和卖家旺旺聊天提“刷单”“信誉”“幸福树任务”等敏感词</p>
          <p>淘宝/天猫上实际下单的地址必须和幸福树接任务的淘宝账号绑定的地址一致，如收货信息有变更请先更改信息后再接任务</p>
          <p>幸福树所有订单不允许使用淘宝客,返利红包 积分等优惠方式下单，出现将会从本金里面扣除返利佣金，两次以上永久封号</p>
          <p>不允许使用信用卡，花呗等任何信用类方式付款，不允许使用集分宝，淘金币，天猫积分等积分抵扣付款金额，否则将会从本金扣除购物金额的1%的手续费或与积分对应的金额，幸福树的任务不参与好评返现，如果商家在任务中有要求使用店铺优惠券的可按商家要求领取抵扣的优惠券，返款只返实际支付的金额</p>
          <p>一定要等到快递真实签收后才能确认收货并按照任务的评价要求给予5分好评</p>
        </div>
        {/* 任务步骤 */}
        <div className="taskRenw">
          <Icon type="edit" theme="outlined" />
          <span>任务步骤</span>
        </div>
        {/* <LookShiliTu shop_name={shop_name} /> */}

        {/* 在此判断是否是浏览任务 任务步骤 lookShiliTu.js */}

        { datas ?
          <LookShiliTu is_staytime={is_staytime} stay_pic={stay_pic} task_id={task_id} stayquestion={stayquestion} shop_name={shop_name} itemprice={itemprice} itemnum={itemnum} chatpic={chatpic} user_taobao={user_taobao} platformname={platformname} tasktype_itemname={tasktype_itemname} platform={platform} goodsname={goodsname} shop_namess={shop_namess} pic_desc={pic_desc} pic_uploads_num={pic_uploads_num} history={this.props.history} is_muti_keyword={is_muti_keyword} order_id={order_id} />
          :
            ""
        }
        </div>
    )
  }
}

export default TaskStateChild
