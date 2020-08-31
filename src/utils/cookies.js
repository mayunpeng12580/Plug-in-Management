import cookies from 'react-cookies';

const token = 'adminToken'
const username = 'username'
//存储cookies
export function setToken(value){
     cookies.save(token, value)
}

//获取cookies
export function getToken(value){
    return cookies.load(token)
}

//存储用户名
export function setUsername(value){
     cookies.save(username, value)
}

//获取用户名
export function getUsername(value){
     return cookies.load(username)
 }