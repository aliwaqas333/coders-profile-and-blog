import {
    CREATE_PROPERTY,
    PROPERTY_LOADING,
    DELETE_PROPERTY,
    GET_ALL,
    GET_BY_ID,
} from './types'
import Axios from 'axios'
import setAuthToken from '../utils/setAuthToken'
import jwt_decode from 'jwt-decode'

// export const createPropoerty = (data) => {}
export const getAllProperties = () => async (dispatch) => {
    dispatch(setPropertyLoading())
    try {
        const properties = await Axios.get('/api/property/all')
        console.log('properties', properties.data.properties)
        dispatch({
            type: GET_ALL,
            payload: properties.data.properties,
        })
    } catch (error) {
        console.log(error)
        return false
    }
}
// Adding new property post
export const createPropertyPost = (data) => async (dispatch) => {
    try {
        const res = await Axios.post('/api/property/create', data)
        console.log('res', res.data)
    } catch (error) {
        console.log('error', error.response.data)
    }
}

export const setPropertyLoading = () => {
    return {
        type: PROPERTY_LOADING,
    }
}
