import React, {createContext, useEffect, useState} from "react";
import {createTask, createTaskRequest, deleteTaskRequest, getAllTaskRequest, Task} from "../api/task.ts";

interface TaskContext {
    tasks: Task[],
    createTask: (task: createTask) => Promise<void>,
    deleteTask: (taskId: string) => Promise<void>
}

export const taskContext = createContext<TaskContext>({
    tasks: [],
    createTask: async () => {
    },
    deleteTask: async () => {
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

    const deleteTask = async (taskId: string): Promise<void> => {
        const res = await deleteTaskRequest(taskId);
        if (res.status === 204) {
            setTasks(tasks.filter((task) => task._id !== taskId));
        }
    }
    return (
        <taskContext.Provider value={
            {
                tasks,
                createTask,
                deleteTask
            }
        }>
            {children}
        </taskContext.Provider>
    )
}