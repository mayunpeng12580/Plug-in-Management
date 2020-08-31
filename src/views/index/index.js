import React, { Component} from 'react';

//css
import './layout.scss'

// 侧边栏组件
import Aside from './components/aside'
import HeaderNav from './components/header'

import ContainerMain from '../../components/containerMain/index'

//anted
import { Layout } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

class Index extends Component {
    constructor(props){
        super(props);
        this.state = {
            collapsed: false
        }
    }

    componentDidMount(){
        const collapsed = JSON.parse(sessionStorage.getItem('collapsed'))
        this.setState({ collapsed })
    }

    toggleCollapsed = () => {
        const collapsed = !this.state.collapsed
        this.setState({ collapsed })
        sessionStorage.setItem('collapsed', collapsed)



    }

    render (){
        return (
            <Layout className="layout-wrap">
                <Sider  collapsed={this.state.collapsed} widt="250px">
                    <Aside ></Aside>
                </Sider>
                <Layout>
                    <Header className="layout-header">
                        <HeaderNav toggle={this.toggleCollapsed}></HeaderNav>
                    </Header>
                    <Content className="layout-content">
                        <ContainerMain />
                    </Content>
                    <Footer>Footer</Footer>
                </Layout>
            </Layout>
        )
    }
}

export default Index

