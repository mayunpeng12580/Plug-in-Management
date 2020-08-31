import React, { Component, Fragment} from 'react';
import { Link, withRouter } from 'react-router-dom'
//router
import Router from '../../router/index'
import '../../views/index/components/aside.scss'
//antd
import { Menu } from 'antd';

import { UserOutlined, MenuFoldOutlined  } from '@ant-design/icons';

const { SubMenu } = Menu;
class AsideMenu extends Component {
    constructor(props){
        super(props)
        this.state = {
            selectedKeys: [],
            openKeys: []
        }
    }

    componentDidMount(){
        const pathname = this.props.location.pathname;
        const menuKey = pathname.split('/').slice(0, 3).join('/')
        this.setState({
            selectedKeys: [pathname],
            openKeys: [menuKey]
        })
        const MenuHight = {
            selectedKeys: pathname,
            openKeys: menuKey
        }
        this.selectMenuHight(MenuHight)
    }

    //选择菜单
    selectMenu = ({ item, key, keyPath, domEvent }) => {
        const MenuHight = {
            selectedKeys: key,
            openKeys: keyPath[keyPath.length-1]
        }
        this.selectMenuHight(MenuHight)
    }

    //菜单高光
    selectMenuHight = (MenuHight)=> {
        this.setState({
            selectedKeys: [MenuHight.selectedKeys],
            openKeys: [MenuHight.openKeys]
        })
    }

    openMenu = (openKeys) => {
        console.log(openKeys)
        this.setState({
            openKeys: [openKeys[openKeys.length-1]]
        })
    }

    //子级菜单方法
    renderSubMenu = ({title, key, child}) => {
        return (
                    <SubMenu key={key} icon={<UserOutlined />} title={title}>
                        {
                            child && child.map((item) => {
                                return item.child && item.child.length > 0 ? this.renderSubMenu(item) : this.renderMenu(item);
                            })
                        }
                        
                    </SubMenu>
        )
    }

    //无子级菜单方法
    renderMenu = (firstItem) => {
        return (
            <Menu.Item key={firstItem.key}>
                <Link to={firstItem.key}>
                    {firstItem.title}
                </Link>
            </Menu.Item>
        )
    }

    render () {
        const { selectedKeys, openKeys } = this.state
        return (
           <Fragment>
               <h1 className="logo"><span>logo</span></h1>
               <Menu
                    trigger={MenuFoldOutlined}
                    mode="inline"
                    onClick={this.selectMenu}
                    onOpenChange={this.openMenu}
                    // defaultSelectedKeys={['1']}
                    // defaultOpenKeys={['sub1']}
                    selectedKeys={selectedKeys}
                    openKeys={openKeys}
                    style={{ height: '100% - 83px' }}
                    theme='dark'
                >
                    {
                        Router && Router.map((firstItem, index) => {
                            return firstItem.child && firstItem.child.length > 0 ? this.renderSubMenu(firstItem) : this.renderMenu(firstItem)
                        })
                    }
                    
                    
                    
                </Menu>
            </Fragment> 
        )
    }
}

export default withRouter(AsideMenu)