import { Dispatch } from 'redux'
import { AUTH , IAuthType } from '../types/authType'
import { ALERT, IAlertType } from '../types/alertType'

import { IUserLogin, IUserRegister } from '../../utils/typeScript'
import { postAPI, getAPI } from '../../utils/fetchData'
import { validRegister, validPhone } from '../../utils/Valid'
import { CheckTokenExpired } from '../../utils/checkTokenExpired'

export const login = (userLogin: IUserLogin) => async (dispatch: Dispatch<IAuthType | IAlertType>) => {
    try {
        dispatch({ type: ALERT, payload: { loading: true }})

        const res = await postAPI('login', userLogin)

        dispatch({ type:'AUTH', payload: res.data })

        dispatch({ type: ALERT, payload: { success: res.data.msg }})
        localStorage.setItem('logged', 'LongHoangPhamBlog')
        
    } catch (err: any) {
        dispatch({ type: ALERT, payload: { errors: err.response.data.msg }})
    }
}

export const register = (userRegister: IUserRegister) => 
async (dispatch: Dispatch<IAuthType | IAlertType>) => {
    const check = validRegister(userRegister)

    if(check.errLength > 0)
        return dispatch({ type: ALERT, payload: { errors: check.errMsg }})
    console.log(check)
     
    try {
        dispatch({ type: ALERT, payload: { loading: true }})

        const res = await postAPI(`register`, userRegister)
        console.log(res)
        
        dispatch({ type: ALERT, payload: { success: res.data.msg }})
        
    } catch (err: any) {
        dispatch({ type: ALERT, payload: { errors: err.response.data.msg }})
    }
}

export const refreshToken = () => 
async (dispatch: Dispatch<IAuthType | IAlertType>) => {
    const logged = localStorage.getItem('logged')
    if(logged !== 'LongHoangPhamBlog') return;

    try {
        dispatch({ type: ALERT, payload: { loading: true }})

        const res = await getAPI('refresh_token')
        
        dispatch({ type: ALERT, payload: res.data })
        
        dispatch({ type: ALERT, payload: {  }})
    } catch (err: any) {
        dispatch({ type: ALERT, payload: { errors: err.response.data.msg }})
        localStorage.removeItem('logged')
    }
}

export const logout = async (token: string) => 
async (dispatch: Dispatch<IAuthType | IAlertType>) => {
    const result = await CheckTokenExpired(token, dispatch)
    const access_token = result ? result : token

    try {
        localStorage.removeItem('logged')
        dispatch({ type: AUTH, payload: { } })
        await getAPI('logout', access_token)    
        
    } catch (err: any) {
        dispatch({ type: ALERT, payload: { errors: err.response.data.msg }})
    }
}

export const googleLogin = (id_token: string) => 
async (dispatch: Dispatch<IAuthType | IAlertType>) => {
    try {
        dispatch({ type: ALERT, payload: { loading: true }})

        const res = await postAPI('google_login', { id_token })

        dispatch({ type:'AUTH',payload:  res.data })

        dispatch({ type: ALERT, payload: { success: res.data.msg }})
        localStorage.setItem('logged', 'LongHoangPhamBlog')
        
    } catch (err: any) {
        dispatch({ type: ALERT, payload: { errors: err.response.data.msg }})
    }
}

export const facebookLogin = (accessToken: string, userID: string) => 
async (dispatch: Dispatch<IAuthType | IAlertType>) => {
  try {
    dispatch({ type: ALERT, payload: { loading: true } })

    const res = await postAPI('facebook_login', { accessToken, userID })
    
    dispatch({ type: AUTH,payload: res.data })

    dispatch({ type: ALERT, payload: { success: res.data.msg } })
    localStorage.setItem('logged', 'LongHoangPhamBlog')
    
  } catch (err: any) {
    dispatch({ type: ALERT, payload: { errors: err.response.data.msg } })
  }
}

export const loginSMS = (phone: string) => 
async (dispatch: Dispatch<IAuthType | IAlertType>) => {
    const check = validPhone(phone)
    console.log(check)
    if(!check) 
        return dispatch({ 
            type: ALERT, payload: { errors: 'số điện thoại không đúng, xin vui lòng nhập lại!' }
        }); 

    try {
        dispatch({ type: ALERT, payload: { loading: true }})

        const res = await postAPI('login_sms', { phone })

        if(!res.data.valid)
            verifySMS(phone, dispatch)

        
    } catch (err: any) {
        dispatch({ type: ALERT, payload: { errors: err.response.data.msg }})
    }
}

export const verifySMS = async (phone: string, dispatch: Dispatch<IAuthType | IAlertType>) => {

    const code = prompt('Enter your code')
    if(!code) return;

    try {

        dispatch({ type: ALERT, payload: { loading: true }})

        const res = await postAPI('sms_verify', { phone, code })

        dispatch({ type:'AUTH',payload:  res.data })

        dispatch({ type: ALERT, payload: { success: res.data.msg }})
        localStorage.setItem('logged', 'LongHoangPhamBlog')

    } catch (err: any) {
        dispatch({ type: ALERT, payload: { errors: err.response.data.msg }})
        setTimeout(() => {
            verifySMS(phone, dispatch)
        }, 100)
        
    }

    
}

export const forgotPassword = (account: string) => 
async (dispatch: Dispatch<IAuthType | IAlertType>) => {
    
    try {
        dispatch({ type: ALERT, payload: { loading: true }})

        const res = await postAPI('forgot_password', {account})

        // console.log(res)

        dispatch({ type: ALERT, payload: { success: res.data.msg }})
        
    } catch (err: any) {
        dispatch({ type: ALERT, payload: { errors: err.response.data.msg }})
    }
}