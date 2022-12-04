const User = require("../models").User;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authService = require('../services/authentication.service')

let refreshTokens = []

exports.login = async (req, res) => {

    if (!req.body) {
        return res.status(400).send({
            message: "Content cannot be empty!"
        });
    }

    try {
        const user = await User.findOne({
            where: {
                emailAddress: req.body.emailAddress
            }
        })

        if (user == null)
            return res.status(401).send('Wrong email or password')

        if (await bcrypt.compare(req.body.password, user.password)) {

            const accessToken = authService.generateAccessToken(req.body.emailAddress)
            refreshTokens.push(accessToken.refreshToken)

            accessToken.userId = user.id
            accessToken.userName = user.name
            accessToken.userRole = user.userRole
            return res.json(accessToken).status(200)
        } else
            return res.status(401).send('Wrong email or password')
    } catch (error) {
        return res.status(500).send("An error has occurred: " + error);
    }
}

exports.refreshToken = async (req, res) => {

    if (!req.body) {
        return res.status(400).send({
            message: "Content cannot be empty!"
        });
    }

    try {
        const refreshToken = req.get('refreshToken')
        if (!refreshTokens.includes(refreshToken))
            return res.sendStatus(403)

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if (err)
                return res.status(403).json(err)

            if (!user.email)
                return res.status(403).json('No email to generate token')

            const accessToken = authService.generateAccessToken(user.email)

            refreshTokens = refreshTokens.filter(token => token !== req.body.refreshToken)
            refreshTokens.push(accessToken.refreshToken)

            return res.json(accessToken).status(200)
        })
    } catch (error) {
        return res.status(500).send("An error has occurred: " + error);
    }
}

exports.logout = async (req, res) => {

    const refreshToken = req.get('refreshToken')
    if (!refreshToken)
        return res.status(400).send({
            message: "Missing refresh token!"
        });

    if (!refreshTokens.includes(refreshToken)) {
        return res.status(204).send({
            message: "Refresh token was already deleted!"
        });
    }

    try {
        refreshTokens = refreshTokens.filter(token => token !== refreshToken)
        return res.sendStatus(204)
    } catch (error) {
        return res.status(500).send("An error has occurred: " + error);
    }

}