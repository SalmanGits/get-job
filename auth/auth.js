const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.secret;

function Auth(req, res, next) {
    try {
        const {token} = req.headers
        if (!token) {
            return res.status(401).json({
                message: 'Invalid Token Format'
            })
        }
        const decode = jwt.verify(token, SECRET_KEY);
   
        req.user = decode.existingUser
        req.user.password = null
        next()
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({
                message: 'Session Expired',
                success: false,
            })
        }
        if (error instanceof jwt.JsonWebTokenError || error instanceof TokenError) {
            return res.status(401).json({
                message: 'Invalid Token',
                success: false,
            })
        }
        res.status(500).json({
            success: false,
            message: 'Internal server Error',
           
        });
    }
}

module.exports = Auth