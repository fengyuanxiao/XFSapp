import React, { Component } from 'react';

import axios from 'axios';
import './taskHall.css';
import RouteTabComponent from '../../component/routeTab/routeTab';  //tabs
import TaskList from './taskList/tiskList';

class TaskHallPage extends Component {

  //上传电话号码，和手机app
  // componentDidMount() {
  //   let appList = localStorage.getItem("appList");//应用程序列表
  //   let phoneNumArr = localStorage.getItem("phoneNumArr");//获取储存本地手机号码
  //
  //   // 储存永久时间到本地
  //   if (localStorage.getItem("dateNum") === null) {
  //     localStorage.setItem("dateNum", 1)        //只调用一次获取电话号码接口
  //     function getNowFormatDate() {
  //         var date = new Date();
  //         var seperator1 = "-";
  //         var year = date.getFullYear();
  //         var month = date.getMonth() + 1;
  //         var strDate = date.getDate();
  //         if (month >= 1 && month <= 9) {
  //             month = "0" + month;
  //         }
  //         if (strDate >= 0 && strDate <= 9) {
  //             strDate = "0" + strDate;
  //         }
  //         var currentdate = year + seperator1 + month + seperator1 + strDate;
  //         return currentdate;
  //     }
  //     localStorage.setItem("getNowFormatDate", getNowFormatDate())
  //     // console.log(getNowFormatDate());
  //   }
  //   // 需要每天获取的时间
  //   function getNewFormatDate() {
  //       var date = new Date();
  //       var seperator1 = "-";
  //       var year = date.getFullYear();
  //       var month = date.getMonth() + 1;
  //       var strDate = date.getDate();
  //       if (month >= 1 && month <= 9) {
  //           month = "0" + month;
  //       }
  //       if (strDate >= 0 && strDate <= 9) {
  //           strDate = "0" + strDate;
  //       }
  //       var currentdate = year + seperator1 + month + seperator1 + strDate;
  //       return currentdate;
  //   }
  //
  //   //时间字符串的格式：月-日-年
	// 		var date1 = localStorage.getItem("getNowFormatDate");
	// 		var date2 = getNewFormatDate();
  //
	// 		//讲时间字符串转化为距离1970年1月1日午夜零时的时间间隔的毫秒数
	// 		var time1 = Date.parse(date1);
	// 		var time2 = Date.parse(date2);
  //
	// 		//讲两个时间相减，求出相隔的天数
	// 		var dayCount = (Math.abs(time2 - time1))/1000/60/60/24;
  //     if (dayCount === 30) {
  //       localStorage.removeItem("dateNum");     //到了30天将储存到本地的永久时间删除
  //       axios.post(global.constants.website+'/api/index/apps',
  //         {
  //           app_info: JSON.parse(appList),             //应用程序列表
  //           platform: localStorage.getItem("platform"),             //1安卓 2ios
  //         },
  //         {
  //           headers: {AppAuthorization: localStorage.getItem("token")}    //post 方法传 token
  //         })
  //         .then(res => {
  //           if (res.status) {
  //             // console.log('是否安装应用程序:'+res.data.msg);
  //           }
  //         })
  //         .catch(err => {
  //           console.log(err);
  //         })
  //     }
	// 		console.log(dayCount);
  //
  //
  //   //获取电话簿  ***只调用一次
  //   // localStorage.removeItem("phonesNum");
  //   if (localStorage.getItem("phonesNum") === null) {
  //     axios.post(global.constants.website+'/api/index/contact',
  //       {
  //         mobile: [phoneNumArr],             //获取储存本地手机号码
  //       },
  //       {
  //         headers: {AppAuthorization: localStorage.getItem("token")}    //post 方法传 token
  //       })
  //       .then(res => {
  //         if (res.status) {
  //           localStorage.setItem("phonesNum", 1)        //只调用一次获取电话号码接口
  //           // console.log("手机号码"+res.data.msg);
  //         }
  //       })
  //       .catch(err => {
  //         console.log(err);
  //       })
  //
  //     // 上传手机已安装引用程序
  //     axios.post(global.constants.website+'/api/index/apps',
  //       {
  //         app_info: localStorage.getItem("platform") === "1" ? JSON.parse(appList) : JSON.parse(localStorage.getItem("IOSappLists")),             //应用程序列表
  //         platform: localStorage.getItem("platform"),             //1安卓 2ios
  //       },
  //       {
  //         headers: {AppAuthorization: localStorage.getItem("token")}    //post 方法传 token
  //       })
  //       .then(res => {
  //         if (res.status) {
  //           // console.log('是否安装应用程序:'+res.data.msg);
  //         }
  //       })
  //       .catch(err => {
  //         console.log(err);
  //       })
  //   }
  //
  //   // console.log(localStorage.getItem("appList"));
  //   // console.log(localStorage.getItem("phoneNumArr"));
  // }
  // 处理内存泄露
  componentWillUnmount = () => {
    this.setState = (state,callback)=>{
      return;
    };
  }

  // 点击小钱包进入推荐有礼页面
  clickTuiJian = () => {
    this.props.history.push("/tuiJian")
  }

  render() {

    return(
      <div>
        <header className="tabTitle" style={{ position: 'inherit' }}>任务大厅</header>
        {/* 任务列表 toke={ this.props.location.state.token }  */}
        <TaskList history ={this.props.history} />
        {/* tabs */}
        <RouteTabComponent />
        {/* // <img className="getJinagli" onClick={ this.clickTuiJian } src={ require("../../img/download.gif") } alt="小钱包"/> */}
      </div>
    )
  }
}

export default TaskHallPage
