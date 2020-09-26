const express = require('express')

const Router = express.Router()
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
// load user model
const jwt = require('jsonwebtoken')
const passport = require('passport')

const User = require('../../models/User')
const keys = require('../../config/keys')

// adding jwt strategy to passport
require('../../config/passport')(passport)

// Load input validation
const validateRegisteredInput = require('../../validation/register')
const validateLoginInput = require('../../validation/login')

Router.get('/test', (req, res) => {
    return res.json({ msg: 'Profile Working' })
})

// Registering a user
Router.post('/register', (req, res) => {
    const { errors, isValid } = validateRegisteredInput(req.body)
    // check validation
    if (!isValid) {
        return res.status(400).json(errors)
    }

    User.findOne({ email: req.body.email }).then((user) => {
        if (user) {
            errors.email = 'Email already Exist, you can try to login instead!'
            return res.status(400).json(errors)
        }
        // console.log(req)
        const avatar = gravatar.url(req.body.email, {
            s: '200', // size
            r: 'pg', // rating
            d: 'mm', // date
        })
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            avatar: avatar,
            password: req.body.password,
        })

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err
                newUser.password = hash

                newUser
                    .save()
                    .then((user) => {
                        res.json(user)
                    })
                    .catch((e) => {
                        console.log(e)
                    })
            })
        })
        return false
    })
})

// @route   GET api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
Router.post('/login', (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body)

    // Check Validation
    if (!isValid) {
        return res.status(400).json(errors)
    }

    const email = req.body.email
    const password = req.body.password

    // Find user by email
    User.findOne({ email }).then((user) => {
        // Check for user
        if (!user) {
            errors.email = 'User not found'
            return res.status(404).json(errors)
        }

        // Check Password
        bcrypt.compare(password, user.password).then((isMatch) => {
            if (isMatch) {
                // User Matched
                const payload = {
                    id: user.id,
                    name: user.name,
                    avatar: user.avatar,
                    role: user.role,
                } // Create JWT Payload

                // Sign Token
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    { expiresIn: 3600 },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: 'Bearer ' + token,
                        })
                    },
                )
            } else {
                errors.password = 'Password incorrect'
                return res.status(400).json(errors)
            }
        })
    })
})
// @route GET       api/usrs/current
// desc Return      current user
// @access          Private

Router.get(
    '/current',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        res.json({
            id: req.user.id,
            name: req.user.name,
            email: req.user.email,
        })
    },
)

module.exports = Router
