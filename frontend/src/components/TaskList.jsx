import { useEffect,useState } from "react";
import API from "../services/api";

function taskList(){
    const [task,settask]= useState([]);

    useEffect(()=>{
        const fetchTasks= async ()=>{
            const res= await API.get("/tasks");
            settask(res.data);
        }

        fetchTasks();
    },[]);


    return (
        <div>
            <h2>Tasks</h2>
            {task.map((task)=>(
                <div key={task._id}>
                    {task.title}-{task.status}
                </div>
            ))}
        </div>
    )
}

export default taskList;
