const mongoose=require("mongoose");

const TaskSchema=new mongoose.Schema({
  title:{
    type:String,
    required:true
  },
  platform:{
    type:String
  },
  difficulty:{
    type:String,
    enum:["Easy","Medium","Hard"]
  },
  status:{
    type:String,
    enum:["Pending","Solved"],
    default: "Pending"
  },
  notes:{
    type:String
  },
  deadline:{
    type:Date
  },
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  }},
  {timestamp:true}
);

TaskSchema.index({title:"text"});

module.exports=mongoose.model("Task", TaskSchema);