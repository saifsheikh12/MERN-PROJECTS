const mongoose=require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId


const commentSchema=new mongoose.Schema({

content:{
    type:String,
    require:true
},

  isDeleted:{
    type: Boolean,
    default: false
  },


},{timestamps:true})

module.exports=mongoose.model("comment",commentSchema)
