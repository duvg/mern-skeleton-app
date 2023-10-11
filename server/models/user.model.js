import mongoose from 'mongoose';
import crypto from 'crypto';

const UserSchema = new mongoose.Schema([{
  name: {
    type: String,
    trim: true,
    required: 'Name is required'
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    index: true,
    math: [/.+\@.+\..+/, 'Please fill a valid email address'],
    required: 'Email is required'
  },
  about: {
    type: String,
    trim: true
  },
  photo: {
    data: Buffer,
    contentType: String
  },
  created: {
    type: Date,
    default: Date.now
  },
  updated: Date,
  hashed_password: {
    type: String,
    required: 'Password is required'
  },
  salt: String,
  following: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
  followers: [{ type: mongoose.Schema.ObjectId, ref: 'User' }]

}]);

UserSchema.virtual('password')
  .set(function(password){
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function(){
    return this._password;
  });

UserSchema.path('hashed_password').validate(function(v) {
  if (this._password && this._password.length < 6) {
    this.invalidate('password', 'Password must be at least 6 characters.')
  }
  if (this.isNew && !this._password) {
    this.invalidate('password', 'Password is required')
  }
}, null)

UserSchema.methods = {
  authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },
  encryptPassword: function(password) {
    if(!password) return '';
    try {
      return crypto
        .createHmac('sha1', this.salt)
        .update(password)
        .digest('hex')
    } catch (err) {
      return '';
    }
  },
  makeSalt: function() {
    return Math.round((new Date().valueOf() * Math.random())) + '';
  }
};

export default mongoose.model('User', UserSchema);