const mongodb = require("mongoose");
const dataSchema = new mongodb.Schema({
    prod_name:{
        type:String,
        required:true
    },
    company:{
        type:String,
        required:true
    },
    prod_price:{
        type:String,
        required:true
    },
    prod_qty:
    {
        type:Number,
        required:true
    },
    storage:{
        type:String,
        required:true
    },
    prod_cpu:
    {
        type:String,
        required:true
    },
    type:
    {
      type:String,
      required:false  
    },
    weight:
    {
        type:String,
        required:false
    },
    display:
    {
        type:String,
        required:true
    },
    ram:
    {
        type:String,
        required:true
    }
}) 

const Productdata = new mongodb.model('Laptop-data',dataSchema)
module.exports = Productdata;