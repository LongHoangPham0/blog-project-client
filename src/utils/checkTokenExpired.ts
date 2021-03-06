import jwt_decode from "jwt-decode"
import { getAPI } from './fetchData'

import { AUTH } from '../redux/types/authType'

interface IToken {
    exp: number
    iat: number
    id: string
}

export const CheckTokenExpired = async (token: string, dispatch: any) => {
    const decoded: IToken = jwt_decode(token)
    // console.log(decoded)

    if(decoded.exp >= Date.now() / 1000) return 

    const res = await getAPI('refresh_token')
    dispatch({ type: AUTH, payload: res.data })
    return res.data.access_token
}