const mongoose =require("mongoose");

const newPersonSchema =new mongoose.Schema({
    Name:{
        type:String,
        require:true,
       
    },
   
    Email:{
        type:String,
        require:true,
       
    },
    Password:{
        type:String,
        require:true
    },
    Age:{
        type:Number,
        require:true
    },
    Address:{
        type:String,
        require:true,
        unique:true
    },
    Avatar:{
        type:String,
        require:true
    },
    Country:{
        type:String,
        require:true
    }
},{timestamps:true})

module.exports=mongoose.model("person",newPersonSchema)