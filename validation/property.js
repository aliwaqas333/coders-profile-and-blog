const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validatePropertyInput(data) {
    let errors = {}

    data.description = !isEmpty(data.description) ? data.description : ''
    data.price = !isEmpty(data.price) ? data.price : ''
    data.location = !isEmpty(data.location) ? data.location : ''
    data.title = !isEmpty(data.title) ? data.title : ''

    if (Validator.isEmpty(data.title)) {
        errors.title = 'title field is required'
    }

    if (Validator.isEmpty(data.price)) {
        errors.price = 'price field is required'
    }

    if (Validator.isEmpty(data.location)) {
        errors.location = 'location of study field is required'
    }

    return {
        errors,
        isValid: isEmpty(errors),
    }
}
