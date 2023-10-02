import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema([{
    name: {
        type: String,
        trim: true,
        unique: true,
        required: 'Name is required'
    },
    description: {
        type: String,
        trim: true,
    }
}])

export default mongoose.model('Category', CategorySchema);