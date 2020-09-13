import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import * as serviceWorker from './serviceWorker'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'

const darkTheme = createMuiTheme({
    palette: {
        type: 'light',
    },
})

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <Router>
                <ThemeProvider theme={darkTheme}>
                    <App />
                </ThemeProvider>
            </Router>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
