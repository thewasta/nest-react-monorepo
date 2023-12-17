
import TaskItem from "./TaskItem.tsx";
import {useTasks} from "../context/useTasks.tsx";

function TaskList() {
    const {tasks} = useTasks()
    return (
        <div>
            {
                tasks.map(task => (
                    <TaskItem task={task} key={task._id}/>

                ))
            }
        </div>
    );
}

export default TaskList;
