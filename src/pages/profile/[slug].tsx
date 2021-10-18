import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { IParams, RootStore } from '../../utils/typeScript'

import UserInfo from '../../components/profile/userInfo'
import OtherInfo from '../../components/profile/otherInfo'
import UserBlogs from '../../components/profile/userBlogs';

const Profile = () => {
    const { slug }: IParams = useParams()
    const { auth } = useSelector((state: RootStore) => state)

    console.log({userID: slug})

    return (
        <div className='row my-3'>
            <div className="col-md-5 mb-3">
                {
                    auth.user?._id === slug ? <UserInfo /> : <OtherInfo id={slug} />
                }
            </div>

            <div className="col-md-7">
                <UserBlogs />
            </div>
        </div>
    )
}

export default Profile
