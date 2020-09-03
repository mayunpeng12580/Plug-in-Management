import React, { Fragment } from 'react';

import { Modal, Button, Form, Input, InputNumber, Tabs, Select } from 'antd';

import { getAuthlist } from '../../api/auth'
import { addUser, getuser, editUser } from '../../api/user'

//导入密码加密插件
import CryptoJs from 'crypto-js'

class UserFrom extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      ModalText: 'Content of the modal',
      visible: this.props.isShow,
      confirmLoading: false,
      Title: '',
      authArr: [],
      password: '',
      name: '',
      auth:null
    };
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  componentDidMount(){
    getAuthlist()
      .then(res => {
        this.setState({
          authArr: res.data
        })
      })
      .catch(err => {
      })
  }

  componentWillReceiveProps(props){
      console.log(props)
      if (props.id !== null) {
        this.getuserDetail(props.id)
      }
      this.setState({
        visible:this.props.isShow,
        Title: props.id ? '编辑用户' : '添加用户',
      })
    
  }

  handleOk = (vlaues) => {
    
  };

  setFieldsValue = () => {

  }

  getuserDetail = (id) => {
    getuser(id)
      .then(res => {
        this.setState({
          name: res.data[0].name,
          password: res.data[0].password,
          auth: res.data[0].auth
        })
        console.log(res.data)
        this.refs.form.setFieldsValue({
          name: res.data[0].name,
          password: res.data[0].password,
          auth: res.data[0].title
        })

      })
      .catch(err => {
        console.log(err)
      })
  }

  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  };

  onFinish = values => {
    console.log(values);
    values.password = CryptoJs.MD5(values.password).toString();

    if (this.props.id !== null) {
      values.id = this.props.id
      editUser(values).then(res => {
        
        this.props.loadList();
        this.setState({
          visible: false,
        });
      })
      .catch(err => {
        console.log(err)
      })
    } else {
      addUser(values)
      .then(res => {
        
        this.props.loadList();
        this.setState({
          visible: false,
        });
      })
      .catch(err => {
        console.log(err)
      })
    }
    

    
  };

  render(h) {

    const {visible, confirmLoading, ModalText, Title, layout, validateMessages, authArr, name, password, auth} = this.state
    return (
          <Fragment>
            <Modal
              title={Title}
              visible={visible}
              onOk={this.onFinish}
              confirmLoading={confirmLoading}
              onCancel={this.handleCancel}
            >
                <Form 
                  labelCol={{ span: 4 }}
                  wrapperCol={{ span: 14 }}
                  onFinish={this.onFinish}
                  ref="form"
                  >
                  <Form.Item label="用户名" name="name">
                    <Input value={name}/>
                  </Form.Item>
                  <Form.Item label="密码" name="password">
                    <Input value={password}/>
                  </Form.Item>
                  <Form.Item label="角色" name="auth">
                    <Select>
                      {
                        authArr.map(item => {
                        return  (<Select.Option value={item.id}>{item.title}</Select.Option>)
                        })
                      }
                      
                    </Select>
                  </Form.Item>
                  <Form.Item >
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </Form.Item>
                </Form>
            </Modal>
          </Fragment>
    )
  }
}


export default UserFrom;