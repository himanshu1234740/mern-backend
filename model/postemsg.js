import mongoose from "mongoose";

const PostSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    title: String,
    description: String,
    selectedFiles: String,
    likeCount: [],
    createdAt: {
        type: Date,
        default: new Date()
    },
    comments: []
        
    
})
const PostMessage = mongoose.model('PostMessage', PostSchema)

export default PostMessage