import mongoose  from "mongoose";

const required = 'required';
const PaisSchema = new mongoose.Schema([{

  name: {
    type: String,
    required: `name ${required}`
  },
  create: {
    type: Date,
    default: Date.now
  },
  updated: Date
}]);
export default mongoose.model('Pais', PaisSchema);