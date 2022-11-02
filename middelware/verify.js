import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
dotenv.config()
const KEY = process.env.SECRET_KEY

const fetchuser = (req, res, next) => {
    const headers = req.header('auth-token')
    
    if (!headers) {
        res.status(401).send({ error: 'please autanticate a valid informations' })
    }
    try {
        const data = jwt.verify(headers, KEY)
        req.user = data.user
        
        next();
    } catch (error) {
        res.status(404).send(error)
    }

}
export default fetchuser