const jwt = require('jsonwebtoken');

exports.generateAccessToken = (emailAddress) => {
    
    try {

        const userHead = {
            email: emailAddress
        }
    
        const accessToken = jwt.sign(userHead, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m'})
        const refreshToken = jwt.sign(userHead, process.env.REFRESH_TOKEN_SECRET)
    
        const access = {
            accessToken: accessToken,
            refreshToken: refreshToken
        }
    
        return access
    } catch (error) {
        return res.status(500).send("An error has occurred: " + error);
    }

}