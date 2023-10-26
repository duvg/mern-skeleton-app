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

    // user: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
    // like: [{ type: mongoose.Schema.ObjectId, ref: 'Post' }],
    comment: { type: mongoose.Schema.ObjectId, ref: 'Post' }
}])

export default mongoose.model('Post', PostSchema);