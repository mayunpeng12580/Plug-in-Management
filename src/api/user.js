import service from "../../src/utils/request";

// 获取用户列表接口
export function getUserlist(data){
    return service.request({
        url: 'api/user/getUserlist/',
        method: 'get',
        // data: data,//请求类型为post时
        params: data //请求类型为get时
    })
}

// 获取用户详情
export function getuser(data){
    return service.request({
        url: 'api/user/getUser/' + data,
        method: 'get',
        // data: data,//请求类型为post时
        // params: data //请求类型为get时
    })
}

// 增加用户
export function addUser(data){
    return service.request({
        url: 'api/user/addUser/',
        method: 'POST',
        data: data,//请求类型为post时
        // params: data //请求类型为get时
    })
}

// 删除用户
export function deleteUser(data){
    return service.request({
        url: 'api/user/deleteUser/' + data,
        method: 'get',
        // data: data,//请求类型为post时
        // params: data //请求类型为get时
    })
}

// 编辑用户信息
export function editUser(data){
    return service.request({
        url: 'api/user/editUser/',
        method: 'POST',
        data: data,//请求类型为post时
        // params: data //请求类型为get时
    })
}