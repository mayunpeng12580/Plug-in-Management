import React, { Component, Fragment} from 'react';

import {  MenuFoldOutlined  } from '@ant-design/icons';

import './aside.scss'

class Header extends Component {
    constructor(props){
        super(props);
        this.state = {
            collapsed : props.collapsed
        }
    }

    toggleMenu = () => {
        console.log(this.props);
        this.props.toggle()
    }

    render (){
        return (
            <Fragment>
                <span onClick={this.toggleMenu} className="collapsed-icon">
                    <MenuFoldOutlined />
                </span>
            </Fragment>
        )
    }
}

export default Header





