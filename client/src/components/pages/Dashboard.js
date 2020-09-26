import React from 'react'
import '../styles/dashboard.css'
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

import AddPropertyModal from '../cards/addPropertyModal'
import { connect } from 'react-redux'
import { createPropertyPost } from '../../actions/propertyActions'

// import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'

import AddIcon from '@material-ui/icons/Add'
import Properties from '../cards/Properies'

function Dashboard({ role, createPropertyPost }) {
    const classes = useStyles()
    const { modalBody, handleClose } = AddPropertyModal(createPropertyPost)
    // console.log('modalBody', modalBody
    const mySelect = (title = '', option = [], isRequired = false) => {
        return (
            <FormControl className={classes.formControl}>
                <InputLabel>Marlas</InputLabel>
                <Select defaultValue={10}>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>
        )
    }
    const homeBanner = () => {
        return (
            <div className="row main-banner-wrapper d-flex justify-content-center align-items-center">
                <div className="search-form-wrapper col-lg-8 col-md-10 col-sm-12 p-3 shadow">
                    <form>
                        <span className="banner-text">Your own Home!</span>
                        <div className="d-flex justify-content-center align-items-center">
                            {mySelect()}
                            {mySelect()}
                            {mySelect()}
                            <Button variant="contained" color="secondary">
                                Find
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

    const addPropertyCard = () => {
        return (
            <div className="d-flex justify-content-center">
                <Button
                    variant="outlined"
                    color="primary"
                    className="m-2"
                    startIcon={<AddIcon />}
                    onClick={() => handleClose()}
                >
                    Add More
                </Button>
            </div>
        )
    }
    return (
        <>
            <div className="d-flex justify-content-center flex-column p-0">
                {homeBanner()}
                {role === 'admin' && addPropertyCard()}

                <div className="container d-flex flex-column justify-content-center align-items-center">
                    {/* <span className="banner-text">List of Available property</span> */}
                    {/* {propertyCard()} */}
                </div>
                <Properties />
                <div>{modalBody()}</div>
            </div>
        </>
    )
}
const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        width: '30%',
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}))

Dashboard.propTypes = {
    // createPropertyPost: PropTypes.func.isRequired,
}
const mapStateToProps = (state) => ({
    role: state.auth.user.role,
})
export default connect(mapStateToProps, { createPropertyPost })(Dashboard)

// export default
