// register actions
import { GET_ERRORS, SET_CURRENT_USER } from './types'
import Axios from 'axios'
import setAuthToken from '../utils/setAuthToken'
import jwt_decode from 'jwt-decode'

export const registerUser = (userData, history) => (dispatch) => {
    Axios.post('/api/users/register', userData)
        .then((r) => {
            history.push('/signin')
        })
        .catch((err) => {
            console.log('request', err.response.data)

            dispatch({
                type: GET_ERRORS,
                payLoad: err.response.data,
            })
        })
}

// Login  - Get user Token

export const loginUser = (userData, history) => (dispatch) => {
    Axios.post('/api/users/login', userData)
        .then((res) => {
            // save to localstorage
            const { token } = res.data

            // set token to localstorage
            localStorage.setItem('jwtToken', token)

            // set token to Auth Header
            setAuthToken(token)

            // decode token to get user data
            const decoded = jwt_decode(token)

            history.push('/')
            // dipatch an action
            dispatch(setCurrentUser(decoded))
        })
        .catch((err) =>
            dispatch({
                type: GET_ERRORS,
                payLoad: err.response.data,
            }),
        )
}

// set logged in user
export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        payLoad: decoded,
    }
}

export const logoutUser = (history) => (dispatch) => {
    console.log('logoutUser', logoutUser)
    // Remove the token from LS
    localStorage.removeItem('jwtToken')

    // remove auth header for future requests
    setAuthToken(false)

    // set current user to {}
    dispatch(setCurrentUser({}))

    //
    history.push('/signin')
}
