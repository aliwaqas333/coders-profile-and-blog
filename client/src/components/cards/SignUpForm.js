import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Grid from '@material-ui/core/Grid'
import { useForm } from 'react-hook-form'
import { withRouter } from 'react-router'

import { connect } from 'react-redux'
import { registerUser } from '../../actions/authActions'

import { Link } from 'react-router-dom'

const SignUpForm = ({ registerUser, styles, auth, errors, history }) => {
    const { register, handleSubmit } = useForm()
    const [serverErrors, setserverErrors] = useState({})
    const onSubmit = (data) => {
        registerUser(data, history)
    }

    useEffect(() => {
        setserverErrors(errors)
    })

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
                    <Link to="#" variant="body2">
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
SignUpForm.propType = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
}
const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors,
})
const mapDispatchToProps = () => ({})
export default connect(mapStateToProps, { registerUser })(
    withRouter(SignUpForm),
)
