const Users = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const errorStatus = 400


const getMe = async (req, res, next) => {
    console.log('get')
    console.log(req.body.email)
    let res1 = await Users.findOne({email: req.body.email })
    res.status(200).json(res1)
}

const createUser = async (req, res, next) => {
    const { user, email, password } = req.body
    try {
        //check
        const atIndex = email.indexOf('@')
        if(atIndex === -1 || atIndex === email.length -1 || atIndex === 0) {
            res.status(errorStatus)
            throw new Error('invalid email')
        }
        if (!user || !email || !password) {
            res.status(errorStatus)
            throw new Error('fill all fields')
        }
        //check
        const userExists = await Users.findOne({ email })
        //check
        if (userExists) {
            res.status(errorStatus)
            throw new Error('user already exists')
        }
        //crypt
        const salt = await bcrypt.genSalt(10)
        const hashedPasswaord = await bcrypt.hash(password, salt)
        //create
        const create = await Users.create({
            user,
            email,
            password: hashedPasswaord,
        })
        //check
        if (create) {
            //responce
            res.status(200).json({
                id: create._id,
                user: create.user,
                email: create.email,
                token: generateToken(create._id)
            })
        }
    } catch (error) {
        next(error)
    }
}

const verifyUser = async (req, res, next) => {
    const { email, password } = req.body
    try {
        const atIndex = email.indexOf('@')
        if(atIndex === -1 || atIndex === email.length -1 || atIndex === 0) {
            res.status(errorStatus)
            throw new Error('invalid email')
        }
        if (!email || !password) {
            res.status(errorStatus)
            throw new Error('fill all fields')
        }

        const user = await Users.findOne({ email })
        if(!user) {
            res.status(errorStatus)
            throw new Error('not found')
        }
        const auth = await bcrypt.compare(password, user.password)
        console.log(user)
        console.log(auth)

        if (!auth) {
            res.status(errorStatus)
            throw new Error('incorrect data')
        }
        res.status(200).json({
            user: user.user,
            email: email,
            token: generateToken(user._id),
            _id: user._id
        })
    } catch (error) {
        next(error)
    }
}
//&&&???????????????????????????????

const generateToken = (id) => {
    console.log(id)
    return jwt.sign({ id }, '1234', {
        expiresIn: '30d'
    })
}

module.exports = {
    getMe,
    createUser,
    verifyUser,
    generateToken
}