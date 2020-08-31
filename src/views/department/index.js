import React, { Component, Fragment} from 'react';

//
import { Link } from "react-router-dom";

//antd
import { Form, Input, Button, Table, Switch, message, Modal } from 'antd';

//api
import { GetList, Delete, Status } from '../../api/department'
class DepartmentIndex extends Component {
    constructor(props){
        super(props);
        this.state = {
            switchId: '',
            columns: [
                {title: '部门名称', dataIndex: 'name', key:'name'},
                {title: '禁启用', dataIndex: 'status', key:'status',
                    render: (text, rowData)=> { return <Switch loading={rowData.id == this.state.switchId} onChange={()=>{this.onHandleSwitch(rowData)}} checkedChildren="开启" unCheckedChildren="关闭" defaultChecked={rowData.status} />}},
                {title: '人员数量', dataIndex: 'number', key:'number'},
                {title: '操作', dataIndex: 'operation', key:'operation', width: '215px', 
                    render: (text, rowData) => {
                        return (
                            <div className="inline-button">
                                
                                <Button type='primary' ><Link to={{pathname: '/index/department/add', state:{id: rowData.id}}} >编辑</Link></Button>
                                <Button onClick={()=>this.onHandleDelete(rowData.id)}>删除</Button>
                            </div>
                        )
                    }
                },
                
            ],
            dataSource: [
                {
                    id: '1',
                    name: '张三',
                    number: '200',
                    status: true,
                },
                {
                    id: '2',
                    name: '张三',
                    number: '200',
                    status: false,
                },
            ],
            pageNumber:1,
            pageSize:10,
            keyWork:'',
            //复选框数据
            selectedRowKeys: [],
            visible: false,
            id: '',
            confirmLoading: false,
            tableLoading:false

        }

        
    }
      
        onFinish = values => {
          console.log('Finish:', values);
            this.setState({
                keyWork: values.departmentname,
                pageNumber:1,
                pageSize:10,
            })
            this.loadData(values);
        };

        //删除
        onHandleDelete = (id) => {
            //批量删除
            if (!id) { 
                if (this.state.selectedRowKeys.length === 0) { return false }
                console.log(this.state.selectedRowKeys)
                id = this.state.selectedRowKeys.join()
            } 

            //按钮单个删除
            this.setState({
                visible: true,
                id: id
            })
            console.log(id)
            
        }

        //生命周期挂载完成
        componentDidMount(){
            this.loadData();
        }

        //请求部门列表数据
        loadData = () => {
            const requestData = {
                pageNumber: this.state.pageNumber,
                pageSize: this.state.pageSize
            }
            if (this.state.keyWork){
                requestData.name = this.state.keyWork
            }
            this.setState({
                tableLoading: true
            })
            GetList(requestData)
            .then(res => {

            })
            .catch( err => {
                this.setState({
                    tableLoading: false
                })
                console.log(err)
            })
        }

        //复选框方法
        onCheckbox = (selectedRowKeys) => {
            console.log(selectedRowKeys)
            this.setState({
                selectedRowKeys
            })
        }

        //隐藏modal
          hideModal = () => {
            this.setState({
              visible: false,
            });
          };

          //modal点击确认时
          modalThen = () => {

            this.setState({
                visible: false,
                confirmLoading: true
              });
              Delete(this.state.id)
              .then(res => {
                  message.success('删除成功！！！')
                  this.loadData();
                  this.setState({
                    confirmLoading: false,
                    id:'',
                    selectedRowKeys: []
                  });
              })
              .catch(err => {
                  console.log(err)
                  message.error('删除失败！！！')
                  this.setState({
                    confirmLoading: false,
                    id:'',
                    selectedRowKeys: []
                  });
              })
          }

        //禁用启用api
          onHandleSwitch = (data) => {
            this.setState({
                switchId: data.id
            })
            Status({id: data.id,status:data.status})
                .then(res => {

                })
                .catch(err => {
                    this.setState({
                        switchId:''
                    })
                    console.log(err)
                })
          }


    render (){
        const {columns, dataSource} = this.state
        const rowSelection = {
            onChange: this.onCheckbox
        }
        return (
            <Fragment>
                <Form  name="horizontal_login" layout="inline" onFinish={this.onFinish}>
                    <Form.Item
                    label="部门名称"
                    name="departmentname"
                    >
                        <Input placeholder="请输入部门名称" />
                    </Form.Item>
                    
                    <Form.Item shouldUpdate>
                        {() => (
                        <Button
                            type="primary"
                            htmlType="submit"
                        >
                            搜索
                        </Button>
                        )}
                    </Form.Item>
                    </Form>
                    <div className="table-wrap">
                    <Table loading={this.state.tableLoading} rowSelection={rowSelection} rowKey='id' bordered columns={columns} dataSource={dataSource}>

                    </Table>
                    <Button onClick={()=>{this.onHandleDelete()}} type='primary'>批量删除</Button>
                    </div>
                    <Modal

                    title="提示"
                    visible={this.state.visible}
                    onOk={this.modalThen}
                    onCancel={this.hideModal}
                    okText="确认"
                    cancelText="取消"
                    confirmLoading={this.state.confirmLoading}
                    >
                    <p className="text-center">确定删除此条信息?<span className="color-red">删除后将无法回复.</span></p>
                    </Modal>
            </Fragment>
        )
    }
}

export default DepartmentIndex