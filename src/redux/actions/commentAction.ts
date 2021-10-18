import { Dispatch } from "redux"

import { ALERT, IAlertType } from '../types/alertType'
import { 
    CREATE_COMMENT, 
    ICreateCommentType, 
    GET_COMMENTS, 
    IGetCommentsType,
    REPLY_COMMENT,
    IReplyCommentType,
    UPDATE_COMMENT,
    UPDATE_REPLY,
    IUpdateCommentType,
    DELETE_COMMENT,
    DELETE_REPLY,
    IDeleteCommentType
} from "../types/commentType"

import { IComment } from "../../utils/typeScript"
import { postAPI, getAPI, patchAPI, deleteAPI } from "../../utils/fetchData"
import { CheckTokenExpired } from "../../utils/checkTokenExpired"

export const createComment = (data: IComment, token: string) => 
async(dispatch: Dispatch<IAlertType | ICreateCommentType>) => {
    const result = await CheckTokenExpired(token, dispatch)
    const access_token = result ? result : token

    try {
        await postAPI('comment', data, access_token)

        // dispatch({
        //     type: CREATE_COMMENT,
        //     payload: { ...res.data, user: data.user }
        // })

    } catch (err: any) {
        dispatch({ type: ALERT, payload: { errors: err.response.data.msg } })
    }
}

export const getComments = (id: string, num: number) => 
async(dispatch: Dispatch<IAlertType | IGetCommentsType>) => {
    try {
        let limit = 4

        const res = await getAPI(`comments/blog/${id}?page=${num}&limit=${limit}`)
        
        dispatch({
            type: GET_COMMENTS,
            payload: {
                data: res.data.comments,
                total: res.data.total
            }
        })
        
    } catch (err: any) {
        dispatch({ type: ALERT, payload: { errors: err.response.data.msg } })
    }
}

export const replyComment = (data: IComment, token: string) => 
async(dispatch: Dispatch<IAlertType | IReplyCommentType>) => {
    const result = await CheckTokenExpired(token, dispatch)
    const access_token = result ? result : token

    try {
        await postAPI('reply_comment', data, access_token)

        // dispatch({
        //     type: REPLY_COMMENT,
        //     payload: { ...res.data, user: data.user, reply_user: data.reply_user }
        // })

    } catch (err: any) {
        dispatch({ type: ALERT, payload: { errors: err.response.data.msg } })
    }
}

export const updateComment = (data: IComment, token: string) => 
async(dispatch: Dispatch<IAlertType | IUpdateCommentType>) => {
    const result = await CheckTokenExpired(token, dispatch)
    const access_token = result ? result : token

    try {
        dispatch({
            type: data.comment_root ? UPDATE_REPLY : UPDATE_COMMENT,
            payload: data
        })

        await patchAPI(`comment/${data._id}`, { data }, access_token)

    } catch (err: any) {
        dispatch({ type: ALERT, payload: { errors: err.response.data.msg } })
    }
}

export const deleteComment = (data: IComment, token: string) => 
async(dispatch: Dispatch<IAlertType | IDeleteCommentType>) => {
    const result = await CheckTokenExpired(token, dispatch)
    const access_token = result ? result : token

    try {
        dispatch({
            type: data.comment_root ? DELETE_REPLY : DELETE_COMMENT,
            payload: data
        })

        await deleteAPI(`comment/${data._id}`, access_token)

    } catch (err: any) {
        dispatch({ type: ALERT, payload: { errors: err.response.data.msg } })
    }
}