import React,{ Component } from 'react';
import { Icon,   } from 'antd';
// import { Tabs, WhiteSpace } from 'antd-mobile';
import Tabs from 'antd-mobile/lib/tabs';
import WhiteSpace from 'antd-mobile/lib/white-space';
import { Link  } from 'react-router-dom';

const tabs = [
  { title: '我发起的申诉' },
  { title: '我收到的申诉' },
];

class ShenSu extends Component {
  render() {
    return(
      <div>
        <header className="tabTitle">
          <div className="return"><Link to="/myCenter"><Icon type="left" theme="outlined" />返回</Link></div>
          申诉列表
        </header>
        <WhiteSpace style={{ paddingTop: '3rem' }} />
          <Tabs tabs={tabs} initialPage={0} animated={false} useOnPan={false}>
            {/* 我发起的申诉 */}
            <div style={{ padding: '0.3rem 0.3rem', backgroundColor: '#fff' }}>
              123
            </div>
            {/* 我收到的申诉 */}
            <div style={{ padding: '0.3rem 0.3rem', backgroundColor: '#fff' }}>
              321
            </div>
          </Tabs>
        <WhiteSpace />
      </div>
    )
  }
}

export default ShenSu
