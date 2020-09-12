const express = require('express')
const passport = require('passport')
const validatePostInput = require('../../validation/post')
const User = require('../../models/User')
const Profile = require('../../models/Profile')
const Post = require('../../models/Post')

const Router = express.Router()
Router.get('/test', (req, res) => {
    return res.json({ msg: 'Profile Working' })
})

Router.post(
    '/create',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { errors, isValid } = validatePostInput(req.body)

        if (!isValid) {
            res.status(400).json(errors)
            return false
        }
        const newPost = new Post({
            text: req.body.text,
            name: req.body.name,
            avatar: req.body.avatar,
            user: req.user.id,
        })

        newPost.save().then((post) => res.json(post))
    },
)
// @Route GET api/posts/all
// @desc find all posts
// @access public
Router.get('/all', (req, res) => {
    Post.find({})
        .sort({ date: -1 })
        .then((posts) => res.json(posts))
        .catch((e) => res.status(404).json({ noPostsFound: 'No Posts found' }))
})

// @Route get  api/posts/post_id
// @desc get post by id
// @access public
Router.get('/id/:id', (req, res) => {
    Post.findById(req.params.id)
        .then((post) => res.json(post))
        .catch((e) =>
            res.status(404).json({ noPostFound: 'No Post found for that ID' }),
        )
})

// @Route DELETE api/posts/post_id
// @desc delete post by id
// @access private
Router.delete(
    '/id/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Profile.findOne({ user: req.user.id }).then((profile) => {
            Post.findById(req.params.id).then((post) => {
                if (post.user.toString() !== req.user.id) {
                    return res.status(401).json({
                        notAuthorized: 'user not authorized',
                    })
                }
                // Delete
                post.remove()
                    .then(() => {
                        return res.json({ success: true })
                    })
                    .catch((e) => {
                        return res
                            .status(404)
                            .json({ postNotFound: 'post not found' })
                    })
            })
        })
    },
)

// @Route POST api/posts/like/post_id
// @desc like post by id
// @access private
// @route   POST api/posts/like/:id
// @desc    Like post
// @access  Private
Router.post(
    '/like/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Profile.findOne({ user: req.user.id }).then((profile) => {
            Post.findById(req.params.id)
                .then((post) => {
                    if (
                        post.likes.filter(
                            (like) => like.user.toString() === req.user.id,
                        ).length > 0
                    ) {
                        return res.status(400).json({
                            alreadyliked: 'User already liked this post',
                        })
                    }

                    // Add user id to likes array
                    post.likes.unshift({ user: req.user.id })

                    post.save().then((post) => res.json(post))
                })
                .catch(() =>
                    res.status(404).json({ postnotfound: 'No post found' }),
                )
        })
    },
)

// @route   POST api/posts/unlike/:id
// @desc    Unlike post
// @access  Private
Router.post(
    '/unlike/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Profile.findOne({ user: req.user.id }).then((profile) => {
            Post.findById(req.params.id)
                .then((post) => {
                    if (
                        post.likes.filter(
                            (like) => like.user.toString() === req.user.id,
                        ).length === 0
                    ) {
                        return res.status(400).json({
                            notliked: 'You have not yet liked this post',
                        })
                    }

                    // Get remove index
                    const removeIndex = post.likes
                        .map((item) => item.user.toString())
                        .indexOf(req.user.id)

                    // Splice out of array
                    post.likes.splice(removeIndex, 1)

                    // Save
                    post.save().then((post) => res.json(post))
                })
                .catch((err) =>
                    res.status(404).json({ postnotfound: 'No post found' }),
                )
        })
    },
)

// @route   POST api/posts/comment/:id
// @desc    Add comment to post
// @access  Private
Router.post(
    '/comment/:id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        const { errors, isValid } = validatePostInput(req.body)

        // Check Validation
        if (!isValid) {
            // If any errors, send 400 with errors object
            return res.status(400).json(errors)
        }

        Post.findById(req.params.id)
            .then((post) => {
                const newComment = {
                    text: req.body.text,
                    name: req.body.name,
                    avatar: req.body.avatar,
                    user: req.user.id,
                }

                // Add to comments array
                post.comments.unshift(newComment)

                // Save
                post.save().then((post) => res.json(post))
            })
            .catch((err) =>
                res.status(404).json({ postnotfound: 'No post found' }),
            )
    },
)

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Remove comment from post
// @access  Private
Router.delete(
    '/comment/:id/:comment_id',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        Post.findById(req.params.id)
            .then((post) => {
                // Check to see if comment exists
                if (
                    post.comments.filter(
                        (comment) =>
                            comment._id.toString() === req.params.comment_id,
                    ).length === 0
                ) {
                    return res
                        .status(404)
                        .json({ commentnotexists: 'Comment does not exist' })
                }

                // Get remove index
                const removeIndex = post.comments
                    .map((item) => item._id.toString())
                    .indexOf(req.params.comment_id)

                // Splice comment out of array
                post.comments.splice(removeIndex, 1)

                post.save().then((post) => res.json(post))
            })
            .catch((err) =>
                res.status(404).json({ postnotfound: 'No post found' }),
            )
    },
)

module.exports = Router
