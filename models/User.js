const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullname: String,
  email: String,
  password: String,
  type:Number,
},
{
  collection: 'users',
  timestamps:true,
}
);

const User = mongoose.model('User', userSchema);

module.exports = User;
