import express from "express";
import {getPost,createUser,likeUpdate,findpost,comments,fetchComment,delet } from '../controller/postes.js';
import {register,login,getUser,updateUser,userdata,profileUpdate} from '../controller/authantication.js'

import multer from "multer";
import fetchuser from "../middelware/verify.js";
const route = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'upload/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix + '-' + file.originalname)
  
    }
  })
  
  const upload = multer({ storage: storage })

route.get('/',getPost)
route.post('/api/user',upload.single('selectedFiles'),fetchuser,createUser)
route.patch('/api/like/:id',fetchuser,likeUpdate)
route.get('/api/findpost/:id',fetchuser,findpost)
route.patch('/api/comment/:id',fetchuser,comments)
route.get('/api/fetchComment/:id',fetchuser,fetchComment)
route.delete('/api/delete/:id',fetchuser,delet)

// user authantications

const profileImage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'profile/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + '-' + file.originalname)

  }
})

const profile = multer({ storage: profileImage })

route.post('/api/register',register)
route.post('/api/login',login)
route.get('/api/getUser',getUser)
route.get('/api/userdata/:id',fetchuser,userdata)
route.put('/api/updateUser/:id',fetchuser,updateUser)
route.patch('/api/profileUpdate/:id',fetchuser,profile.single('profile'),profileUpdate)


export default route 