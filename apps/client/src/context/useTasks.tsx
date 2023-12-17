import {useContext} from "react";
import {taskContext} from "./TaskContext.tsx";


export const useTasks = () => {
    const context = useContext(taskContext)
    if (!context) {
        throw new Error('useTask must to be used within a Provider')
    }
    return context;
}