const express = require('express')
// const mongoose = require('mongoose')
// eslint-disable-next-line prettier/prettier
const passport = require('passport')
// const { Passport } = require('passport')
const Property = require('../../models/Property')
// const User = require('../../models/User')
const validatePropertyInput = require('../../validation/property')
const Router = express.Router()

Router.get('/test', (req, res) => {
    return res.json({ msg: 'Property Working' })
})
// @GET
// get all posts from db
// GET

Router.get('/all', (req, res) => {
    // console.log('req', req)
    const errors = {}

    // setTimeout( }, 3000);

    Property.find({ isActive: true })
        // .populate("user", ["name", "avatar"])
        .then((properties) => {
            // console.log('property', property)
            if (!properties) {
                errors.noprofile = 'There are no property'
                return res.status(404).json(errors)
            }
            return res.json({ properties: properties })
        })
        .catch((e) => {
            return res.status(404).json(e)
        })
})

// @Route get  api/posts/post_id
// @desc get post by id
// @access public
Router.get('/id/:id', (req, res) => {
    Property.findById(req.params.id)
        .then((property) => res.json(property))
        .catch((e) =>
            res
                .status(404)
                .json({ nopropertyFound: 'No Post found for that ID' }),
        )
})

// @Route DELETE api/posts/post_id
// @desc delete post by id
// @access private
// Admin route
Router.delete(
    '/id/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        if (req.user.role !== 'admin') {
            return res
                .status(400)
                .json({ notAllowed: 'Current user has no access' })
        }

        Property.findOne({ user: req.user.id }).then((property) => {
            Property.findById(req.params.id).then((property) => {
                if (property.user.toString() !== req.user.id) {
                    return res.status(401).json({
                        notAuthorized: 'user not authorized',
                    })
                }
                // Delete
                property
                    .remove()
                    .then(() => {
                        return res.json({ success: true })
                    })
                    .catch((e) => {
                        return res
                            .status(404)
                            .json({ propertyNotFound: 'post not found' })
                    })
            })
        })
    },
)

// @Admin Route
// Creating a new prpoerty post
// POST
Router.post(
    '/create',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        // console.log('req.user.role', req.user.role)
        if (req.user.role !== 'admin') {
            return res
                .status(400)
                .json({ notAllowed: 'Current user has no access' })
        }
        const { errors, isValid } = validatePropertyInput(req.body)
        console.log('isValid', isValid)

        if (!isValid) {
            res.status(400).json(errors)
        }

        let PropertyFields = {}
        PropertyFields.user = req.user.id
        PropertyFields.handle = req.body.handle
        PropertyFields.price = req.body.price
        PropertyFields.landArea = req.body.handle
        PropertyFields.beds = req.body.beds
        PropertyFields.description = req.body.description
        PropertyFields.title = req.body.handle
        if (typeof req.body.imageUrls !== 'undefined') {
            PropertyFields.imageUrls = req.body.imageUrls.split(',')
        }
        // PropertyFields.handle = req.body.handle
        // Update the field
        if (req.body.id) {
            Property.findOne({ id: req.body.id }).then((property) => {
                if (property) {
                    Property.findByIdAndUpdate(
                        req.body.id,
                        {
                            $set: PropertyFields,
                        },
                        { new: true },
                    ).then((property) => {
                        res.json(property)
                    })
                }
            })
        }

        new Property(PropertyFields)
            .save()
            .then((newProfile) => res.json(newProfile))

        res.json(PropertyFields)
    },
)

module.exports = Router

// const Router = express.Router()
