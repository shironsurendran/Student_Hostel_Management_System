const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv').config();
const authRoutes = require('./routes/authRoutes')
const app = express();
const port = 4000;
const uri = process.env.DATABASE;
const {UserModel,AdminModel} = require('./models/User');


app.use(cors());
app.use(bodyParser.json());
app.use(express.json())
mongoose.connect(uri,{ useNewUrlParser:true ,useUnifiedTopology: true, })
.then(() => console.log('Connected to MongoDB'))
.catch((error) => console.error('Error connecting to MongoDB:', error));

app.use('/auth',authRoutes);


//admin register

app.get('/', async (req,res)=>{
  try{
    const email = "admin";
    const password = 'admin@123'
    const hashRounds = 10;
    const hashPassword = await bcrypt.hash(password,hashRounds);
    const admin = new AdminModel({email: email,password:hashPassword})
    admin.save();
    res.status(200).json({message:'Admin register Successfully'});
  }
  catch(error){
    res.status(500).json({error:"Error while register"});
  }
})



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

//created by shiron