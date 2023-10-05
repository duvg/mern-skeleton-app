import mongoose from 'mongoose';
import router from '../routes/category.routes';

const CategorySchema = new mongoose.Schema([{
    name: {
        type: String,
        trim: true,
        required: 'Name is required'
    },

    description: {
        type: String,
        required: 'Description is required'
    },
    created: {
      type: String,
      default: String.now
    },

    
}]);
 export default mongoose.model ('category', CategorySchema)