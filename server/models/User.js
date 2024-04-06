const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: String,
    email:{
      type:String,
      required: true
    },
    password: String,
    phone: Number,
    dob:String,
    address:String,
    regno: String,
    bloodgroup: String,
    room:String,
    dept:String
  });
const UserModel = mongoose.model('User', userSchema);

const adminSchema = new mongoose.Schema({
  email:{
    type:String,
    unique:true,
    required: true
  },
  password:String,
})
const AdminModel = mongoose.model('Admin',adminSchema);

module.exports = {UserModel,AdminModel}
  