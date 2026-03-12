import TaskList from "../components/TaskList";
import AddTask from "../components/AddTask";
import Stats from "../components/Stats";

function Dashboard(){
    return(
        <div>
            <h1>Placement Prep Tracker</h1>
            <Stats />
            <AddTask />
            <TaskList />
        </div>
    );
}

export default Dashboard;
