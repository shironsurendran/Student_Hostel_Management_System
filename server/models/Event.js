const mongoose = require('mongoose')
const eventSchema = new mongoose.Schema({
  eventName: String,
  eventDate: String, 
  eventTime : String,
  // eventEndTime:String,
  eventLocation: String,
  eventDescription: String,
  eventImage: String,
  eventDay: String,
  room:String
});

const Event = mongoose.model('Event', eventSchema);

const eventRegSchema = new mongoose.Schema({
  name: String,
  email: String,
  Regdate: {
    type: String,
    required: true,
  },
  eventName: String,
  eventDate: String,
  eventDay: String,
  eventTime: String,
  status: String,
  // eventEndTime:String,
  eventLocation: String,
  eventDescription: String,
  eventImage: String,
  room:String
});


const EventRegister = mongoose.model('EventRegister', eventRegSchema);

module.exports = { Event,EventRegister };
