const jwt = require('jsonwebtoken');

exports.authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (!token) {
        return res.status(401).send({
            message: 'Token is null'
        });
    }
        

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        
        if (err) {
            return res.status(401).send({
                message: 'Error on Token validation'
            });
        }

        req.user = user

        next()
    })
}