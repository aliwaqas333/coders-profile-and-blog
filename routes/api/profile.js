const express = require('express')
// const mongoose = require('mongoose')
// eslint-disable-next-line prettier/prettier
const passport = require('passport')
// const { Passport } = require('passport')
const Profile = require('../../models/Profile')
// const User = require('../../models/User')
const validateProfileInput = require('../../validation/profile')
const validateExperienceInput = require('../../validation/experience')
const validateEducationInput = require('../../validation/education')

const Router = express.Router()

Router.get('/test', (req, res) => {
    return res.json({ msg: 'Profile Working' })
})

// @Route GET api/profile/all
// @desc find all profiles
// @access public
// DONE - Adding a specific dish on its dishId

// Router.post('/:dishId', authenticate.verifyUser, async (req, res) => {
//     try {
//         const dishId = req.params.dishId
//         if (!mongoose.Types.ObjectId.isValid(dishId)) {
//             throw new Error('id is invalid')
//         }
//         const dish = await Dish.findById(dishId)
//         if (!dish) {
//             throw new Error('Dish not found')
//         }
//         //Here we are initialing as well adding the dish by spread operator
//         const fav = new Favorite({ ...req.body, dishes: dish })

//         await fav.save()
//         return await res.send(fav)
//     } catch (e) {
//         return res.send(e.message)
//     }
// })

Router.get('/all', (req, res) => {
    // console.log('req', req)
    const errors = {}
    Profile.find()
        // .populate("user", ["name", "avatar"])
        .then((profiles) => {
            // console.log('profiles', profiles)
            if (!profiles) {
                errors.noprofile = 'There are no profiles'
                return res.status(404).json(errors)
            }
            return res.json({ profiles: profiles })
        })
        .catch((e) => {
            return res.status(404).json(e)
        })
})

Router.get(
    '/',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const errors = {}
        Profile.findOne({ user: req.user.id })
            .populate('user', ['name', 'email'])
            .then((profile) => {
                if (!profile) {
                    errors.noprofile = 'There is no profile for this user'
                    return res.status(404).json(errors)
                }
                return res.json(profile)
            })
            .catch((e) => {
                return res.status(404).json(e)
            })
    },
)

// @Route GET api/profile/handle/:handle
// @desc returns profile
// @access public

Router.get('/handle/:handle', (req, res) => {
    const errors = {}
    Profile.findOne({ handle: req.params.handle })
        .populate('user', ['name', 'server'])
        .then((profile) => {
            if (!profile) {
                console.log('req', req.params.handle)
                errors.noprofile = 'There is no profile'
                return res.status(404).json(errors)
            }
            return res.json(profile)
        })
        .catch((e) => {
            return res.status(404).json(e)
        })
})

// @Route GET api/profile/user/:id
// @desc returns profile by ID
// @access public
Router.get('/user/:user_id', (req, res) => {
    const errors = {}
    Profile.findOne({ user: req.params.user_id })
        .populate('user', ['name', 'avatar'])
        .then((profile) => {
            if (!profile) {
                errors.noprofile = 'There is no profile'
                return res.status(404).json(errors)
            }
            return res.json(profile)
        })
        .catch((e) => {
            return res.status(404).json(e)
        })
})
const handleFields = (body) => {
    const profileFields = {}
    const fields = [
        'handle',
        'company',
        'website',
        'location',
        'status',
        'bio',
        'githubusername',
    ]
    fields.forEach((field) => {
        if (typeof field === 'string') {
            if (body[field]) profileFields[field] = body[field]
        }
    })
    if (typeof body.skills !== 'undefined') {
        profileFields.skills = body.skills.split(',')
    }

    //   Social fields
    profileFields.social = {}
    if (body.youtube) profileFields.social.youtube = body.youtube
    if (body.facebook) profileFields.social.facebook = body.facebook
    if (body.twitter) profileFields.social.twitter = body.twitter
    if (body.linkedin) profileFields.social.linkedin = body.linkedin
    if (body.instagram) profileFields.social.instagram = body.instagram
    console.log('profileFields', profileFields)
    return profileFields
}

Router.post(
    '/create',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { errors, isValid } = validateProfileInput(req.body)
        if (!isValid) {
            res.status(400).json(errors)
        }

        let profileFields = {}
        profileFields.user = req.user.id
        profileFields = Object.assign(profileFields, handleFields(req.body))
        Profile.findOne({ user: req.user.id }).then((profile) => {
            if (profile) {
                // Update
                Profile.findOneAndUpdate(
                    { user: req.user.id },
                    { $set: profileFields },
                    { new: true },
                ).then((updatedProfile) => res.json(updatedProfile))
            } else {
                // Create
                // Check if handle exists
                Profile.findOne({ handle: profileFields.handle }).then(
                    (profiles) => {
                        if (profiles) {
                            errors.handle = 'That handle already exists'
                            return res.status(400).json(errors)
                        }
                        // Save Profile
                        new Profile(profileFields)
                            .save()
                            .then((newProfile) => res.json(newProfile))
                    },
                )
            }
        })
        res.json(profileFields)
    },
)

// @Route GET api/profile/profile/experience
// @desc adds experience to profile
// @access Private

Router.post(
    '/experience',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        // Validating the experience object
        const { errors, isValid } = validateExperienceInput(req.body)
        console.log('isValid', isValid)
        if (!isValid) {
            return res.status(400).json(errors)
        }

        Profile.findOne({ user: req.user.id }).then((profile) => {
            const newExp = {
                title: req.body.title,
                company: req.body.company,
                location: req.body.location,
                from: req.body.from,
                to: req.body.to,
                description: req.body.description,
                current: req.body.current,
            }
            if (!profile) {
                return res.status(404).json("Profile doesn't exist")
            }
            console.log('profile', profile)
            profile.experience.unshift(newExp)

            profile.save().then((updatedProfile) => {
                return res.json(updatedProfile)
            })
        })
    },
)

// @Route GET api/profile/education
// @desc adds experience to profile
// @access Private

Router.post(
    '/education',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        // Validating the experience object
        const { errors, isValid } = validateEducationInput(req.body)
        console.log('isValid', isValid)
        if (!isValid) {
            return res.status(400).json(errors)
        }

        Profile.findOne({ user: req.user.id }).then((profile) => {
            const newExp = {
                school: req.body.school,
                degree: req.body.degree,
                fieldofstudy: req.body.fieldofstudy,
                from: req.body.from,
                to: req.body.to,
                description: req.body.description,
                current: req.body.current,
            }
            if (!profile) {
                return res.status(404).json("Profile doesn't exist")
            }
            profile.education.unshift(newExp)
            profile.save().then((updatedProfile) => {
                return res.json(updatedProfile)
            })
        })
    },
)

// @Route DELETE api/profile/experience/exp_id
// @desc Delete experience to profile
// @access Private
Router.delete(
    '/experience/:exp_id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Profile.findOne({ user: req.user.id })
            .then((profile) => {
                // console.log('profile', profile)
                const removeIndex = profile.experience
                    .map((item) => item.id)
                    .indexOf(req.params.exp_id)
                // remove the experience
                profile.experience.splice(removeIndex, 1)
                // save()
                profile.save().then((profile) => res.json(profile))
            })
            .catch((err) => {
                return res.json(err)
            })
    },
)

// @Route DELETE api/profile/education/exp_id
// @desc Delete education from profile
// @access Private
Router.delete(
    '/education/:edu_id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Profile.findOne({ user: req.user.id })
            .then((profile) => {
                // console.log('profile', profile)
                const removeIndex = profile.experience
                    .map((item) => item.id)
                    .indexOf(req.params.edu_id)
                // remove the experience
                profile.experience.splice(removeIndex, 1)
                // save()
                profile.save().then((profile) => res.json(profile))
            })
            .catch((err) => {
                return res.json(err)
            })
    },
)

module.exports = Router
