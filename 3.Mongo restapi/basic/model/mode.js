const mongoose = require("mongoose");
const dataSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    college:{
        type:String,
        required:true
    },
    Erno:{
        type:String,
        required:true
    },
    sem:{
        type:String
    },
})

const Studentdata = new mongoose.model('student-data',dataSchema);

module.exports = Studentdata;