import React, { Fragment } from 'react';

import { Modal, Button, Form, Input, InputNumber, Tabs, Select } from 'antd';

import { getAuthlist } from '../../api/auth'

class UserFrom extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      ModalText: 'Content of the modal',
      visible: this.props.isShow,
      confirmLoading: false,
      Title: '',
      authArr: []
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
    
    this.setState({
      visible:this.props.isShow,
      Title: props.id ? '编辑用户' : '添加用户',
      
    })
  }

  handleOk = (vlaues) => {
    // this.setState({
    //   ModalText: 'The modal will be closed after two seconds',
    //   confirmLoading: true,
    // });
    console.log(vlaues)
    // setTimeout(() => {
    //   this.setState({
    //     visible: false,
    //     confirmLoading: false,
    //   });
    // }, 2000);
  };

  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  };

  // onFinish = values => {
  //   console.log(values);
  // };

  render(h) {

    const {visible, confirmLoading, ModalText, Title, layout, validateMessages, authArr} = this.state
    return (
          <Fragment>
            <Modal
              title={Title}
              visible={visible}
              // onOk={this.handleOk}
              confirmLoading={confirmLoading}
              onCancel={this.handleCancel}
            >
                <Form 
                  labelCol={{ span: 4 }}
                  wrapperCol={{ span: 14 }}
                  onFinish={this.handleOk}
                  >
                  <Form.Item label="用户名" name="name">
                    <Input />
                  </Form.Item>
                  <Form.Item label="密码" name="password">
                    <Input />
                  </Form.Item>
                  <Form.Item label="角色" name="auth">
                    <Select >
                      {
                        authArr.map(item => {
                        return  (<Select.Option value={item.id}>{item.title}</Select.Option>)
                        })
                      }
                      
                    </Select>
                  </Form.Item>
                </Form>
            </Modal>
          </Fragment>
    )
  }
}


export default UserFrom;