const User = require("../models").User;
const bcrypt = require('bcrypt');

exports.create = async (req, res) => {
    
    if (!req.body) {
        return res.status(400).send({
            message: "Content cannot be empty!"
        });
    }

    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        req.body.password = hashedPassword

        const userCreated = await User.create(req.body)

        if (userCreated.dataValues.id)
            return res.sendStatus(201)
        else
            return res.status(500).send("An error has occurred.")
    } catch (error) {
        return res.status(500).send("An error has occurred: " + error);
    }
};

exports.findAll = async (req, res) => {

    try {
        const rawUsers = await User.findAll({
            attributes: ['id', 'name', 'emailAddress', 'userRole']
        })

        if (rawUsers) {

            let records = rawUsers.map(result => result.dataValues)
            return res.status(200).send(records)
        }
            
        else
            return res.status(404).send("No user found")
    } catch (error) {
        return res.status(500).send("An error has occurred: " + error);
    }
};

exports.findOne = async (req, res) => {

    if (!req.params) {
        return res.status(400).send({
            message: "Params cannot be empty!"
        });
    }

    try {
        const id = req.params.id;
        const user = await User.findByPk(id, {
            attributes: ['id', 'name', 'emailAddress', 'userRole']
        })
        if (user)
            return res.status(200).send(user)
        else
            return res.status(404).send("User not found")
    } catch (error) {
        return res.status(500).send("An error has occurred: " + error);
    }
};

exports.update = async (req, res) => {

    if (!req.body) {
        return res.status(400).send({
            message: "Content cannot be empty!"
        });
    }

    if (!req.params) {
        return res.status(400).send({
            message: "Params cannot be empty!"
        });
    }

    try {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(req.body.password, salt)
            req.body.password = hashedPassword
        }

        const id = req.params.id;

        const userUpdated = await User.update(req.body, {
            where: {
                id: id
            }
        })

        if (userUpdated == 1)
            return res.status(200).json({ message: 'User updated successfully.' })
        else
            return res.status(500).json({ message: 'Error while trying to update User.' })
    } catch (error) {
        return res.status(500).json({ message: 'An error has occurred', value: error });
    }

};

exports.delete = async (req, res) => {

    if (!req.params) {
        return res.status(400).send({
            message: "Params cannot be empty!"
        });
    }

    try {
        const id = req.params.id;
        const userDestroyed = await User.destroy({
            where: {
                id: id
            }
        })

        if (userDestroyed == 1)
            return res.status(200).json({ message: 'User deleted successfully' });
        else
            return res.status(500).json({ message: "Error while trying to update user" });
    } catch (error) {
        return res.status(500).json({ message: 'An error has occurred', value: error });
    }
};