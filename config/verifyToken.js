
const jwt = require('jsonwebtoken')
//jika tidak ada request header Authorization,
// beri response 303 Access Denied
const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')
    if (!token) return res.status(400).json({
        status: res.statusCode,
        message: 'Access Denied'
    })

    try {
        // berify token dengan SECRET KEY
        const verified = jwt.verify(token, process.env.SECRET_KEY) // verify
        res.user = verified
        next() // melanjutkan proses berikutnya
    } catch (error) {
        // jika Token Invalid
        // beri response 400 Invalid Token
        res.status(400).json({
            status: res.statusCode,
            message: 'Invalid Token'
        })
    }
}

module.exports = verifyToken