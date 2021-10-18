import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { IParams } from '../../utils/typeScript'
import { postAPI } from '../../utils/fetchData'
import { showErrMsg, showSuccessErrMsg } from '../../components/alert/Alert'

const Active = () => {
    const { slug }: IParams = useParams()
    const [err, setErr] = useState('')
    const [success, setSuccess] = useState('')

    useEffect(() => {
        if(slug){
            postAPI('active', { active_token: slug })
            .then(res => setSuccess(res.data.msg))
            .catch(err => setErr(err.respond.data.msg))
        }
    }, [slug])

    console.log(slug)

    return (
        <div>
            { err && showErrMsg(err) }
            { success && showSuccessErrMsg(success) }
        </div>
    )
}

export default Active
