import mongoose from "mongoose";

const DepartmentSchema = new mongoose.Schema([{
    name: {
        type: String,
        trim: true,
        required: 'NAME IS REQUIRED'
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date,
    salt: String
}]);

export default mongoose.model('Deparment', DepartmentSchema);