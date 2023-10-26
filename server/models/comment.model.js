import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema([{
    comment: {
        type: String,
        trim: true,
        required: 'Comment is required'
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date,

    post: { type: mongoose.Schema.ObjectId, ref: 'Post' }
}]);

export default mongoose.model('Comment', CommentSchema)




