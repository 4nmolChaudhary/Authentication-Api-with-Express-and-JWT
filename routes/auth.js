import express from 'express'
import Users from '../models/Users'
import { registerValidationSchema, loginValidationSchema } from '../schemas/userSchema'
import { hash, compare } from 'bcryptjs'
import jsonwebtoken from 'jsonwebtoken'

const router = express.Router();

router.post('/register', async (req, res) => {

    try {
        //validation for email,password,name
        const { error } = registerValidationSchema.validate(req.body)
        if (error) return res.status(400).send(error.details[0].message)

        //checking if user already exists
        const isUserAlreadyExists = await Users.where({ email: req.body.email }).countDocuments() === 0 ? false : true
        if (isUserAlreadyExists) return res.status(400).send(`A user with email ${req.body.email} already exists !!`)

        //hash password
        const hashsedPassword = await hash(req.body.password, 10)

        //creating user
        const user = new Users({
            name: req.body.name,
            email: req.body.email,
            password: hashsedPassword
        })

        //saving user and sending response
        const savedUser = await user.save()
        res.send(savedUser)

    } catch (err) {
        res.status(400).send(err.message)
    }
})

router.post('/login', async (req, res) => {

    try {
        //validation for email,password,name
        const { error } = loginValidationSchema.validate(req.body)
        if (error) return res.status(400).send(error.details[0].message)

        //checking if user exists
        const fetchedUser = await Users.findOne({ email: req.body.email })
        if (!fetchedUser) return res.status(400).send(`A user with email ${req.body.email} does not exists !!`)

        //compare password
        const isPasswordCorrect = await compare(req.body.password, fetchedUser.password)
        if (!isPasswordCorrect) return res.status(400).send(`🛑 You have entered wrong password !!`)

        //creating a token
        const token = jsonwebtoken.sign({ _id: fetchedUser._id }, process.env.TOKEN_SECRET)
        res.header('auth-token', token).send(token)

    } catch (err) {
        res.status(400).send(err.message)
    }
})
export default router