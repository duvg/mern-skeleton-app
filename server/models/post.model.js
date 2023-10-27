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
  

    user: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
    // like: [{ type: mongoose.Schema.ObjectId, ref: 'Post' }],
    // comment: { type: mongoose.Schema.ObjectId, ref: 'Comment' }
}], {timestamps: true})

export default mongoose.model('Post', PostSchema);