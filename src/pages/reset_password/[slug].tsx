import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { IParams, FormSubmit } from '../../utils/typeScript'

import { resetPassword } from '../../redux/actions/userAction'

export const ResetPassword = () => {
    const token = useParams<IParams>().slug
    const dispatch = useDispatch()

    const [password, setPassword] = useState('')
    const [cf_password, setCfPassword] = useState('')
    const [typePass, setTypePass] = useState(false)
    const [typeCfPass, setTypeCfPass] = useState(false)

    const handleSubmit = (e: FormSubmit) => {
        e.preventDefault()
        dispatch(resetPassword(password, cf_password, token))
    }

    return (
        <div className='auth_page'>
            <form className='auth_box' onSubmit={handleSubmit}>
                <h3 className='text-uppercase text-center mb-4'> 
                    Thay đổi mật khẩu
                </h3>
                <div className="form-group my-2">
                    <label htmlFor="password" className="form-label">Mật khẩu</label>
                    
                    <div className="pass">
                        <input type={typePass ? "text" : "password"} className='form-control' 
                        id='password' name='password' value={password} 
                        onChange={(e => setPassword(e.target.value))} 
                        placeholder='Nhập tối thiểu 6 ký tự'
                        />

                        <small onClick={() => setTypePass(!typePass)}>
                            {typePass ? 'Ẩn' : 'Hiện'}
                        </small>
                    </div>   
                </div>

                <div className="form-group my-2">
                    <label htmlFor="password" className="form-label"> Xác nhận mật khẩu</label>
                    
                    <div className="pass">
                        <input type={typeCfPass ? "text" : "password"} className='form-control' 
                        id='password' name='password' value={cf_password} 
                        onChange={(e => setCfPassword(e.target.value))} 
                        placeholder='Nhập tối thiểu 6 ký tự'
                        />

                        <small onClick={() => setTypeCfPass(!typeCfPass)}>
                            {typeCfPass ? 'Ẩn' : 'Hiện'}
                        </small>
                    </div>   
                </div>

                <button type='submit' className='btn btn-dark w-100 mt-2'>
                    Đăng ký
                </button>
            </form>
        </div>
            
    )
}

export default ResetPassword