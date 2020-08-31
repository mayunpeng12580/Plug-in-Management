import React from 'react'

import TableComponent from '@c/tableData/index'
//
import { Link } from "react-router-dom";
import { Button, Table, Switch, message } from 'antd';

class Entry extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            columns:[
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
            dataSource:[
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
            ]
        }    

    }

    //删除按钮
    onHandleDelete = () => {
        this.tableComponent.onHandleDelete()
    }

    //获取子组件实例
    getChildRef = (ref) => {
        console.log(ref)
        this.tableComponent = ref
    }

    render(){
        const { columns, dataSource } = this.state
        return (
                <TableComponent onRef={this.getChildRef} dataSource={dataSource} columns={columns}></TableComponent>
        )
    }
}

export default Entry