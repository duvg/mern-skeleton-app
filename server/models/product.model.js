import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema([{
  name: {
    type: String,
    trim: true,
    required: 'Name is required'
  },

stock: {
  type: Number,
  trim: true,
  required: 'Stock is required'
},

price: {
  type: Number,
  trim: true,
required: 'Price is required'
},

category: {
  type: mongoose.Schema.ObjectId,
  ref: 'Category',
required: 'Category is required'

}


}]);

export default mongoose.model('Product', ProductSchema);