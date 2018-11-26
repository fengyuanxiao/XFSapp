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
    this.showDrawer = this.showDrawer.bind(this);
    this.onClose = this.onClose.bind(this);
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

    return(
      <section className="taskDetail-state">
        <img src={require('../../../img/icon2.png')} alt="taobaoImg" />
        <span style={{ fontSize: '1rem' }}>任务状态：带操作 </span>
        <span style={{ color: 'red' }}>提交倒计时：<b>00:00:00</b> (未在截止时间之前提交将扣1元手续费)</span>
        <p>商家要求: 此商家没有额外要求</p>
        <p>订单要求：此订单无需留言</p>
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
