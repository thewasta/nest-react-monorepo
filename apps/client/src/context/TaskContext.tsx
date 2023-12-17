import React, {createContext, useEffect, useState} from "react";
import {createTask, createTaskRequest, getAllTaskRequest, Task} from "../api/task.ts";

interface TaskContext {
    tasks: Task[],
    createTask: (task: createTask) => void
}

export const taskContext = createContext<TaskContext>({
    tasks: [],
    createTask: () => {
    }
});

interface Props {
    children: React.ReactNode
}

export const TaskProvider: React.FC<Props> = ({children}) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    useEffect(() => {
        getAllTaskRequest()
            .then((response) => response.json())
            .then(setTasks);
    }, []);

    const createTask = async (task: createTask) => {
        const res = await createTaskRequest(task);
        const json = await res.json()
        setTasks([...tasks, json])
    }
    return (
        <taskContext.Provider value={
            {
                tasks,
                createTask
            }
        }>
            {children}
        </taskContext.Provider>
    )
}