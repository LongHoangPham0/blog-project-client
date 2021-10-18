import { useSelector } from 'react-redux'
import { RootStore } from '../../utils/typeScript';

import Loading from './Loading'
import Toast from './Toast'

export const Alert = () => {
    const { alert } = useSelector((state: RootStore) => state)

    return (
        <div>
            { alert.loading && <Loading />}

            { alert.errors && <Toast title='OOPS!' body={ alert.errors } bgColor='bg-danger' />}

            { alert.success && <Toast title='Thành công' body={ alert.success } bgColor='bg-success' />}
        </div>
    )
}

export const showErrMsg = (msg: string) => {
    return <div className='errMsg'>{ msg }</div>
}

export const showSuccessErrMsg = (msg: string) => {
    return <div className='successMsg'>{ msg }</div>
}
