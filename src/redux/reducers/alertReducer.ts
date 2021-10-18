import { ALERT, IAlertType } from '../types/alertType'
import { IAlert} from '../../utils/typeScript'



const alertReducer = (state: IAlert = {}, action: any): IAlert => {
    switch (action.type){
        case ALERT:
            return action.payload
        default:
            return state
    }
}

export default alertReducer;