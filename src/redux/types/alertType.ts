import { IAlert } from '../../utils/typeScript'

export const ALERT = 'ALERT'

export interface IAlertType {
    type: typeof ALERT
    payload: IAlert
}