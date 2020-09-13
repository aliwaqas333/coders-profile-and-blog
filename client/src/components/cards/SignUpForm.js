import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Grid from '@material-ui/core/Grid'
import { useForm } from 'react-hook-form'
import Axios from 'axios'

import { Link } from 'react-router-dom'

export default function SignUpForm({ styles }) {
    const { register, handleSubmit, watch, errors } = useForm()
    const [serverErrors, setserverErrors] = useState({})
    const onSubmit = (data) => {
        submitData(data)
    }

    const submitData = (data) => {
        setserverErrors({})
        console.log('data', data)
        Axios.post('/api/users/register', data)
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
                variant="outlined"
                margin="normal"
                required
                fullWidth
                error={serverErrors.hasOwnProperty('name')}
                id="name"
                label="name"
                name="name"
                autoComplete="name"
                autoFocus
                defaultValue="Ali Waqas"
                inputRef={register}
                helperText={
                    serverErrors.hasOwnProperty('name') && serverErrors.name
                }
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                error={serverErrors.hasOwnProperty('email')}
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                defaultValue="member@example.com"
                inputRef={register}
                helperText={
                    serverErrors.hasOwnProperty('email') && serverErrors.email
                }
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                error={serverErrors.hasOwnProperty('password')}
                name="password"
                label="Password"
                type="password"
                defaultValue="member@example.com"
                id="password"
                helperText={
                    serverErrors.hasOwnProperty('password') &&
                    serverErrors.password
                }
                autoComplete="current-password"
                inputRef={register}
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                defaultValue="member@example.com"
                error={serverErrors.hasOwnProperty('password2')}
                helperText={
                    serverErrors.hasOwnProperty('password2') &&
                    serverErrors.password2
                }
                label="Password2"
                type="password"
                id="password2"
                name="password2"
                autoComplete="current-password"
                inputRef={register}
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
                Register
            </Button>
            <Grid container>
                <Grid item xs>
                    <Link href="#" variant="body2">
                        Forgot password?
                    </Link>
                </Grid>
                <Grid item>
                    <Link to="/signin">{"Don't have an account? Sign In"}</Link>
                </Grid>
            </Grid>
        </form>
    )
}
