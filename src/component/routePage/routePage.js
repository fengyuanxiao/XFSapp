// 页面跳转路由
import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch, withRouter, BrowserRouter } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './routePage.css';

// login
import Login from '../../containers/login/login';                                                      //登录页面
import RegisterPage from '../../containers/login/register/register';                                   //注册页面
import ForgetPassword from '../../containers/login/forgetPassword/forgetPassword';                     //忘记密码
// 任务大厅
import TaskHallPage from '../../containers/taskHall/taskHall';                                         //任务大厅
import ActivityPage from '../../containers/taskHall/activity/activity';               //暂时的活动页面
import MyTaskPage from '../../containers/myTask/myTask';                                               //我的任务
import MyCenterPage from '../../containers/myCenter/myCenter';                                         //个人中心
import CashPage from '../../containers/cash/cash';                                                     //提现页面
import CashRecord from '../../containers/cash/cashRecord';                                              //提现记录页面
import CommissionPage from '../../containers/commission/commission';                                   //佣金页面
import MyTaskDetails from '../../containers/myTaskDetails/myTaskDetails';                              //我的详情任务页
import QuestionsTask from '../../containers/myTaskDetails/questionsTask/questionsTask';               //问答任务
  import QuestionsTasks from '../../containers/myTaskDetails/questionsTask/questionsTasks';             //问答任务审核进入页面
import TaskStateChild from '../../containers/myTaskDetails/taskState/taskStateChild/taskStateChild';  //操作任务页面
import TaskStateChilds from '../../containers/myTaskDetails/taskState/taskStateChild/taskStateChilds';  //多关键词操作任务页面
import LookTaskStateChild from '../../containers/myTaskDetails/taskState/taskStateChild/lookTaskStateChild';//浏览任务操作任务页面
import GoodPingJia from '../../containers/myTaskDetails/taskState/goodPingjia/goodPingjia';           //收货好评页面
import TaskPingJia from '../../containers/myTaskDetails/taskState/goodPingjia/taskPingjia';           //指定评价任务
  import AddPingJia from '../../containers/myTaskDetails/taskState/goodPingjia/addPingjia';             //追加评价
import AppealTask from '../../containers/myTaskDetails/taskState/appealTask/appealTask';              //申诉任务页面
  import AppealTaskDetails from '../../containers/myTaskDetails/taskState/appealTask/appealTaskDetails';  //申诉任务详情页面
// 我的任务
import DfTaskNo from '../../containers/myTask/dianFuTask/dfTaskNo';                                   //已接垫付任务  未完成
import DfTaskOk from '../../containers/myTask/dianFuTask/dfTaskOk';                                   //已接垫付任务  已完成
import DfTaskChe from '../../containers/myTask/dianFuTask/dfTaskChe';                                 //已接垫付任务  已撤销
import LiuLanTaskNo from '../../containers/myTask/liuLanTask/liuLanTaskNo';                           //已接浏览任务  未完成
import LiuLanTaskOk from '../../containers/myTask/liuLanTask/liuLanTaskOk';                           //已接浏览任务  已完成
import LiuLanTaskChe from '../../containers/myTask/liuLanTask/liuLanTaskChe';                         //已接浏览任务  已撤销
import PingJiaTaskNo from '../../containers/myTask/pingjia/pingjiaNo';                                //已接评价任务  未完成
import PingJiaTaskOk from '../../containers/myTask/pingjia/pingjiaOk';                                //已接评价任务  已完成
import PingJiaTaskChe from '../../containers/myTask/pingjia/pingjiaChe';                              //已接评价任务  已撤销
import WenDaTaskNo from '../../containers/myTask/wenDaTask/wenDaTaskNo';                              //已接问答任务  未完成
import WenDaTaskOk from '../../containers/myTask/wenDaTask/wenDaTaskOk';                              //已接问答任务  已完成
import WenDaTaskChe from '../../containers/myTask/wenDaTask/wenDaTaskChe';                            //已接问答任务  已撤销
// 个人中心
import BuyAdmin from '../../containers/myCenter/buyAdmin/buyAdmin';                                   //买号管理
  import BindTaobao from '../../containers/myCenter/buyAdmin/taobao/taobao';                            //绑定淘宝账号
    import Correct_taobao from '../../containers/myCenter/buyAdmin/taobao/correct_taobao';                //修改绑定淘宝账号
  import BindJingdong from '../../containers/myCenter/buyAdmin/jingdong/jingdong';                      //绑定京东账号
    import Correct_jingdong from '../../containers/myCenter/buyAdmin/jingdong/correct_jingdong';          //修改绑定京东账号
  import BindPinduoduo from '../../containers/myCenter/buyAdmin/pinduoduo/pinduoduo';                   //绑定拼多多账号
    import Correct_pinduoduo from '../../containers/myCenter/buyAdmin/pinduoduo/correct_pinduoduo';       //修改绑定拼多多的账号
  import BindWinpinhui from '../../containers/myCenter/buyAdmin/weipinhui/weipinhui';                   //绑定唯品会账号
    import Correct_weipinhui from '../../containers/myCenter/buyAdmin/weipinhui/correct_weipinhui';       //修改绑定唯品会账号
  import BindWykl from '../../containers/myCenter/buyAdmin/wykl/wykl';                                  //绑定网易考拉账号
    import Correct_wykl from '../../containers/myCenter/buyAdmin/wykl/correct_wykl';                      //修改绑定网易考拉账号
import AllCenter from '../../containers/myCenter/callCenter/allCenter';                               //客服中心
import Personal from '../../containers/myCenter/personal/personal';                                   //个人信息
import ShenSu from '../../containers/myCenter/shenSu/shenSu';                                         //申诉记录
import TongZhi from '../../containers/myCenter/tongZhi/tongZhi';                                      //通知公告
  // 通知公告子页面 公告详情
  import TongZhiChild from '../../containers/myCenter/tongZhi/tongZhiChild/tongZhiChild';              //公告详情
import TuiJian from '../../containers/myCenter/tuiJian/tuiJian';                                      //推荐有奖
// 个人信息
import Account from '../../containers/myCenter/personal/account/account';                              //修改账号
  import Correct_Account from '../../containers/myCenter/personal/account/correct_account';               //修改账号子集页面
import LoginPassword from '../../containers/myCenter/personal/loginPassword/loginPassword';            //修改登录密码
import TxPassword from '../../containers/myCenter/personal/txPassword/txPassword';                     //修改提现密码
import XgQQ from '../../containers/myCenter/personal/xgQQ/xgQQ';                                       //修改QQ号
import Certification from '../../containers/myCenter/personal/certification/certification';            //实名认证
import Bank from '../../containers/myCenter/personal/bank/bank';                                       //银行卡绑定

//统计代码
// const GetBaidu = props => {
//   let children = props.children;
//   var _hmt = _hmt || [];
//   (function() {
//     var hm = document.createElement("script");
//     hm.src = "https://hm.baidu.com/hm.js?4c7eff31f74db00828abda6a74c101ea";
//     var s = document.getElementsByTagName("script")[0];
//     s.parentNode.insertBefore(hm, s);
//   })();
//   return children;
// };

// const Routes = withRouter(({location}) => (
//   <TransitionGroup className={'router-wrapper'}>
//     <CSSTransition
//       // timeout={{exit:200,enter:300}}
//       timeout={300}
//       appear={true}
//       classNames={'fade'}
//       unmountOnExit={true}
//       key={location.pathname}
//     >
//       <Switch location={location}>
//         <Route exact path="/" component={Login} />
//         <Route path="/registerPage" component={RegisterPage}/>
//         <Route path="/forgetPassword" component={ForgetPassword}/>
//         {/* 任务大厅 */}
//         <Route path="/taskHallPage" component={TaskHallPage} />
//         <Route path="/activity" component={ActivityPage} />
//         <Route path="/myTask" component={MyTaskPage} />
//         <Route path="/myCenter" component={MyCenterPage} />
//         <Route path="/cash" component={CashPage} />
//         <Route path="/cashRecord" component={CashRecord} />
//         <Route path="/commission" component={CommissionPage} />
//         <Route path="/myTaskDetails" component={MyTaskDetails} />
//         <Route path="/questionsTask" component={QuestionsTask} />
//         <Route path="/questionsTasks" component={QuestionsTasks}/>
//         {/* <Route path="/myTaskDetails/:id" component={MyTaskDetails} />     {/*点击抢任务按钮 进入相对应的任务详情页面*/}
//         <Route path="/taskStateChild" component={TaskStateChild}/>
//         <Route path="/taskStateChilds" component={TaskStateChilds}/>
//         <Route path="/lookTaskStateChild" component={LookTaskStateChild}/>
//         <Route path="/goodPingJia" component={GoodPingJia} />
//         <Route path="/taskPingjia" component={TaskPingJia} />
//         <Route path="/addPingJia" component={AddPingJia}/>
//         <Route path="/appealTask" component={AppealTask} />
//         <Route path="/appealTaskDetails" component={AppealTaskDetails} />
//         {/* 我的任务 */}
//         {/* 已接垫付任务 */}
//         <Route path="/dfTaskNo" component={DfTaskNo} />
//         <Route path="/dfTaskOk" component={DfTaskOk} />
//         <Route path="/dfTaskChe" component={DfTaskChe} />
//         {/* 已接浏览任务 */}
//         <Route path="/liuLanTaskNo" component={LiuLanTaskNo} />
//         <Route path="/liuLanTaskOk" component={LiuLanTaskOk} />
//         <Route path="/liuLanTaskChe" component={LiuLanTaskChe} />
//         {/* 已接评价任务 */}
//         <Route path="/pingjiaNo" component={PingJiaTaskNo} />
//         <Route path="/pingjiaOk" component={PingJiaTaskOk} />
//         <Route path="/pingjiaChe" component={PingJiaTaskChe} />
//         {/* 已接问答任务 */}
//         <Route path="/wenDaTaskNo" component={WenDaTaskNo}/>
//         <Route path="/wenDaTaskOk" component={WenDaTaskOk}/>
//         <Route path="/wenDaTaskChe" component={WenDaTaskChe}/>
//         {/* 个人中心 */}
//         <Route path="/buyAdmin" component={BuyAdmin} />
//         <Route path="/taobao" component={BindTaobao}/>
//         <Route path="/correct_taobao" component={Correct_taobao}/>
//         <Route path="/wykl" component={BindWykl}/>
//         <Route path="/correct_wykl" component={Correct_wykl}/>
//         <Route path="/jingdong" component={BindJingdong}/>
//         <Route path="/correct_jingdong" component={Correct_jingdong}/>
//         <Route path="/pinduoduo" component={BindPinduoduo}/>
//         <Route path="/correct_pinduoduo" component={Correct_pinduoduo}/>
//         <Route path="/weipinhui" component={BindWinpinhui}/>
//         <Route path="/correct_weipinhui" component={Correct_weipinhui}/>
//         <Route path="/allCenter" component={AllCenter} />
//         <Route path="/personal" component={Personal} />
//         <Route path="/shenSu" component={ShenSu} />
//         <Route path="/tongZhi" component={TongZhi} />
//         <Route path="/tuiJian" component={TuiJian} />
//         {/* 个人信息 */}
//         <Route path="/account" component={Account} />
//         <Route path="/correct_account" component={Correct_Account}/>
//         <Route path="/loginPassword" component={LoginPassword} />
//         <Route path="/txPassword" component={TxPassword} />
//         <Route path="/xgQQ" component={XgQQ} />
//         <Route path="/certification" component={Certification} />
//         <Route path="/bank" component={Bank} />
//         {/* 通知公告子页面  公告详情 */}
//         <Route path="/tongZhiChild" component={TongZhiChild} />
//       </Switch>
//     </CSSTransition>
//   </TransitionGroup>
// ));


class RouteTabComponents extends Component {
  render() {
    return(
      // <BrowserRouter>
      //   <Routes/>
      // </BrowserRouter>
      <Router>
        <TransitionGroup className={'router-wrapper'}>
          <CSSTransition
            timeout={300}
            classNames="page"
            unmountOnExit
          >
            <div>
              {/* <GetBaidu> */}
              {/* login */}
              <Route exact path="/" component={Login} />
              <Route path="/registerPage" component={RegisterPage}/>
              <Route path="/forgetPassword" component={ForgetPassword}/>
              {/* 任务大厅 */}
              <Route path="/taskHallPage" component={TaskHallPage} />
              <Route path="/activity" component={ActivityPage} />
              <Route path="/myTask" component={MyTaskPage} />
              <Route path="/myCenter" component={MyCenterPage} />
              <Route path="/cash" component={CashPage} />
              <Route path="/cashRecord" component={CashRecord} />
              <Route path="/commission" component={CommissionPage} />
              <Route path="/myTaskDetails" component={MyTaskDetails} />
              <Route path="/questionsTask" component={QuestionsTask} />
              <Route path="/questionsTasks" component={QuestionsTasks}/>
              {/* <Route path="/myTaskDetails/:id" component={MyTaskDetails} />     {/*点击抢任务按钮 进入相对应的任务详情页面*/}
              <Route path="/taskStateChild" component={TaskStateChild}/>
              <Route path="/taskStateChilds" component={TaskStateChilds}/>
              <Route path="/lookTaskStateChild" component={LookTaskStateChild}/>
              <Route path="/goodPingJia" component={GoodPingJia} />
              <Route path="/taskPingjia" component={TaskPingJia} />
              <Route path="/addPingJia" component={AddPingJia}/>
              <Route path="/appealTask" component={AppealTask} />
              <Route path="/appealTaskDetails" component={AppealTaskDetails} />
              {/* 我的任务 */}
              {/* 已接垫付任务 */}
              <Route path="/dfTaskNo" component={DfTaskNo} />
              <Route path="/dfTaskOk" component={DfTaskOk} />
              <Route path="/dfTaskChe" component={DfTaskChe} />
              {/* 已接浏览任务 */}
              <Route path="/liuLanTaskNo" component={LiuLanTaskNo} />
              <Route path="/liuLanTaskOk" component={LiuLanTaskOk} />
              <Route path="/liuLanTaskChe" component={LiuLanTaskChe} />
              {/* 已接评价任务 */}
              <Route path="/pingjiaNo" component={PingJiaTaskNo} />
              <Route path="/pingjiaOk" component={PingJiaTaskOk} />
              <Route path="/pingjiaChe" component={PingJiaTaskChe} />
              {/* 已接问答任务 */}
              <Route path="/wenDaTaskNo" component={WenDaTaskNo}/>
              <Route path="/wenDaTaskOk" component={WenDaTaskOk}/>
              <Route path="/wenDaTaskChe" component={WenDaTaskChe}/>
              {/* 个人中心 */}
              <Route path="/buyAdmin" component={BuyAdmin} />
              <Route path="/taobao" component={BindTaobao}/>
              <Route path="/correct_taobao" component={Correct_taobao}/>
              <Route path="/wykl" component={BindWykl}/>
              <Route path="/correct_wykl" component={Correct_wykl}/>
              <Route path="/jingdong" component={BindJingdong}/>
              <Route path="/correct_jingdong" component={Correct_jingdong}/>
              <Route path="/pinduoduo" component={BindPinduoduo}/>
              <Route path="/correct_pinduoduo" component={Correct_pinduoduo}/>
              <Route path="/weipinhui" component={BindWinpinhui}/>
              <Route path="/correct_weipinhui" component={Correct_weipinhui}/>
              <Route path="/allCenter" component={AllCenter} />
              <Route path="/personal" component={Personal} />
              <Route path="/shenSu" component={ShenSu} />
              <Route path="/tongZhi" component={TongZhi} />
              <Route path="/tuiJian" component={TuiJian} />
              {/* 个人信息 */}
              <Route path="/account" component={Account} />
              <Route path="/correct_account" component={Correct_Account}/>
              <Route path="/loginPassword" component={LoginPassword} />
              <Route path="/txPassword" component={TxPassword} />
              <Route path="/xgQQ" component={XgQQ} />
              <Route path="/certification" component={Certification} />
              <Route path="/bank" component={Bank} />
              {/* 通知公告子页面  公告详情 */}
              <Route path="/tongZhiChild" component={TongZhiChild} />
              {/* </GetBaidu> */}
            </div>
          </CSSTransition>
        </TransitionGroup>
      </Router>
    )
  }
}

export default RouteTabComponents
