// register actions
import { GET_ERRORS } from './types'
import Axios from 'axios'

export const registerUser = (userData) => (dispatch) => {
    Axios.post('/api/users/register', userData)
        .then((r) => {
            console.log('request', r.data)
        })
        .catch((err) => {
            console.log('request', err.response.data)

            dispatch({
                type: GET_ERRORS,
                payLoad: err.response.data,
            })
        })
}
