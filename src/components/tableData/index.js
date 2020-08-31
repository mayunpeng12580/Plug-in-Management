import React from 'react'
import { Table } from 'antd';
//api
import { GetList, Delete, Status } from '../../api/department'


class TableComponent extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            pageNumber: 1,
            pageSize: 10,
            tableLoading: false
        }    

    }

    onHandleDelete = () => {
        
    }

    componentDidMount(){
        this.loadData();
        //返回子组件实例
        this.props.onRef(this)
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

    render(){
        const { columns, dataSource, tableLoading } = this.props
        return (
            <Table loading={tableLoading}  columns={columns} dataSource={dataSource}></Table>
        )
    }
}

export default TableComponent
