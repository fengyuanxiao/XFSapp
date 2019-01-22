import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon, Button, Input, message } from 'antd';
import axios from 'axios';
import ActivityIndicator from 'antd-mobile/lib/activity-indicator';
import WingBlank from 'antd-mobile/lib/wing-blank';

import './questionsTask.css';
import '../../component/apis';

class QuestionsTasks extends Component {
  constructor(props) {
    super(props);
    this.state= {
      animating: false,
      inputValue: null,         //手动输入收到的问答
    }
    // console.log(props.location.state);
  }

  componentWillMount() {
    let this_ = this;
    axios.post(global.constants.website+'/api/task/askTaskTwo',
    {
      order_id: this_.props.location.state,
    },
    {
      headers: {AppAuthorization: localStorage.getItem("token")}    //post 方法传 token
    })
    .then(function (response) {
      let data_ = response.data.data;
      console.log(data_);
      this_.setState({
        id: data_.order_id,                                   //任务ID
        goodsname: data_.goodsname,                     //商品名称
        goodspic: data_.goodspic,                       //商品图片
        questype: data_.questype,                       //问题类型
        quescontent: data_.quescontent,                 //问题内容
        question_content: data_.question_content,       //买手自己提交的问题
        answer_pic_content: data_.answer_pic_content,   //商家给定的答案截图
        check_question: data_.check_question,           //买手选中的问题
      })
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  //手动输入收到的问答
  onInputValue = (e) => {
    this.setState({
      inputValue: e.target.value
    })
  }

  // 提交商家审核按钮
  submitBtn = () => {
    let _this = this.state;
    let this_ = this;
    console.log(_this.id);
    if ( _this.inputValue === null ) {
      message.error("请输入问答链接")
    } else {
      this_.setState({ animating: true })            //数据提交中显示的login.....
      axios.post(global.constants.website+'/api/task/sublink',{
        order_id: _this.id,                       //任务ID
        answer_link: _this.inputValue,                 //买手在商家问题列表中选择自己收到的问题
      },{
        headers: {AppAuthorization: localStorage.getItem("token")}    //post 方法传 token
      })
      .then( res => {
        console.log(res.data);
        if ( res.data.status ) {
          this_.setState({ animating: false })          //数据提交成功关闭login.....
          this_.props.history.push("/wenDaTaskNo");
          message.success(res.data.msg);
        } else {
          this_.setState({ animating: false })          //数据提交成功关闭login.....
          message.error(res.data.msg);
        }
      })
      .catch( err => {
        console.log(err);
      })
    }

  }


  render() {
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };
    const { check_question,answer_pic_content,question_content,goodsname,goodspic,quescontent,questype,animating } = this.state;
    return(
      <div>
        <header className="tabTitle">
          <div className="return"><Link to="/taskHallPage"><Icon type="left" theme="outlined" />返回</Link></div>
          问答任务
        </header>
        <div>
          <WingBlank style={{ margin: '0' }}>
            <div className="questionsTask-box">
              <div className="product-details">
                <div style={{ width: '30%' }}>
                  <img style={{ maxWidth: '100%',paddingRight: '0.5rem' }} src={goodspic} alt="产品主图"/>
                </div>
                <p style={{ width: '70%' }}>{goodsname}</p>
              </div>
              <div className="taskList">
                {
                  questype === 1 ?
                    <div>
                      <p className="centerTitle">商家自己发布的问题列表</p>
                      <p className="zhongs">（我选中的问题是）：{check_question}</p>
                      <div style={{ width: '100%', wordBreak: 'keep-all', overflow: 'auto',marginLeft: '0.9rem' }}>
                        {
                          quescontent.map((item, index) => {
                            return(
                              <p key={index} style={radioStyle} value={item}>{item}</p>
                            )})
                        }
                      </div>
                    </div>
                  :
                  <div>
                    <p className="centerTitle">淘宝发布的问题</p>
                    <p style={{ padding: '0.5rem 0', fontSize: '1rem' }}>{question_content}</p>
                  </div>
                }
              </div>
              <p className="fontTu">一、商家给定的答案截图</p>
              <img className="photos_a" src={answer_pic_content} alt="答案截图"/>
              <p className="fontTu">二、请按照商家给的答案回答提问并分享链接!</p>
              <Input onChange={ this.onInputValue } style={{ margin: '0 0 1rem 0', width: '100%' }} placeholder="在此输入对应淘宝问答链接" />
            </div>
            <Button onClick={ this.submitBtn } className="btn-buy" type="primary">点击提交商家审核</Button>
            <div className="toast-example">
              <ActivityIndicator
                toast
                text="数据提交中..."
                animating={animating}
              />
            </div>
          </WingBlank>
        </div>
      </div>
    )
  }
}
export default QuestionsTasks
