import Joi from '@hapi/joi'

const email = Joi.string().email().required().label('Email')
const name = Joi.string().max(50).required().label('Name')
const password = Joi.string().min(8).max(50).required().label('Password')

export const registerValidationSchema = Joi.object().keys({
    name,
    email,
    password
})

export const loginValidationSchema = Joi.object().keys({
    email,
    password
})

