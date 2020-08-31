import React, { Component, Fragment} from 'react';
import { withRouter } from 'react-router-dom';

//css
import './index.scss'
//验证
import { validate_password } from '../../utils/validate'
//antd
import { Form, Input, Button, Row, Col } from 'antd';
import { UserOutlined, LockOutlined, VerifiedOutlined  } from '@ant-design/icons';
//API
import { Login } from '../../api/account'

// 组件
import Code from '../../components/code/index'

//seeion方法
import { setToken, setUsername } from '../../utils/cookies'

//导入密码加密插件
import CryptoJs from 'crypto-js'
class LoginForm extends Component {
    constructor(){
        super();
        this.state = {
            username: '',
            code_button_disabled: false,
            code_button_loading: false,
            code_button_text: '获取验证码',
            module: 'login',
            loading: false
        }
    }

    onFinish = (values) => {
        let password = CryptoJs.MD5(values.password).toString();
        const requestData = {
            username: values.username,
            password: password,
            code: values.code,
        }
        this.setState({
            loading: true
            
        })
        Login(requestData).then(res=>{
            console.log(res)
            this.setState({
                loading: false
                })
        }).catch(err=>{
            console.log(err);
            this.setState({
            loading: false
            })

            // 保存token
            setToken('adminToken');
            setUsername('username')

            //路由跳转
            this.props.history.push('/index')
        })
        // console.log('Received values of form: ', values);
      };

      //提交表单信息
      toggleForm = () => {
          this.props.switchForm("register");
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
        
        const { username } = this.state;

        return (
            <Fragment>
                <div className='from-header'>
                        <h4 className="column">登录</h4>
                        <span onClick={this.toggleForm}>账号注册</span>
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
                            rules={
                                [
                                    { 
                                        required: true, 
                                        message: '邮箱不能为空！！!' 
                                    },
                                    {
                                        type: 'email',
                                        message: '邮箱格式错误！！！'
                                    },
                                    
                                ]
                            }
                        >
                            <Input value={username} onChange={this.inputChange} prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={
                                [
                                    { 
                                        required: true, 
                                        message: '密码不能为空！！！' 
                                    },
                                    // ({ getFieldValue }) => ({
                                    //     validator(rule, value) {
                                    //     if (value.length < 6) {
                                    //         return Promise.reject('不能小于6位！！');
                                    //     } else {
                                    //         return Promise.resolve();
                                    //     }

                                    //     },
                                    // }),
                                    { 
                                        min: 6, 
                                        message: '不能小于6位！！!' 
                                    }
                                    ,
                                    { 
                                        max: 20, 
                                        message: '不能大于20位！！!' 
                                    },
                                    {
                                        pattern: validate_password, message: '请输入数字加字母'
                                    }
                                ]
                            }
                        >
                            <Input prefix={<LockOutlined  className="site-form-item-icon" />} type="password" placeholder="字母+数字，大于6位小于20位" />
                        </Form.Item>

                        <Form.Item
                            name="code"
                            rules={[{ required: true, message: '验证码不能为空!' },{len:6,message: '请输入长度为六位的验证码！！'}]}
                        >
                            <Row gutter={13}>
                                <Col className="gutter-row" span={15}>
                                    <Input prefix={<VerifiedOutlined  className="site-form-item-icon" />} type="text" placeholder="Code" />
                                </Col>
                                <Col className="gutter-row" span={9}>
                                    <Code  module={this.state.module} username={username}></Code>
                                </Col>
                            </Row>
                        </Form.Item>

                        <Form.Item>
                            <Button loading={this.state.loading} type="primary" htmlType="submit" block className="login-form-button">
                            登录
                            </Button>
                        </Form.Item>
                        </Form>
                    </div>
                

                        </Fragment>
        )
    }
}

export default withRouter(LoginForm)
