import React, { Component } from 'react';
import { Carousel } from 'antd';

class UserCashList extends Component {

  render() {

    const userNumArr = ["156***1180 提现：50.00元", "187***9110 提现：400.00元", "136***1890 提现：15.00元", "199***8262 提现：99.00元", "186***2250 提现：150.00元"]; //提现用户冒泡数据
    return(
      <Carousel autoplay={true} dots={false}>
          {
            userNumArr.map((item,index) => {
              return (
                <div className="user-cash-list" key={index}>
                  <h3>{ item }</h3>
                </div>
              )
            })
          }
      </Carousel>
    )
  }
}

export default UserCashList
