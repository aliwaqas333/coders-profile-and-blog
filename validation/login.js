const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = (data) =>{
    let errors ={}

    data.email = !isEmpty(data.email) ? data.email : ''
    data.password = !isEmpty(data.password) ? data.password : ''

    if(isEmpty(data.email)){
        errors.email = 'Email is required'
    }
    if(!Validator.isEmail(data.email)){
        errors.email = 'Email is not Valid'
    }

    if(isEmpty(data.password)){
        errors.password = 'password is required'
    }

    return {errors, 'isValid': isEmpty(errors)}

}