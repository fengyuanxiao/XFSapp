import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Drawer, Button, Menu, Icon, message } from 'antd';

class TaskState extends Component {
  constructor(props, context) {
    super(props, context);
    // console.log(props);
    this.state = {
      visible: false,
      collapsed: false,
      itme_key: null    //用户取消任务选取的 key值
    }
  }

  componentDidMount() {
    //待操作任务倒计时
    let time = this.props.time;   //获取父组件父组件传递拖来的时间戳
    let this_ = this;
    const timer=setInterval(function(){
        var hour=0, minute=0, second=0;//时间默认值
        if(time > 0){
            hour = Math.floor(time / (60 * 60));
            minute = Math.floor(time / 60) - (hour * 60);
            second = Math.floor(time) - (hour * 60 * 60) - (minute * 60);
        }

        if (hour <= 9) hour = '0' + hour;
        if (minute <= 9) minute = '0' + minute;
        if (second <= 9) second = '0' + second;
        //
        const cuttime = hour+":"+minute+":"+second;
        // console.log(cuttime);
        // 时时更换的时间
        this_.setState({
          cuttime: cuttime
        })
        time--;
    },1000);
    if( time <= 0 ){
        clearInterval(timer);
    }
  }
  componentWillUnmount = () => {
    this.setState = (state,callback)=>{
      return;
    };
}

  showDrawer = () => {
    this.setState({
      visible: true
    })
  }
  // 取消任务的 取消按钮
  onClose = () => {
    this.setState({
      visible: false,
    });
    console.log("点击了取消");
  };
  // 取消任务的 确认按钮
  onConfirm = () => {
    if ( this.state.itme_key === null ) {
      message.error("请选择原因再确认")
    } else {
      this.setState({
        visible: false,
      });
      message.success("取消成功！");
      console.log(this.state.itme_key);
    }
  }

  render() {
    //存父组件传来的数据
    const { tasktype_pic, ordertatusText, order_message } = this.props;
    const { cuttime } = this.state;
    return(
      <section className="taskDetail-state">
        <img src={tasktype_pic} alt="taobaoImg" />
        <span style={{ fontSize: '1rem' }}>任务状态：{ordertatusText} </span>
        <span style={{ color: 'red' }}>提交倒计时：<b>{cuttime}</b> (未在截止时间之前提交将扣1元手续费)</span>
        <p>商家要求: 此商家没有额外要求</p>
        <p>订单要求：{order_message}</p>
        <div className="start-task-btn">
          <button onClick={this.showDrawer}>取消任务</button>
          <button><Link to="/taskStateChild">操作任务</Link></button>
          <button><Link to="/appealTask">申诉任务</Link></button>
        </div>
        <Drawer
          title="取消任务"
          width={"90%"}
          placement="right"
          onClose={this.onClose}
          maskClosable={false}
          visible={this.state.visible}
          style={{
            height: 'calc(100% - 55px)',
            overflow: 'auto',
            paddingBottom: 53,
            padding:0
          }}>
          <Menu
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="white"
          inlineCollapsed={this.state.collapsed}
          onClick={item => {this.setState({itme_key: item.key})}}  //取消任务选项获取key值 传给后台
        >
          <Menu.Item key="1">
            <Icon type="pie-chart" theme="twoTone" />
            <span>商品找不到</span>
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="stop" theme="twoTone" />
            <span>用户主动撤销，不想做了</span>
          </Menu.Item>
          <Menu.Item key="3">
            <Icon type="frown" theme="twoTone" />
            <span>达不到商家备注要求</span>
          </Menu.Item>
          <Menu.Item key="4">
            <Icon type="tool" theme="twoTone" />
            <span>问题任务</span>
          </Menu.Item>
        </Menu>
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              width: '100%',
              borderTop: '1px solid #e8e8e8',
              padding: '10px 16px',
              textAlign: 'right',
              left: 0,
              background: '#fff',
              borderRadius: '0 0 4px 4px',
            }}>
            <Button style={{ marginRight: 8,}} onClick={this.onClose}>取消</Button>
            <Button onClick={this.onConfirm} type="primary">确认</Button>
          </div>
        </Drawer>
      </section>
    )
  }
}

export default TaskState
