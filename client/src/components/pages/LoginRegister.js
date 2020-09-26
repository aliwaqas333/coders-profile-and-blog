import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import { useHistory } from 'react-router-dom'

import SignInForm from '../cards/SignInForm'
import SignUpForm from '../cards/SignUpForm'
import { connect } from 'react-redux'

const useStyles = makeStyles((theme) => ({
    root: {
        height: '90vh',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light'
                ? theme.palette.grey[50]
                : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}))

function LoginRegister({ signin, auth }) {
    let history = useHistory()
    const classes = useStyles()
    React.useEffect(() => {
        auth.isAuthenticated && history.push('/dashboard')
    })

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid
                item
                xs={12}
                sm={8}
                md={5}
                component={Paper}
                elevation={6}
                square
            >
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        {signin ? 'Sign in' : 'Sign Up'}
                    </Typography>
                    {signin ? (
                        <SignInForm styles={classes} />
                    ) : (
                        <SignUpForm styles={classes} />
                    )}
                </div>
            </Grid>
        </Grid>
    )
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors,
})
export default connect(mapStateToProps, {})(LoginRegister)
