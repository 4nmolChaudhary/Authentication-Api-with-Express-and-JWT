import jsonwebtoken from 'jsonwebtoken'

function verify(req, res, next) {
    const token = req.header('auth-token')
    if (!token) return res.status(401).send('Access Denied !')

    try {
        const verified = jsonwebtoken.verify(token, process.env.TOKEN_SECRET)
        req.user = verified
        console.log(token)
        next()
    } catch (err) {
        res.status(400).send('Invalid Token')
    }
}

export default verify