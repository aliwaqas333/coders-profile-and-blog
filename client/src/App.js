import React from 'react'
import LoginRegister from './components/pages/LoginRegister.js'
import AppBar from './components/layouts/AppBar'
import Dashboard from './components/pages/Dashboard'
// import Home from './components/pages/Home'
// import { Checkbox, Paper, Typography } from '@material-ui/core'
import { Switch, Route } from 'react-router-dom'

export default function App() {
    return (
        <div>
            <div>
                <AppBar />
            </div>

            <Switch>
                <Route exact path="/signin">
                    <LoginRegister signin={true} />
                </Route>
                <Route exact path="/" component={Dashboard} />
                <Route exact path="/signup" component={LoginRegister} />
            </Switch>
        </div>
    )
}
