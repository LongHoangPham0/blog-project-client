import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { RootStore } from '../../utils/typeScript'
import { logout } from '../../redux/actions/authAction'

const Menu = () => {
    const { auth } = useSelector((state: RootStore) => state)
    const dispatch = useDispatch()

    const { pathname } = useLocation()

    const bfLoginLinks = [
        { label: 'Đăng nhập', path: '/login' },
        { label: 'Đăng ký', path: '/register'}
    ]

    const afLoginLinks = [
        { label: 'Trang chủ', path: '/login' },
        { label: 'Tạo Blog', path: '/create_blog'}
    ]

    const navLinks = auth.access_token ? afLoginLinks : bfLoginLinks;

    const isActive = (pn: string) => {
        if(pn === pathname) return 'active';
    }

    const handleLogout = () => {
        if(!auth.access_token) return
        dispatch(logout(auth.access_token))
    }

    return (
        <ul className="navbar-nav ms-auto" >
            {
                navLinks.map((link, index) => (
                    <li key={index} className={`nav-item ${isActive(link.path)}`}>
                            <Link className='nav-link' to={link.path}>{link.label}</Link>
                    </li>
                ))
            }

            {
                //Only admin can access this function
                auth.user?.role === 'admin' &&
                <li className={`nav-item ${isActive('/category')}`}>
                    <Link to='/category' className='nav-link'>Tạo thể loại</Link>
                </li>
            }

            {
                auth.user &&
                <li className="nav-item dropdown">
                  <span className="nav-link dropdown-toggle" id="navbarDropdown" role="button" 
                  data-bs-toggle="dropdown" aria-expanded="false">
                    <img src={auth.user.avatar} alt="avatar" className="avatar" />
                  </span>

                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <li>
                            <Link className="dropdown-item" to={`/profile/${auth.user._id}`}>
                                Thông tin cá nhân
                            </Link>
                        </li>
                            <li><hr className="dropdown-divider" /></li>
                        <li>
                            <Link className="dropdown-item" to="/"
                            onClick={handleLogout}>
                                Đăng xuất
                            </Link>
                        </li>
                    </ul>
            </li>
            }

            

        </ul>
    )
}

export default Menu
