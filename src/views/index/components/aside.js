import React, { Component, Fragment} from 'react';
import './aside.scss'

import AsideMenu from '../../../components/asideMenu/index';

class Aside extends Component {
    constructor(props){
        super(props)
        this.state = {

        }
    }

    render () {
        return (
           <Fragment>
               <AsideMenu></AsideMenu>
            </Fragment> 
        )
    }
}

export default Aside