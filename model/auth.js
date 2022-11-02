import mongoose from 'mongoose';

const auth = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        
    },
    profile: {
        type: String,
    }
    
})

const User = mongoose.model('User',auth)
export default User