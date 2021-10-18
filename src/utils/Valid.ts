import { IUserRegister, IBlog } from './typeScript'

export const validRegister = ( userRegister: IUserRegister) => {
    const { name, account, password, cf_password } = userRegister;
    const errors: string[] = [];

    if(!name) {
        errors.push('Vui lòng nhập họ và tên.')
    }else if(name.length > 20) {
        errors.push('Họ và tên chỉ dài tối đa 20 ký tự!') 
    }

    if(!account) {
        errors.push('Nhập địa chỉ email hoặc số điện thoại.')
    }else if(!validPhone(account) && !validateEmail(account)) {
        errors.push('Địa chỉ email hoặc số điện thoại không đúng, xin vui lòng nhập lại!') 
    }

    const msg = checkPassword(password, cf_password)
    if(msg) errors.push(msg)
    
    return {
        errMsg: errors,
        errLength: errors.length
    }  
}

export const checkPassword = (password: string, cf_password: string) => {
    if(password.length < 6){
        return ("Mật khẩu phải dài ít nhất 6 ký tự!")
    }else if(password !== cf_password){
        return ('Mật khẩu không trùng khớp, xin hãy nhập lại!')
    }
}

export function validPhone(phone: string) {
    const re = /^[+]/g
    return re.test(phone)
}
  
export function validateEmail(email: string) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

//Valid Blog
export const validCreateBlog = ({
    title, content, description, thumbnail, category
}: IBlog) => {
    const err: string[] = []

    if(title.trim().length < 10){
        err.push('Tiêu đề phải dài ít nhất 10 ký tự.')
    }else if(title.trim().length > 50){
        err.push('Tiêu đề chỉ dài tối đa 50 ký tự.')
    }

    if(content.trim().length < 50){
        err.push('Nội dung phải dài ít nhất 50 ký tự.')
    }else if(content.trim().length > 2000){
        err.push('Nội dung chỉ dài tối đa 2000 ký tự.')
    }

    if(description.trim().length < 10){
        err.push('Mô tả phải dài ít nhất 10 ký tự.')
    }else if(description.trim().length > 2000){
        err.push('Mô tả chỉ dài tối đa 2000 ký tự.')
    }

    if(!thumbnail){
        err.push('Ảnh không được để trống.')
    }

    if(!category){
        err.push('Thể loại không được để trống.')
    }

    return {
        errMsg: err,
        errLength: err.length
    }
    
}

// Shallow equality
export const shallowEqual = (object1: any, object2: any) => {
    const keys1 = Object.keys(object1)
    const keys2 = Object.keys(object2)

    if(keys1.length !== keys2.length) {
        return false
    }

    for(let key of keys1) {
        if(object1[key] !== object2[key]){
            return false
        }
    }

    return true
}