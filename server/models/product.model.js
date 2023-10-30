import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema([{
  name: {
    type: String,
    trim: true,
    required: 'Name is required'
  },
  stock:{
    type: Number,
    required: 'stock is required'
  },

  price: {
    type: Number,
    index: true,
    required: 'price is required'
  },
  updated: Date,
  salt: String,

  category:{
    type: mongoose.Schema.ObjectId,
    ref:'Category'
  },

}]);



export default mongoose.model('Product', ProductSchema);