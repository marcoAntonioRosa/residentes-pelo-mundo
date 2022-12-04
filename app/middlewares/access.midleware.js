const User = require("../models").User;
const Testimony = require("../models").Testimony
const { ROLE } = require('../utils/definitions');

exports.canModify = async (req, res, next) => {

    const loggedUser = await User.findOne({
        where: {
            emailAddress: req.user.email
        },
        attributes: ['id', 'userRole']
    })

    if (!loggedUser)
        return res.status(404).send('Logged user not found')

    req.user.id = loggedUser.id
    req.user.role = loggedUser.userRole

    const isSelf = req.user.id == req.params.id;
    if (!isSelf) {
        const loggedUserIsAdmin = req.user.role === ROLE.admin
        if (!loggedUserIsAdmin)
            return res.status(403).send('Students can only modify themselves')

        const userInParameter = await User.findOne({
            where: {
                id: req.params.id
            },
            attributes: ['id', 'userRole']
        })

        if (!userInParameter)
            return res.status(404).send('User in parameter not found')

        const userInParameterIsAdmin = userInParameter.userRole === ROLE.admin
        if (userInParameterIsAdmin)
            return res.status(403).send('Admins can only modify themselves')
    }

    next()

}

exports.canModifyTestimony = async (req, res, next) => {

    const loggedUser = await User.findOne({
        where: {
            emailAddress: req.user.email
        },
        attributes: ['id', 'userRole']
    })

    if (!loggedUser)
        return res.status(404).send('Logged user not found')

    req.user.id = loggedUser.id
    req.user.role = loggedUser.userRole

    const loggedUserIsAdmin = req.user.role === ROLE.admin
    if (!loggedUserIsAdmin) {

        const testimonyInParameter = await Testimony.findOne({
            where: {
                id: req.params.id
            },
            attributes: ['studentId']
        })

        if (!testimonyInParameter)
            return res.status(404).send('Testimony in parameter not found')

        const loggedUserOwnsTestimony = testimonyInParameter.studentId === req.user.id
        if (!loggedUserOwnsTestimony)
            return res.status(403).send('This testimony does not belong to the student logged in')
    }

    next()

}