import mongoose from 'mongoose';
const CategorySchema = new mongoose.Schema([{

  name: {
    type: String,
    trim: true,
    require: 'name is required'
  },
  description:{
    type: String,
    trim: true,
    unique: true,
    index: true,
    math: [/.+\@.+\..+/, 'Please fill a valid email address']
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: Date
}]);

export default mongoose.model('Category', CategorySchema);