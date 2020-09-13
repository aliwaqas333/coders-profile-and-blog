import React from 'react'
import LoginRegister from './components/pages/LoginRegister.js'
import AppBar from './components/layouts/AppBar'
// import { Checkbox, Paper, Typography } from '@material-ui/core'
import { Switch, Route } from 'react-router-dom'

export default function App() {
    return (
        <>
            <AppBar />
            <Switch>
                <Route exact path="/signin">
                    <LoginRegister signin={true} />
                </Route>
                <Route exact path="/signup" component={LoginRegister} />
            </Switch>
        </>
    )
}
