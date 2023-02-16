const mongoose=require("mongoose")


const postSchema=new mongoose.Schema({
title:{
    type:String,
    require:true
},
content:{
    type:String,
    require:true
},



isDeleted:{
    type: Boolean,
    default: false
  },


},{timestamps:true})

module.exports=mongoose.model("post",postSchema)
