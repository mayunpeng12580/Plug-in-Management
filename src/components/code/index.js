import React, { Component } from 'react';

import { Button, message } from 'antd';

//API
import {  GetCode } from '../../api/account'


//定时器
let timer = null;
class Code extends Component {
    constructor(props){
        super(props);
        this.state = {
            username: this.props.username,
            button_text: '获取验证码',
            code_button_disabled: false,
            code_button_loading: false,
        }
    }

    //获取验证码
    getCode=()=>{
        if (!this.state.username) {
            message.warning('用户名不能为空！！！');
            return false;
        }

        this.setState({
            code_button_loading: true,
            button_text:'发送中'
        })

          const requestData = {
              username: this.state.username,
              module: this.props.module,

          }
          console.log(requestData);
        GetCode(requestData).then((res)=>{
            console.log(res)
            this.countDown();
        }).catch((err)=>{
            console.log(err)
            message.error('发送失败！！！');
            this.setState({
                code_button_loading: false,
                button_text:'重新获取'
            })
        })
      }

      //倒计时
      countDown = () => {
          
          //倒计时时间
          let sec = 5;

          

          //修改状态
            this.setState({
                code_button_loading: false,
                button_text:`${sec}s`,
                code_button_disabled: true,
            })


            //开启计时器
            timer = setInterval(()=>{
            
                if(sec === 0){
                    this.setState({
                        code_button_loading: false,
                        button_text:`重新发送`,
                        code_button_disabled: false,
                    })
                    clearInterval(timer);
                    return;
                }
                this.setState({
                    button_text:`${sec}s`,
                })
                sec--;
              }, 1000)
            
        }

        //prpos变化
        componentWillReceiveProps(value){
            console.log(1111111111)
            console.log(value)
            console.log(1111111111)
            this.setState({
                username:value.username
            })
        }

        //组件销毁
        componentWillUnmount(){
            clearInterval(timer);
        }

    render(){
        const {button_text, code_button_loading, code_button_disabled} = this.state
        return (
            <Button type="danger"  loading={code_button_loading} disabled={code_button_disabled} block onClick={this.getCode} className="login-form-button">
                {button_text}
            </Button> 
        )
    }
}

export default Code