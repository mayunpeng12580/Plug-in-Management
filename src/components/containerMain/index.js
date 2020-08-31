import React, {Fragment} from 'react';

import { Switch } from 'react-router-dom'

// //用户
// import User from '../../views/user/index'
// import UserAdd from '../../views/user/add'

// //部门
// import DepartmentList from '../../views/department/index'
// import DepartmentAdd from '../../views/department/add'
//私有组件
import PrivateRoute from '../privateRouter/index'

//自动化工程
import comments from '../../components/containerMain/components'

class ContainerMain extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  render() {
    return (
        <Fragment>
            <Switch>
                {
                    comments.map(item => {
                        return <PrivateRoute key={item.path} path={item.path} component={item.component}  exact ></PrivateRoute>
                    })
                }
                {/* <PrivateRoute path="/index/user/index" component={User}  exact ></PrivateRoute>
                <PrivateRoute path="/index/user/add" component={UserAdd}  exact></PrivateRoute>
                <PrivateRoute path="/index/department/index" component={DepartmentList}  exact></PrivateRoute>
                <PrivateRoute path="/index/department/add" component={DepartmentAdd}  exact></PrivateRoute> */}
            </Switch>
        </Fragment>
    )
  }
}


export default ContainerMain;
