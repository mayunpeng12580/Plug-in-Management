import service from "../../src/utils/request";

// 获取角色列表接口
export function getAuthlist(data){
    return service.request({
        url: 'api/auth/getAuthlist/',
        method: 'get',
        // data: data,//请求类型为post时
        params: data //请求类型为get时
    })
}

// 获取角色详情
export function getAuth(data){
    return service.request({
        url: '/getAuth/' + data,
        method: 'get',
        // data: data,//请求类型为post时
        // params: data //请求类型为get时
    })
}

// 增加角色
export function addAuth(data){
    return service.request({
        url: 'api/auth/addAuth/',
        method: 'POST',
        data: data,//请求类型为post时
        // params: data //请求类型为get时
    })
}

// 删除角色
export function deleteAuth(data){
    return service.request({
        url: 'api/auth/deleteAuth/' + data,
        method: 'get',
        // data: data,//请求类型为post时
        // params: data //请求类型为get时
    })
}

// 编辑角色信息
export function editAuth(data){
    return service.request({
        url: 'api/auth/editAuth/',
        method: 'POST',
        data: data,//请求类型为post时
        // params: data //请求类型为get时
    })
}