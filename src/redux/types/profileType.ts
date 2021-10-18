import { IUser } from '../../utils/typeScript'

export const GET_OTHER_INFO = 'GET_OTHER_INFO'

export interface IGetOtherInfoType {
    type: typeof GET_OTHER_INFO,
    payload: IUser
}