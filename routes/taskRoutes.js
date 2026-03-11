const express=require("express");
const router=express.Router();

const authMiddleware=require("../middleware/auth");

const {createTask,getTasks,deleteTasks,updateTasks,getTaskStats}=require("../controllers/taskController");

router.post("/",authMiddleware,createTask);
router.get("/",authMiddleware,getTasks);
router.put("/:id",authMiddleware,updateTasks);
router.delete("/:id",authMiddleware,deleteTasks);
router.get("/stats",authMiddleware,getTaskStats)
module.exports=router;