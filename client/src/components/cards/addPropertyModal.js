import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { Modal, TextField, Button, Switch } from '@material-ui/core'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import { useForm } from 'react-hook-form'

function rand() {
    return Math.round(Math.random() * 20) - 10
}

function getModalStyle() {
    const top = 50
    const left = 50

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    }
}

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 600,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: 10,
    },
}))

export default function AddPropertyModal(createPropertyPost) {
    const classes = useStyles()
    const { register, handleSubmit } = useForm()
    // const [serverErrors, setserverErrors] = React.useState({})
    const [isActivePost, setisActivePost] = React.useState(true)
    const onSubmit = (data) => {
        createPropertyPost(data)
        // console.log('data', data)
        // registerUser(data, history)
    }

    React.useEffect(() => {
        // setserverErrors(errors)
    })
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle)
    const [open, setOpen] = React.useState(false)

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const body = (
        <div style={modalStyle} className={classes.paper}>
            <form
                className={classes.root}
                onSubmit={handleSubmit(onSubmit)}
                autoComplete="on"
            >
                <span className="text-center">Add New property post here</span>
                <div className="container">
                    <div className="row">
                        <div className="col-6">
                            <TextField
                                variant="outlined"
                                fullWidth
                                label="Title"
                                name="title"
                                defaultValue="this is the title"
                                inputRef={register}
                            />
                        </div>
                        <div className="col-6">
                            <TextField
                                label="handle"
                                inputRef={register}
                                value="this-is-the-value"
                                name="handle"
                                fullWidth
                            />
                        </div>
                        <div className="col-12 mt-2">
                            <TextField
                                variant="outlined"
                                label="image Urls"
                                name="imageUrls"
                                inputRef={register}
                                value="https://i.ibb.co/VNvc97G/Whats-App-Image-2020-09-25-at-11-29-27-AM.jpg,https://i.ibb.co/VNvc97G/Whats-App-Image-2020-09-25-at-11-29-27-AM.jpg,https://i.ibb.co/VNvc97G/Whats-App-Image-2020-09-25-at-11-29-27-AM.jpg"
                                multiline
                                fullWidth
                                rowsMax={5}
                                helperText="Add full image links seperated by comma"
                            />
                        </div>
                        <div className="col-4 mt-2">
                            <TextField
                                variant="outlined"
                                inputRef={register}
                                name="beds"
                                defaultValue={2}
                                label="beds"
                                fullWidth
                            />
                        </div>
                        <div className="col-4 mt-2">
                            <TextField
                                variant="outlined"
                                inputRef={register}
                                defaultValue={2}
                                label="rooms"
                                name="rooms"
                                fullWidth
                            />
                        </div>
                        <div className="col-4 mt-2">
                            <TextField
                                variant="outlined"
                                inputRef={register}
                                defaultValue={1}
                                label="floors"
                                name="floors"
                                fullWidth
                            />
                        </div>
                        <div className="col-6 mt-2">
                            <TextField
                                variant="outlined"
                                label="Price"
                                name="price"
                                inputRef={register}
                                defaultValue="250,000 PKR"
                                fullWidth
                            />
                        </div>
                        <div className="col-6 mt-2">
                            <TextField
                                variant="outlined"
                                label="location"
                                name="location"
                                inputRef={register}
                                defaultValue="G11-3"
                                fullWidth
                            />
                        </div>
                        <div className="col-12 mt-2">
                            <TextField
                                variant="outlined"
                                label="Description"
                                inputRef={register}
                                name="description"
                                defaultValue="this is the description"
                                fullWidth
                                multiline
                            />
                        </div>
                        <div className="col-6 mt-2">
                            <Switch
                                onChange={() => {}}
                                name="isChecked"
                                checked={isActivePost}
                                inputProps={{
                                    'aria-label': 'Property Post checkbox',
                                }}
                                onChange={() => setisActivePost(!isActivePost)}
                                inputRef={register}
                                checkedIcon={<CheckCircleIcon />}
                            />
                            <small>Active?</small>
                        </div>

                        <div className="col-12 d-flex justify-content-between">
                            <Button onClick={handleClose} color="secondary">
                                Cancel
                            </Button>
                            <Button type="submit" color="secondary">
                                Save
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
            {/* <SimpleModal /> */}
        </div>
    )

    return {
        modalBody: () => {
            // console.log('modal body')
            return (
                <React.Fragment>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                    >
                        {body}
                    </Modal>
                </React.Fragment>
            )
        },
        handleClose: () => {
            console.log('handle close')
            setOpen(!open)
        },
    }
}

// export default AddPropertyModal

AddPropertyModal.propTypes = {}
const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors,
})

// export default connect(mapStateToProps, null)(AddPropertyModal)
