import React, { Component } from 'react';
import { Icon, } from 'antd';
import { Link } from 'react-router-dom';

import LookShiliTu from './lookShiliTu/lookShiliTu';
import './taskStateChild.css';

class TaskStateChild extends Component {
  // constructor(props, context) {
  //   super(props, context);
  //   console.log(props);
  // }

  render() {

    return(
      <div className="taskStateChild-box">
        <header className="tabTitle">
          <div className="return"><Link to="/myTaskDetails"><Icon type="left" theme="outlined" />返回</Link></div>
          操作任务
        </header>
        {/* 目标商品详情介绍 */}
        <div className="task-plan" style={{ margin:0 }}>
          <div className="plan-box">
            <p className="task-plan-list" style={{ marginTop: '2rem' }}><span>京*旗舰店</span><Link to="/">如果遇到问题点击联系商家</Link></p>
          </div>
          <section className="taskDetail-header" style={{ padding:0 }}>
            <p className="taskDetail-header-top">
              <span>目标商品</span>
            </p>
            <div className="taskDetail-header-button">
              <img src={require('../../../../img/custom-qq_03.png')} alt="商品图" style={{ width:"90px",height:"90px" }} />
              <div>
                <p>飞鹤奶***************** 三段</p>
                <p>搜索展示价格：<span>90.00元</span></p>
                <p>商品单件成交价格：<span className="make-num">100.00元</span></p>
                <p>下单件数：<span className="make-num">1件</span></p>
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
          <p className="task-plan-list"><span>任务类型</span><span style={{ color:'red' }}>垫付任务(手机淘宝)</span></p>
          <p className="task-plan-list"><span>评价要求</span><span>普通五星好评</span></p>
          <p className="task-plan-list" style={{ border:'none' }}><span>搜索关键字</span><span style={{ overflow:'auto',wordBreak:'keep-all' }}>宝宝奶地方地方地方地方地方发粉</span></p>
          <p className="task-plan-list-Child"><span>(打开淘宝搜索关键词)</span><span style={{ color:'red',fontWeight:'bold' }}>注：如有关键字过长请左右拖动查看</span></p>
          <p className="task-plan-list"><span>购买数量</span><span>目标商品1件</span></p>
          <p className="task-plan-list"><span>排序方式</span><span>销量排序</span></p>
          <p className="task-plan-list"><span>排序位置</span><span>约100人收货/付款</span></p>
          <p className="task-plan-list"><span>所在地</span><span>全国</span></p>
          <p className="task-plan-list"><span>价格区间</span><span>无需筛选价格</span></p>
          <p className="task-plan-list"><span>订单留言</span><span></span></p>
        </div>
        {/* 商家要求 */}
        <div className="taskRenw">
          <Icon type="pushpin" theme="outlined" />
          <span>商家要求</span>
        </div>
        <div className="plan-box task-plan" style={{ marginBottom:0 }}>
          <p className="task-plan-list"><span style={{ color:'red' }}>商家要求：</span><span style={{ width: '70%',textAlign:'initial'}}>此商家电饭锅三个三个问过问个</span></p>
        </div>
        {/* 注意事项 */}
        <div className="taskRenw">
          <Icon type="exclamation-circle" theme="outlined" />
          <span>注意事项</span>
        </div>
        <div className="task-plan detailss" style={{ marginBottom:0 }}>
          <p>
            小浣熊中接手任务的账号和淘宝/天猫上实际下单的账号必须一致，下单不可代付，如果发现直接封号
          </p>
          <p>要求至少和商家客服有4个问题互动，不得一次性复制4个问题给客服，如果客服不在线，等待时间超过10分钟可以留言“先下单了，如果有什么问题可以电话联系”然后直接下单</p>
          <p>严禁和卖家旺旺聊天提“刷单”“信誉”“小浣熊任务”等敏感词</p>
          <p>淘宝/天猫上实际下单的地址必须和小浣熊接任务的淘宝账号绑定的地址一致，如收货信息有变更请先更改信息后再接任务</p>
          <p>小浣熊所有订单不允许使用淘宝客,返利红包 积分等优惠方式下单，出现将会从本金里面扣除返利佣金，两次以上永久封号</p>
          <p>不允许使用信用卡，花呗等任何信用类方式付款，不允许使用集分宝，淘金币，天猫积分等积分抵扣付款金额，否则将会从本金扣除购物金额的1%的手续费或与积分对应的金额，小浣熊的任务不参与好评返现，如果商家在任务中有要求使用店铺优惠券的可按商家要求领取抵扣的优惠券，返款只返实际支付的金额</p>
          <p>一定要等到快递真实签收后才能确认收货并按照任务的评价要求给予5分好评</p>
        </div>
        {/* 任务步骤 */}
        <div className="taskRenw">
          <Icon type="edit" theme="outlined" />
          <span>任务步骤</span>
        </div>
        <LookShiliTu />
      </div>
    )
  }
}

export default TaskStateChild
