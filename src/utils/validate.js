//正则
export const reg_password = /(?![0-9]+$)(?![a-zA-Z]+$)[0-9a-zA-Z]{6,20}$/;


// 密码验证
export const validate_password = reg_password;

// 密码验证
export function validate_pass(value){
    return reg_password.test(value);
}
