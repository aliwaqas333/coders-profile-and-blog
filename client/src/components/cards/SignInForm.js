import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Grid from '@material-ui/core/Grid'
import { useForm } from 'react-hook-form'
import Axios from 'axios'

import { Link } from 'react-router-dom'

export default function SignInForm({ styles }) {
    const { register, handleSubmit, watch, errors } = useForm()
    const [serverErrors, setserverErrors] = useState({})
    const onSubmit = (data) => {
        submitData(data)
    }
    const myTextField = {
        variant: 'outlined',
        margin: 'normal',
        fullWidth: true,
        required: true,
    }
    const submitData = (data) => {
        setserverErrors({})
        console.log('data', data)
        Axios.post('/api/users/login', data)
            .then((r) => {
                console.log('request', r)
            })
            .catch((e) => {
                setserverErrors(e.response.data)
                console.log('e.response.data', e.response.data)
            })
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <TextField
                {...myTextField}
                error={serverErrors.hasOwnProperty('email')}
                label="email"
                name="email"
                autoComplete="email"
                autoFocus
                defaultValue="member@example7.com"
                inputRef={register}
                type="email"
                helperText={
                    serverErrors.hasOwnProperty('name') && serverErrors.name
                }
            />
            <TextField
                {...myTextField}
                name="password"
                label="Password"
                type="password"
                id="password"
                defaultValue="123456"
                inputRef={register}
                autoComplete="current-password"
                helperText={
                    serverErrors.hasOwnProperty('password') &&
                    serverErrors.password
                }
            />
            <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={styles.submit}
            >
                Sign In
            </Button>
            <Grid container>
                <Grid item xs>
                    <Link to="/" variant="body2">
                        Forgot password?
                    </Link>
                </Grid>
                <Grid item>
                    <Link to="/signup">{"Don't have an account? Sign Up"}</Link>
                </Grid>
            </Grid>
        </form>
    )
}
