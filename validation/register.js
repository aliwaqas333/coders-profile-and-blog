const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports =(data)=>{
    let errors = {}

    data.name = !isEmpty(data.name) ? data.name : '' //If name is not passed
    data.email = !isEmpty(data.email) ? data.email : ''
    data.password = !isEmpty(data.password) ? data.password : ''
    data.password2 = !isEmpty(data.password2) ? data.password2 : ''    

    if(!Validator.isLength(data.name, {min:2, max:30})){
        errors.name ='Name must be between 2 and 30 characters'
    }
    if(isEmpty(data.email)){
        errors.email = 'Email is required'
    }
    if(!Validator.isEmail(data.email)){
        errors.email = 'Email is not Valid'
    }

    if(isEmpty(data.password)){
        errors.password = 'password is required'
    }
    if(!Validator.isLength(data.password, {min:6, max:30})){
        errors.password = 'Password must be atleast 6 characters'
    }

    if(isEmpty(data.password2)){
        errors.password2 = 'password2 is required'
    }
    if(!Validator.equals(data.password, data.password2)){
        errors.password2 = 'passwords must match'
    }
    return {errors, 'isValid': isEmpty(errors)}
}
