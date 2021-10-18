import React from 'react'
import { useParams } from 'react-router-dom'

import { IParams } from '../../utils/typeScript'

import CreateBlog from '../create_blog' 

const UpdateBlog = () => {
    //get ID blog
    const { slug } = useParams<IParams>()

    return <CreateBlog id={slug} />
}

export default UpdateBlog
