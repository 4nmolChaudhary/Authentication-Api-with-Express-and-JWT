import express from 'express'
import verify from './verifyToken'
const router = express.Router();

router.get('/', verify, (req, res) => {
    res.send(req.user)
})

export default router