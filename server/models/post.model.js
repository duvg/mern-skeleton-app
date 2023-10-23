import mongoose from "mongoose";

const PostSchema = new mongoose.Schema([{
    title: {
        type: String,
        trim: true,
        required: 'Content is required'
    },
    description: {
        type: String,
        trim: true
    }, 
    created: {
        type: Date,
        default: Date.now
    },
    update: Date,
    salt: String,
}])

export default mongoose.model('Post', PostSchema);