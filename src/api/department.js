import service from "../../src/utils/request";

// 新增部门接口
export function DepartmentAddApi(data){
    return service.request({
        url: '/department/add',
        method: 'POST',
        data: data,//请求类型为post时
        // params: data //请求类型为get时
    })
}


// 获取部门列表接口
export function GetList(data){
    return service.request({
        url: '/department/list',
        method: 'POST',
        data: data,//请求类型为post时
        // params: data //请求类型为get时
    })
}

// 删除部门接口
export function Delete(data){
    return service.request({
        url: '/department/delete',
        method: 'POST',
        data: data,//请求类型为post时
        // params: data //请求类型为get时
    })
}

// 部门禁启用接口
export function Status(data){
    return service.request({
        url: '/department/status',
        method: 'POST',
        data: data,//请求类型为post时
        // params: data //请求类型为get时
    })
}

// 部门详情接口
export function Detailed(data){
    return service.request({
        url: '/department/detail',
        method: 'POST',
        data: data,//请求类型为post时
        // params: data //请求类型为get时
    })
}

// 部门编辑接口
export function Edit(data){
    return service.request({
        url: '/department/edit',
        method: 'POST',
        data: data,//请求类型为post时
        // params: data //请求类型为get时
    })
}

