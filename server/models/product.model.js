import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema([{
    name: {
        type: String,
        trim: true,
        required: 'Name is required'
    },
    stock: {
        type: Number,
        required: 'Stock is required'
    },
    price: {
        type: Number,
        required: 'Price is required'
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date,
    salt: String
}]);

export default mongoose.model('Product', ProductSchema);