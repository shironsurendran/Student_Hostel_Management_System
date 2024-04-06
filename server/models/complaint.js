const mongoose = require('mongoose');


const complaintSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  }
});


module.exports =  mongoose.model('Complaint', complaintSchema);

