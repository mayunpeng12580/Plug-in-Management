import React, { Fragment } from 'react';

import UserFrom from './form'

import { getUserlist } from '../../api/user';

import { Table, Tag, Space, Button, Input, Row, Col, Modal } from 'antd';
const { Search } = Input;



class User extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      dataSource: [
        {
          id: '1',
          name: '胡彦斌',
          title: '管理员',
        }
      ],
      columns: [
        {
          title: 'id',
          dataIndex: 'id',
          key: 'id',
          render: text => <a>{text}</a>,
        },
        {
          title: '名称',
          dataIndex: 'name',
          key: 'name',
          render: text => <a>{text}</a>,
        },
        {
          title: '角色',
          dataIndex: 'title',
          key: 'title',
          render: text => <a>{text}</a>,
        },
        {
          title: '操作',
          dataIndex: 'operation',
          key: 'operation',
          render: (text, rowData) => {
            return (

                <div className="inline-button">
                    
                    <Button type='primary' >
                      编辑
                      {/* <Link to={{pathname: '/index/department/add', state:{id: rowData.id}}} >编辑</Link> */}
                      </Button>
                    <Button onClick={()=>this.onHandleDelete(rowData.id)}>删除</Button>
                </div>
            )
          }
        }
      ],
      formIsShow: false
    };
  }

  componentDidMount () {
    getUserlist().then(res => {
      console.log(res.data);
      this.setState({
        dataSource: res.data
      })
    }).catch(err => {

    })

  }

  onHandleAdd = () => {
    console.log('add')
    this.setState({
      formIsShow: true
    })
  }
  

  onHandleDelete = (id) => {
    console.log(id)
  }

  render() {
    const { dataSource, columns, formIsShow } =this.state
    return (
        <Fragment>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col span={5} >
              <Search
                placeholder="请输入用户名"
                enterButton="Search"
                size="mini"
                loading={false}
                onSearch={value => console.log(value)}
              />
            </Col>
            <Col span={10}>
                <Button  type='primary' onClick={this.onHandleAdd}>添加</Button>
            </Col>
          </Row>
          <Table dataSource={dataSource} columns={columns} />

          {/* 弹出层 */}
          <UserFrom isShow={formIsShow}></UserFrom>
          
        </Fragment>
    )
  }
}


export default User;