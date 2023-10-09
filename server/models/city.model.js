import mongoose from "mongoose";

const CitySchema = new mongoose.Schema([{
    name: {
        type: String,
        trim: true,
        required: 'NAME IS REQUIRED'
    }, 
    department: {
        type: String,
        trim: true,
        required: 'DEPARTMENT IS REQUIRED'
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date,
    salt: String
}]);

export default mongoose.model('City', CitySchema);