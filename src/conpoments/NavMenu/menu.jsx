import React from 'react';
import { Menu, Button } from 'antd';
import '../../css/menu.css'

const { SubMenu } = Menu;

export default class NavMenu extends React.Component {
  state = {
    current: 'mail',
    status: 2
  };

  handleClick = e => {
    console.log('click ', e);
    this.setState({ current: e.key });
  };

  render() {
    const { current,status } = this.state;
    return (
      <div className="menu">
        <div className="nav_menu">
          <Menu onClick={this.handleClick} selectedKeys={[current]} mode="horizontal" theme="dark"  >
              <SubMenu key="sub1" title="赛事名称" className="sub1">
                  <Menu.Item key="1">编辑</Menu.Item>
                  <Menu.Item key="2">新建</Menu.Item>
                  <Menu.Divider />
                  <Menu.Item key="3">赛事名称1</Menu.Item>
                  <Menu.Item key="4">赛事名称2</Menu.Item>
              </SubMenu>
              
              <SubMenu key="sub2" title={`报名（${status === 1 ? '开始报名' : status === 2 ? '进行中' : '已结束'}）`}>
                  {
                    status === 1 ? <Menu.Item key="match_status">未开始</Menu.Item> :  status === 2 ? <Menu.Item key="match_status">查看-结束报名</Menu.Item> : <Menu.Item key="match_status">查看</Menu.Item>
                  }
              </SubMenu>
          </Menu>
        </div>
        <div className="btn">
             <Button type="primary" className="btn_run">运行</Button>
        </div>
     </div>
    );
  }
}

