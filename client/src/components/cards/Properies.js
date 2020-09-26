import React from 'react'
import PropTypes from 'prop-types'
import placeholder from '../media/placeholder.jpg'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { getAllProperties } from '../../actions/propertyActions'
import { withStyles } from '@material-ui/core/styles'

// Icons
import EditIcon from '@material-ui/icons/Edit'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew'

import {
    Button,
    IconButton,
    Badge,
    Typography,
    CircularProgress,
} from '@material-ui/core'
import LocalHotelIcon from '@material-ui/icons/LocalHotel'

function Properties({ getAllProperties, loading, properties, role }) {
    React.useEffect(() => {
        getAllProperties()
    }, [])

    const adminButtons = (role) => {
        if (role !== 'admin') {
            return <></>
        }

        return (
            <div className="d-flex justify-content-between mt-2">
                <EditIcon className="text-warning" />
                <DeleteForeverIcon className="text-danger" />
                <PowerSettingsNewIcon />
            </div>
        )
    }

    const propertyCard = (property) => {
        return (
            <div
                key={property._id}
                className="property-card mt-3 shadow border"
            >
                {/* {Adding cards here} */}
                <div className="property-card-left col-lg-6 col-sm-12 p-0">
                    {property.imageUrls.length > 0 ? (
                        <img src={property.imageUrls[0]} />
                    ) : (
                        <img src={placeholder} alt={placeholder} />
                    )}
                </div>
                <div className="property-card-right col-lg-6 col-sm-12 d-flex flex-column">
                    <span className="card-title">{property.title}</span>
                    <span className="subtitle">{property.landArea}</span>
                    <div className="icons d-flex justify-content-between">
                        <IconButton aria-label="cart">
                            <StyledBadge
                                badgeContent={property.beds}
                                color="secondary"
                            >
                                <LocalHotelIcon />
                            </StyledBadge>
                        </IconButton>
                        <IconButton aria-label="cart">
                            <StyledBadge badgeContent={4} color="secondary">
                                <LocalHotelIcon />
                            </StyledBadge>
                        </IconButton>
                        <IconButton aria-label="cart">
                            <StyledBadge badgeContent={4} color="secondary">
                                <LocalHotelIcon />
                            </StyledBadge>
                        </IconButton>
                    </div>
                    <span className="text-primary">
                        This is some more text for descirption
                    </span>
                    <span className="card-description overflow-hidden">
                        {property.description}
                    </span>
                    <Typography color="textSecondary" variant="subtitle1">
                        {property.date}
                    </Typography>
                    <div className="d-flex justify-content-end mt-2">
                        <Button
                            className="mr-2"
                            variant="contained"
                            color="primary"
                            href="#contained-buttons"
                        >
                            Action 1
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            href="#contained-buttons"
                        >
                            Action 2
                        </Button>
                    </div>
                    {adminButtons(role)}
                </div>
            </div>
        )
    }
    if (loading) {
        return (
            <div className="d-flex flex-column justify-content-center align-items-center">
                <CircularProgress color="secondary" />
                <small>Loading all available sales</small>
            </div>
        )
    }
    return (
        <div>
            <div className="container justify-content-center">
                {properties.map((property) => {
                    return propertyCard(property)
                })}
            </div>
        </div>
    )
}

Properties.propType = {
    getAllProperties: PropTypes.func.isRequired,
    properties: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
}
const mapStateToProps = (state) => ({
    properties: state.properties.properties,
    loading: state.properties.loading,
    role: state.auth.user.role,
})
export default connect(mapStateToProps, { getAllProperties })(
    withRouter(Properties),
)

const StyledBadge = withStyles((theme) => ({
    badge: {
        right: -3,
        top: 0,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}))(Badge)
