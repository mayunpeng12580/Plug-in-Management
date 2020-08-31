import React, { Component, Fragment} from 'react';

//css
import './index.scss'
//antd
import { Form, Input, Button, Row, Col } from 'antd';
import { UserOutlined, LockOutlined, VerifiedOutlined  } from '@ant-design/icons';
// 组件
import Code from '../../components/code/index'

//验证
import { validate_pass } from '../../utils/validate'

//API
import { Register } from '../../api/account'

//导入密码加密插件
import CryptoJs from 'crypto-js'
class RegisterForm extends Component {
    constructor(){
        super();
        this.state = {
            username:'',
            module:'register'
        }
    }

    onFinish = (values) => {
        let password = CryptoJs.MD5(values.password).toString();
        const requestData = {
            username: values.username,
            password: password,
            code: values.code,
        }
        console.log(requestData);

        Register(requestData)
        .then(res=>{console.log(res)})
        .catch(err=>{
            console.log(err)
            this.toggleForm();
        })
        // console.log('Received values of form: ', values);
      };

    toggleForm = () => {
        this.props.switchForm("login");
      console.log(111)
    }

    //input输入处理
    inputChange = (e) => {
        let value = e.target.value
        this.setState({
          username: value,
        })
    }

    render(){
        
        
        return (
            <Fragment>
                <div className='from-header'>
                        <h4 className="column">注册</h4>
                        <span onClick={this.toggleForm}>登录</span>
                    </div>
                    <div className="form-content">
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={this.onFinish}
                        >
                        <Form.Item
                            name="username"
                            rules={[
                                {
                                    type: 'email',
                                    message: '邮箱格式错误！！！'
                                },{ required: true, message: '邮箱不能为空!' }]}
                        >
                            <Input value={this.state.username} onChange={this.inputChange} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入邮箱" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={
                                [
                                    { required: true, message: '密码不能为空!' },
                                    ({ getFieldValue }) => ({
                                        validator(role, value){
                                            const passwords_value = getFieldValue('passwords');
                                            
                                            if(!validate_pass(value)) {
                                                return Promise.reject('请输入6-20位的数字+字母')
                                            }
                                            if (passwords_value && value !== passwords_value) {
                                                return Promise.reject('两次密码不一致');
                                            }
                                            return Promise.resolve();
                                        }
                                    })
                                ]
                            }
                        >
                            <Input prefix={<LockOutlined  className="site-form-item-icon" />} type="password" placeholder="请输入密码" />
                        </Form.Item>
                        <Form.Item
                            name="passwords"
                            rules={
                                [
                                    { required: true, message: '再次确认密码不能为空!' },
                                    ({ getFieldValue }) => ({
                                        validator(role, value){
                                            if(value !== getFieldValue('password')) {
                                                return Promise.reject('两次密码不一致');
                                            }
                                            return Promise.resolve();
                                        }
                                    })
                                    
                                ]
                            }
                        >
                            <Input prefix={<LockOutlined  className="site-form-item-icon" />} type="password" placeholder="请再次输入密码" />
                        </Form.Item>

                        <Form.Item
                            name="code"
                            rules={[{ required: true, message: '请输入验证码！' },{len: 6,message: '请输入六位验证码！'}]}
                        >
                            <Row gutter={13}>
                                <Col className="gutter-row" span={15}>
                                    <Input prefix={<VerifiedOutlined  className="site-form-item-icon" />} type="password" placeholder="请输入验证码" />
                                </Col>
                                <Col className="gutter-row" span={9}>
                                    <Code module={this.state.module} username={this.state.username}></Code> 
                                </Col>
                            </Row>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" block className="login-form-button">
                            注册
                            </Button>
                        </Form.Item>
                        </Form>
                    </div>
                

                        </Fragment>
        )
    }
}

export default RegisterForm