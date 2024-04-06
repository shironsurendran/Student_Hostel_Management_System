const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {UserModel,AdminModel} = require('../models/User');
const Announcement = require('../models/announcement');
const Complaint= require('../models/complaint');

const mongoose = require('mongoose');

const { Event ,EventRegister} = require('../models/Event');

const signup = async (req,res)=>{
    try{
        const {name,email,password,phone,dept,address,bloodgroup,room,regno,dob} = req.body;
        console.log(regno);
        const existingUser = await UserModel.findOne({email});
        if(existingUser){
            return res.status(400).json({error: 'Email already in use'});
        }
        const saltRounds = 10;
        const hashPassword = await bcrypt.hash(password,saltRounds);
        console.log("check");
        const user = new UserModel({name,email,password: hashPassword,phone: Number(phone),dept,dob,regno,room,address,bloodgroup});
        // console.log(user);
        await user.save()
        const token = jwt.sign({userId: user._id},process.env.JWT_SECRET,{
            expiresIn:'1h',
        });
        res.status(200).json({message: "User registered successfully",token});
      }

    catch(error){
        res.status(500).json({error:"Error while registering "});
    }
};


const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: 'User not found' });
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid password' });
      }
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });
      res.status(200).json({ message: 'Login successful', token, email: user.email ,name:user.name });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ error: 'Error during login' });
    }
  };
  
  const adminLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
      const admin = await AdminModel.findOne({ email });
  
      if (!admin) {
        return res.status(400).json({ error: 'Admin not found' });
      }
  
      const comparePassword = await bcrypt.compare(password, admin.password);
  
      if (!comparePassword) {
        return res.status(401).json({ error: 'Password Invalid' });
      }
  
      const token = jwt.sign({ userId: admin._id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });
  
      return res.status(200).json({ message: 'Login Successful', token, admin });
    } catch (error) {
      console.error('Error during login', error);
      return res.status(500).json({ error: 'Error occurs during login' });
    }
  };
  

  const createEvent = async (req, res) => {
    const eventData = req.body;
    const existingEvent = await Event.findOne({ eventName: eventData.eventName });
  
    if (existingEvent) {
      return res.status(400).json({ message: 'Event with the same name already exists' });
    }
  
    try {
      const event = new Event(eventData);
      await event.save();
      res.status(200).json({ message: 'Event saved successfully', event: event });
    } catch (error) {
      res.status(500).json({ message: 'Error creating event' });
    }
  };
  
  const EditEvent = async (req,res)=>{
    try {
      const { eventName } = req.body;
      const updatedEventData = req.body; 
      const event = await Event.findOneAndUpdate(
        { eventName },
        updatedEventData,
        { new: true }
      );
      if (event) {
        return res.status(200).json({ event });
      } else {
        return res.status(404).json({ message: 'Event not found' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

  const Userfetch = async(req,res)=>{
    try{
      const token = req.body.token;
      const verifyToken = jwt.verify(token,process.env.JWT_SECRET);
      const user = await UserModel.findOne({_id:verifyToken.userId});
      if(!user){
        res.json({error:'No user Found'});
      }
      res.status(200).json({message:'user fetch successfull',user})
    }
    catch(error){
      res.status(500).json({error:'error occurs while fetch user data'})
    }
  }
  
  const UserEventReg = async(req,res)=>{
    try{
      const {token,event} = req.body;
      const verifyToken = jwt.verify(token,process.env.JWT_SECRET);
      const user = await UserModel.findOne({_id:verifyToken.userId});
      if(!user){
        res.json({error:'No user Found'});
      }
      const userReg = new EventRegister({
        name : user.name,
        email: user.email,
        eventName: event.eventName,
        eventDate: event.eventDate,
        eventTime: event.eventTime,
        eventEndTime: event.eventEndTime,
        eventLocation: event.eventLocation,
        status: 'Register success',
        eventDay: event.eventDay,
        eventDescription: event.eventDescription,
        eventImage: event.eventImage,
        room:event.room,
        Regdate: new Date().toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'numeric',
          year: 'numeric',
        }),
      });
       userReg.save();

      res.status(200).json({message:'user Event Register successfull',userReg})
    }
    catch(error){
      res.status(500).json({error:'error occurs while fetch user data'})
    }
  }

  const Eventfetch = async (req,res)=>{
    try{
      const event = await Event.find();
      if(!event){
        res.json({error: 'No Event found'});
      }
      res.status(200).json(event);
    }
    catch(error){
      res.status(500).json({error: "Event fetch error"});
    }
}

const getEventReg = async (req, res) => {
    try {
      const events = await EventRegister.find();
      res.json(events);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  }
//all user
  const getUser = async (req, res) => {
    try {
      const user = await UserModel.find();
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  }

//userprofile
const UserProfile = async(req,res)=>{
  const { name, phone, password,userEmail } = req.body;
  try {
    const hashPassword = await bcrypt.hash(password, 10); 
    const updatedUser = await UserModel.findOneAndUpdate({ email: userEmail },
      { name, phone, password: hashPassword },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.json(updatedUser);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'server error' });
  }
}

//announcement

const announcement = async (req, res) => {
  try {
    const { mtext } = req.body;
    console.log("hi",req.body);
    const announcement = new Announcement({ text:mtext });
    await announcement.save();
    res.status(201).json({ message: 'Announcement saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
}

const ViewAnnounce= async (req, res) => {
  try {
    const announcements = await Announcement.find();
    res.status(200).json(announcements);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
};

//complaint
const complaint = async (req, res) => {
  try {
    const { mtext } = req.body;
    console.log("hi",req.body);
    const complaint = new Complaint({ text:mtext });
    await complaint.save();
    res.status(201).json({ message: 'Complaint saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
}

const ViewComplaint= async (req, res) => {
  try {
    const complaint = await Complaint.find();
    res.status(200).json(complaint);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
};



module.exports ={
    signup,login,adminLogin,createEvent,Userfetch, Eventfetch,UserEventReg,getEventReg,getUser,UserProfile,EditEvent,announcement,ViewAnnounce,complaint,ViewComplaint
}