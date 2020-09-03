import React, { Component, Fragment} from 'react';

import {  MenuFoldOutlined  } from '@ant-design/icons';
import { withRouter } from 'react-router-dom'

import './aside.scss'

import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { Modal, Button } from 'antd';

class Header extends Component {
    constructor(props){
        super(props);
        this.state = {
            collapsed : props.collapsed,
            visible: false
        }
    }

    toggleMenu = () => {
        console.log(this.props);
        this.props.toggle()
    }

    menu = () => {
        return (
            <Menu>
              <Menu.Item danger onClick={this.onhandelShow}>退出</Menu.Item>
            </Menu>
          );
    } 

    onhandelShow = () => {
        
        this.setState({
            visible: true,
        })
    }

    handleOk = e => {
        console.log(e);
        this.props.history.push({ pathname: '/'})
        this.setState({
          visible: false,
        });
      };
    
      handleCancel = e => {
        console.log(e);
        this.setState({
          visible: false,
        });
      };
      

    render (){
        return (
            <Fragment>
                <span onClick={this.toggleMenu} className="collapsed-icon">
                    <MenuFoldOutlined />
                </span>
                <Dropdown overlay={this.menu} className="setting">
                    <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                    Hover me <DownOutlined />
                    </a>
                </Dropdown>
                <Modal
                    title="系统提示"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    >
                    <p>您确定要退出登录吗？</p>
                    </Modal>
            </Fragment>
        )
    }
}

export default withRouter(Header);

