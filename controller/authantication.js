import User from "../model/auth.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import * as dotenv from 'dotenv'
dotenv.config()

export const register = async (req, res,) => {
    if (!req.body) {
        return res.status(404).send({ message: "Field is empty" })
    }
    const password = req.body.password
    const cpassword = req.body.cpassword
    const email = req.body.email
    const username = req.body.username
    const data = await User.findOne({ username }).select({ username: 1, email: 1 })
    
    if (data === null) {
        if (password === cpassword) {
            const getSalt = await bcrypt.genSalt(10)
            const hash = await bcrypt.hash(password, getSalt)
            const register = new User({
                username: username,
                email: email,
                password: hash,
                name: req.body.name
            })
            try {
                const data = await register.save(register)
                const token = jwt.sign({ user: data._id }, process.env.SECRET_KEY);
                res.json({ token, data })
            } catch (error) {
                res.send("Internal server error")
            }
        } else {
            res.send("password does not match")
        }
    } else {
        res.send("Username already Exist")
    }
}

export const login = async (req, res) => {

    try {
        const data = await User.findOne({ username: req.body.username })
        if (!data) {
            return res.send("invalid informations")
        }
        const compare = await bcrypt.compare(req.body.password, data.password)
        if (compare) {
            const token = jwt.sign({ user: data._id }, 'himanshuisacoderandgraficdeginer');
            res.json({ token, data })
        } else {
            res.send("invalid informations")
        }
    } catch (error) {
        res.status(500).send(error)
    }

}

export const getUser = (req, res) => {

    User.find().select("-password").then((user) => {
        res.send(user)
    }).catch((err) => {
        console.log(err)
    })

}
export const updateUser = (req, res) => {
    const username = req.body.username
    const id = req.params.id
    User.findOne({ username }).select({ username: 1 }).then((data) => {
            if (!data||(id===data._id.toString())) {
            const id = req.params.id
            const data = req.body
            User.findByIdAndUpdate({ _id: id }, data, { new: true }).then((user) => {
                res.send(user)
            }).catch((err) => {
                console.log(err)
            })
        } else {
            res.send("username must be unique")
        }

    }).catch((err) => {
        console.log(err)
    })
}
export const userdata = (req, res) => {
    const id = req.params.id

    User.findOne({ _id: id }).select("-password").then((data) => {
        res.send(data)
    }).catch((err) => {
        console.log(err)
    })
}


export const profileUpdate = (req, res) => {
    const id = req.params.id
    const profile = req.file.filename
    User.findByIdAndUpdate({ _id: id }, { profile }, { new: true }).then((data) => {
        res.send(data)
    }).catch((err) => {
        console.log(err)
    })
}
