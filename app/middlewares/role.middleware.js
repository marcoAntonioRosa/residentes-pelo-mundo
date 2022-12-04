const User = require("../models").User;

exports.authRole = (role) => {

    return (req, res, next) => {

        if (role === null)
            return res.sendStatus(400)

        User.findOne({
            where: {
                emailAddress: req.user.email
            },
            attributes: ['id', 'userRole']
        }).then(data => {
            req.user.role = data.userRole
            req.user.id = data.id

            if (req.user.role !== role) {
                return res.sendStatus(401)
            }

            next()
        })


    }
}