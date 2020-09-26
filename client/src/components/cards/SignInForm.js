import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Grid from '@material-ui/core/Grid'
import { useForm } from 'react-hook-form'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { loginUser } from '../../actions/authActions'
import { Link } from 'react-router-dom'

function SignInForm({ styles, errors, loginUser, history }) {
    const { register, handleSubmit } = useForm()
    const [serverErrors, setserverErrors] = useState({})
    const onSubmit = (data) => {
        setserverErrors({})
        loginUser(data, history)
    }

    React.useEffect(() => {
        setserverErrors(errors)
    })
    const myTextField = {
        variant: 'outlined',
        margin: 'normal',
        fullWidth: true,
        required: true,
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
                error={serverErrors.hasOwnProperty('email')}
                defaultValue="member@example14.com"
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
                error={serverErrors.hasOwnProperty('password')}
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
SignInForm.propType = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
}
const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors,
})
export default connect(mapStateToProps, { loginUser })(withRouter(SignInForm))
