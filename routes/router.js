import express from "express";
import {getPost,createUser,likeUpdate,findpost,comments,fetchComment,delet } from '../controller/postes.js';
import {register,login,getUser,updateUser,userdata,profileUpdate} from '../controller/authantication.js'

import multer from "multer";
import fetchuser from "../middelware/verify.js";
const route = express.Router()
  
const upload = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    if(!file.mimetype.match(/jpg|JPG|jpeg|png|gif$i/)){
      cb(new Error("file not supported"),false)
      return
    }
    cb(null, true)
  }
})

route.get('/',getPost)
route.post('/api/user',upload.single('selectedFiles'),fetchuser,createUser)
route.patch('/api/like/:id',fetchuser,likeUpdate)
route.get('/api/findpost/:id',fetchuser,findpost)
route.patch('/api/comment/:id',fetchuser,comments)
route.get('/api/fetchComment/:id',fetchuser,fetchComment)
route.delete('/api/delete/:id',fetchuser,delet)

// user authantications



route.post('/api/register',register)
route.post('/api/login',login)
route.get('/api/getUser',getUser)
route.get('/api/userdata/:id',fetchuser,userdata)
route.put('/api/updateUser/:id',fetchuser,updateUser)
route.patch('/api/profileUpdate/:id',fetchuser,upload.single('profile'),profileUpdate)


export default route 