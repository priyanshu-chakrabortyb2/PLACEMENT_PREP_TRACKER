import { useEffect,useState } from "react";
import API from "../services/api";

function AddTask(){
    const [title,settitle]= useState("");
    const handleAdd =async()=>{
        await API.post("/tasks",{title});
        alert("Task Added");
        window.location.reload();
    }



    return (
        <div>
            <h2>Add Task</h2>
            <input placeholder="Task Title" onChange={(e)=>settitle(e.target.value)} />
            <button onClick={handleAdd}>Add</button>
        </div>
    )
}

export default AddTask;
