import React, { Component} from 'react';

// import { Divider } from 'antd';

//组件导入
import LoginForm from './loginForm'
import RegisterForm from './registerForm'
class Login extends Component {
    constructor(){
        super();
        this.state = {
            formType: 'login'
        }
    }

    switchForm = (value) => {
        this.setState({
            formType:value
        })
        console.log(value)
    }
    

    render(){
        return (
            <div className='from-wrap'>
                <div>
                    { this.state.formType === "login" ? <LoginForm switchForm={this.switchForm}></LoginForm> : <RegisterForm switchForm={this.switchForm}></RegisterForm> }
                </div>
            </div>
        )
    }
}

export default Login