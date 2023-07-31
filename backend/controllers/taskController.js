const Task = require('../models/taskModel')
const errorStatus = 400
const ok = 200

const getTasks = async (req, res) => {
    const goal = await Task.find({ user: req.user._id })
    console.log(goal)
    res.status(ok).json(goal)
}

const createTask = async (req, res, next) => {
    try {
        console.log(req.body.text)

        if (!req.body.text) {
            res.status(errorStatus)
            throw new Error('Please add a text field')
        }
        const create = await Task.create({
            text: req.body.text,
            user: req.user.id
        })
        if(!create) {
            res.status(400)
            throw new Error('not created')
        }
        res.status(ok).json(create)
    } catch (error) {
        next(error)
    }
}

const updateTask = async (req, res, next) => {
    try {
        if (!req.body.text) {
            res.status(errorStatus)
            throw new Error('please add text to update')
        }
        const task = await Task.find({ user: req.user._id })
        if(!req.user.id === task.user) {
            console.log('u[df')
            res.status(errorStatus)
            throw new Error(' no match ')
        }
        const upd = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(ok).json(upd)
    } catch (error) {
        next(error)
    }
}

const deleteTask = async(req, res, next) => {
    try {
        const del = await Task.findByIdAndRemove(req.params.id)
        res.status(ok).json(del)
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getTasks,
    createTask,
    updateTask,
    deleteTask
}