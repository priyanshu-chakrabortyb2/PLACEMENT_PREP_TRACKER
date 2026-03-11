const Task=require("../models/Task");
const mongoose=require("mongoose");

exports.createTask=async(req,res)=>{
  try{
    const {title,platform,difficulty,status:taskStatus,notes}=req.body;
    const task=new Task({
      title,
      platform,
      difficulty,
      status:taskStatus,
      notes,
      user: req.user.userId
    });

    await task.save();

    res.json({message:"Task created",task});

  }catch(err){
    res.json({error:err.message});
  }
};


exports.getTasks=async (req,res)=>{
  try{
    const {difficulty,status,page,search}=req.query;
    const filter={user:req.user.userId};
    if(difficulty){
        filter.difficulty=difficulty;
    }
    if(status){
        filter.status=status;
    }
    if(search){
      filter.title={$regex:search};
    }
    const pageNumber=parseInt(page)||1;
    const limit=5;
    const skip=(pageNumber-1)*limit;
    const tasks=await Task.find(filter).sort({createdAt:-1}).skip(skip).limit(limit);

    res.json(tasks);

  }catch(err){
    res.json({error:err.message});
  }
};

exports.updateTasks=async(req,res)=>{
  try {
    const task=await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new:true}
    )   ;
    res.json(task); 
  } catch (error) {
    res.json({error:error.message});
  }
}

exports.deleteTasks= async(req,res)=>{
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({
      message:"Task Deleted"
    });
  } catch (err) {
    res.json({error:err.message})
  }
}

exports.getTaskStats=async (req,res)=>{
  try {
    const userId=req.user.userId;

    const stats=await Task.aggregate([
      {$match:{user:new mongoose.Types.ObjectId(userId)}},
      {
        $group:{
          _id:null,
          totalTasks:{$sum:1},
          solved:{
            $sum:{$cond:[{$eq:["$status","Solved"]},1,0]}
          },
          pending:{
            $sum:{$cond:[{$eq:["$status","Pending"]},1,0]}
          },
          easy:{
            $sum:{$cond:[{$eq:["$difficulty","Easy"]},1,0]}
          },
          medium:{
            $sum:{ $cond:[{$eq:["$difficulty","Medium"]},1,0]}
          },
          hard:{
            $sum:{$cond:[{$eq:["$difficulty", "Hard"]},1,0]}
          }
        }
      }
    ]);
    const result=stats[0]||{
      totalTasks:0,
      solved:0,
      pending:0,
      easy:0,
      medium:0,
      hard:0
    }
    delete result._id;
    res.json(result);
  } catch(err){
    res.json({error:err.message});
  }
};