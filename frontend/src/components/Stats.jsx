import { useEffect,useState } from "react";
import API from "../services/api";

function Stats(){
    const [stats,setstats]= useState({});

    useEffect(()=>{
        const fetchStats= async ()=>{
            const res= await API.get("/tasks/stats");
            setstats(res.data);
        }

        fetchStats();
    },[]);


    return (
        <div>
            <h2>Tasks</h2>
            <p>Total:{stats.totalTasks}</p>
            <p>Solved:{stats.solved}</p>
            <p>Pending:{stats.pending}</p>
            <p></p>
        </div>
    )
}

export default Stats;