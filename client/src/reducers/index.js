import { combineReducers } from 'redux'

import authReducer from './authReducer'
import errorReducer from './errorReducer'
import propertyReducer from './propertyReducer'

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    properties: propertyReducer,
})
