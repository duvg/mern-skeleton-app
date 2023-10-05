import mongoose from "mongoose";

const required = 'requerid';
const ProductSchema = new mongoose.Schema([{

  name: {
    type: String,
    required: `name ${required} `
  },
  stock:{
    type: Number,
    required: `stock ${required}`
  },
  price: {
    type: Number,
    required: `price ${required}`
  },
  create: {
    type: Date,
    default: Date.now
  },
  updated: Date
}]);

export default mongoose.model('Product', ProductSchema);