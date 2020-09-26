import {
    CREATE_PROPERTY,
    DELETE_PROPERTY,
    GET_ALL,
    GET_BY_ID,
    PROPERTY_LOADING,
} from '../actions/types'

const initialState = {
    properties: [],
    property: {},
    loading: false,
}
export default function (state = initialState, action) {
    switch (action.type) {
        case PROPERTY_LOADING:
            return {
                ...state,
                loading: true,
            }
        case GET_ALL:
            return {
                ...state,
                properties: action.payload,
                loading: false,
            }
        case GET_BY_ID:
            return {
                ...state,
                properties: action.payload,
                loading: false,
            }
        case CREATE_PROPERTY:
            return {
                ...state,
                posts: [action.payload, ...state.posts],
            }
        case DELETE_PROPERTY:
            return {
                ...state,
                posts: state.posts.filter(
                    (post) => post._id !== action.payload,
                ),
            }
        default:
            return state
    }
}
