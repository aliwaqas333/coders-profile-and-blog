const mongoose = require('mongoose')

const { Schema } = mongoose

const PropertySchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    },
    handle: {
        type: String,
        required: true,
        max: 40,
    },
    price: {
        type: String,
        required: true,
        max: 15,
    },
    imageUrls: [
        {
            type: String,
        },
    ],
    landArea: {
        type: String,
        required: true,
        max: 15,
    },
    beds: {
        type: String,
        required: true,
        max: 15,
    },
    description: {
        type: String,
        required: true,
        max: 15,
    },
    title: {
        type: String,
        required: true,
        max: 15,
    },
    date: {
        type: Date,
        default: Date.now(),
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    isSuperHot: {
        type: Boolean,
        default: false,
    },
})

module.exports = Property = mongoose.model('property', PropertySchema)
