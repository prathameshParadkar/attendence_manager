const mongoose = require('mongoose');
const Subject = require('../models/subject');


mongoose.connect('mongodb://127.0.0.1:27017/attendance',{useNewUrlParser:true,useUnifiedTopology:true})

const db = mongoose.connection;
db.on('error', console.error.bind(console,'connection error:'));
db.once('open',()=>{
    console.log('database connected');
})

const data =[
    {
    title:'Fosip',
    faculty:'DR. Kiran Talele',
    duration:1,
    attended:15,
    total: 17
    },
    {
    title:'Internet Technology Lab',
    faculty:'Aparna Halbe',
    duration:1,
    attended:8,
    total: 17
    },
    {
    title:'Fundamentals of Artificial Intelligence',
    faculty:'Varsha Hole',
    duration:1,
    attended:17,
    total: 17
    },
    {
    title:'Neural Networks and Fuzzy Logic',
    faculty:'Dr. Dhananjay Kalbande',
    duration:1,
    attended:10,
    total: 17
    },
];
Subject.insertMany(data)
.then(() => {
  console.log('Data inserted successfully');
})
.catch((err) => {
  console.error('Error inserting data:', err);
});


