import {useEffect, useState} from "react";
import {getAllTaskRequest, Task} from "../api/task.ts";
import TaskItem from "./TaskItem.tsx";

function TaskList() {
    const [tasks, setState] = useState<Task[]>([])
    useEffect(() => {
        getAllTaskRequest()
            .then((response) => response.json())
            .then(setState);
    }, []);

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
