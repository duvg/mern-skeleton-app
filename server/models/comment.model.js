import mongoose from 'mongoose';

const require = 'field is required';

const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: `Text ${require}`
  },

  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

export default mongoose.model('Comment', commentSchema);
