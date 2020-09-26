import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import * as serviceWorker from './serviceWorker'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
//
import jwt_decode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'
import { setCurrentUser } from './actions/authActions'

// lets check if user is authenticatated
if (localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken)
    const decoded = jwt_decode(localStorage.jwtToken)

    store.dispatch(setCurrentUser(decoded))

    const currentTime = Date.now() / 1000

    if (decoded.exp < currentTime) {
        console.log('decoded', decoded)
        // TODO: Clear login
        // login
        // window.location.href = '/login'
    }
}

const darkTheme = createMuiTheme({
    palette: {
        type: 'light',
    },
})

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <ThemeProvider theme={darkTheme}>
                <App />
            </ThemeProvider>
        </Router>
    </Provider>,

    document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
