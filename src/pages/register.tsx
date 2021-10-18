import React from 'react'
import { Link, useHistory } from 'react-router-dom'

import RegisterForm from '../components/auth/registerForm'
import LoginSMS from '../components/auth/LoginSMS'

const Register = () => {  
    const history = useHistory() 

    return (
        <div className ='auth_page'>
            <div className="auth_box">
                <h3 className='text-uppercase text-center mb-4'>Đăng Ký</h3>

                <RegisterForm />

                <p className='mt-2'>
                    {`Đã có tài khoản?`}
                    <Link to={`/login${history.location.search}`} style={{color: 'crimson'}}>
                         Đăng nhập ngay
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Register
