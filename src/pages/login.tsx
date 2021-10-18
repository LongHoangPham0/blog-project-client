import React, { useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'

import LoginPass from '../components/auth/LoginPass'
import LoginSMS from '../components/auth/LoginSMS'
import SocialLogin from '../components/auth/socialLogin'

import { RootStore } from '../utils/typeScript'

const Login = () => {
    const [sms, setSms] = useState(false)
    const history = useHistory()

    const { auth } = useSelector((state: RootStore) => state)

    useEffect(() => {
        if(auth.access_token){
            let url = history.location.search.replace('?', '/')
            return history.push(url)
        }
    },[auth.access_token, history])

    return (
        <div className ='auth_page'>
            <div className="auth_box">
                <h3 className='text-uppercase text-center mb-4'>Đăng Nhập</h3>

                <SocialLogin />

                {sms ? <LoginSMS /> : <LoginPass />}

                <small className='row my-2 text-primary' style={{cursor: 'pointer'}}>

                    <span className='col-6'>
                    <Link to='/forgot_password' className='col-6'>
                        Quên mật khẩu?
                    </Link>
                    </span>
                   
                    <span className='col-6 text-center' onClick={() => setSms(!sms)}>
                        {sms ? 'Đăng nhập bằng mật khẩu' : 'Đăng nhập bằng SMS'}
                    </span>
                </small>

                <p>
                    {`Bạn chưa có tài khoản?`}
                    <Link to={`/register${history.location.search}`} style={{color: 'crimson'}}>
                         Đăng ký 
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Login
