import React, { Component } from 'react';
import { Carousel } from 'antd';
import axios from 'axios';

import '../../../component/apis';

class UserCashList extends Component {
  constructor() {
    super();
    this.state = {

    }
  }

  componentDidMount() {
    // let this_ = this;
    axios.get(global.constants.website+'/api/index/withdrawalList',{headers: {AppAuthorization: localStorage.getItem("token")}})   //传入唯一标识
    .then(response => {
      let data_s = response.data.data;
      // console.log(data_s);
      this.setState({
        withdrawalList: data_s,
      })
    })
    .catch(error => {
      console.log(error);
    });
  }

  render() {
    const{ withdrawalList } = this.state;
    // const userNumArr = ["156***1180 提现：50.00元", "187***9110 提现：400.00元", "136***1890 提现：15.00元", "199***8262 提现：99.00元", "186***2250 提现：150.00元"]; //提现用户冒泡数据
    return(//speed={5000}
      <Carousel autoplay={true} dots={false} autoplaySpeed={3000}>
        {
          withdrawalList ?
            withdrawalList.map((item,index) => {
              return (
                <div className="user-cash-list" key={index}>
                  <span>{ item.mobile } 提现：</span>
                  <span>{ item.withdrawal_amount }元</span>
                </div>
              )
            })
          :
          <div className="user-cash-list">
            <h3>没有提现记录！</h3>
          </div>
        }
      </Carousel>
    )
  }
}

export default UserCashList
