import service from "../../src/utils/request";

// 获取路由列表接口
export function getRoutelist(data){
    return service.request({
        url: 'api/route/getRoutelist/',
        method: 'get',
        // data: data,//请求类型为post时
        params: data //请求类型为get时
    })
}

// 获取路由详情
export function getRoute(data){
    return service.request({
        url: '/getRoute/' + data,
        method: 'get',
        // data: data,//请求类型为post时
        // params: data //请求类型为get时
    })
}

// 增加路由
export function addRoute(data){
    return service.request({
        url: 'api/route/addRoute/',
        method: 'POST',
        data: data,//请求类型为post时
        // params: data //请求类型为get时
    })
}

// 删除路由
export function deleteRoute(data){
    return service.request({
        url: 'api/route/deleteRoute/' + data,
        method: 'get',
        // data: data,//请求类型为post时
        // params: data //请求类型为get时
    })
}

// 编辑路由信息
export function editRoute(data){
    return service.request({
        url: 'api/route/editRoute/',
        method: 'POST',
        data: data,//请求类型为post时
        // params: data //请求类型为get时
    })
}



