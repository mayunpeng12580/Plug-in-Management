import React, { Component, Fragment} from 'react';
import { Link, withRouter } from 'react-router-dom'
//router
// import Router from '../../router/index'
import '../../views/index/components/aside.scss'
//antd
import { Menu } from 'antd';

import { getRoutelist } from '@/api/route'

import { UserOutlined, MenuFoldOutlined  } from '@ant-design/icons';

const { SubMenu } = Menu;
class AsideMenu extends Component {
    constructor(props){
        super(props)
        this.state = {
            selectedKeys: [],
            openKeys: [],
            routerArr:[]
        }
    }

    componentDidMount(){
        
        let router = [];
        getRoutelist().then(res => {
            res.data.map((item, index)=> {
                if (item.pid === 0) {
                    router.push(
                        {
                            id: item.id,
                            key: item.path,
                            title: item.title,
                            icon: item.icon,
                            child: []
                        }
                    )
                }
            })
        
            res.data.map((item, index)=> {
                if (item.pid !== 0) {
                    router.map((item2, inx)=> { 
                        if (item2.id == item.pid) { 
                            router[inx].child.push({
                                key: item.path,
                                title: item.title,
                            })
                        }
                    })
                }
            })

            this.setState({
                routerArr: router
            })
        }).catch(err => {console.log(err)})

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
        this.setState({
            openKeys: [openKeys[openKeys.length-1]]
        })
    }

    //子级菜单方法
    renderSubMenu = ({title, key, child}) => {
        console.log(title, key, child)
        return (
                    <SubMenu key={key} icon={<UserOutlined />} title={title}>
                        {
                            child && child.map((item) => {
                                return (
                                    item.child && item.child.length > 0 ? this.renderSubMenu(item) : this.renderMenu(item)
                                    );
                            })
                        }
                        
                    </SubMenu>
        )
    }

    //无子级菜单方法
    renderMenu = ({key, title}) => {
        return (
            <Menu.Item key={key}>
                <Link to={'/'+key}>
                    {title}
                </Link>
            </Menu.Item>
        )
    }

    render () {
        const { selectedKeys, openKeys, routerArr } = this.state
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
                        routerArr && routerArr.map((firstItem, index) => {
                            return firstItem.child.length === 0 ? this.renderMenu(firstItem) : this.renderSubMenu(firstItem);
                        })
                    } 
                </Menu>
            </Fragment> 
        )
    }
}

export default withRouter(AsideMenu)