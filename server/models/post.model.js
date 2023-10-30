import mongoose from 'mongoose';

const PostSchema =  new mongoose.Schema([{

  photo: {
    data:Buffer,
    contentType : String
  },

  description : {
    type: String,
    index: String,
    required: 'La descripcion es requerida'
  },
  postBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
 
  },
  user: {type: mongoose.Schema.ObjectId,
     ref: 'User',
     required: 'El usuario es requerida'},

     
  comments: [{
    text: String,
    created:{
      type:Date,
      default: Date.now
    },
    postedBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
   
    },
    

 }],

  created: {
    type: Date,
    default: Date.now
  },
  
  like: [{type: mongoose.Schema.ObjectId, ref: 'User'}],
 

}]);

export default mongoose.model('Post', PostSchema);
