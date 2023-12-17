const API_URL = 'api'

export interface Task {
    _id: string
    title: string
    description?: string
    done: boolean
    createdAt: string
    updatedAt: string
}

export type createTask = Omit<Task, '_id' | 'createdAt' | 'updatedAt'>


export const createTaskRequest = (task: createTask): Promise<any> => {
    return fetch(`${API_URL}/tasks`, {
        method: 'POST',
        body: JSON.stringify(task),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export const deleteTaskRequest = (taskId: string): Promise<any> => {
    return fetch(`${API_URL}/tasks/${taskId}`, {
        method: 'DELETE',
    })
}

export const getAllTaskRequest = () => fetch(`${API_URL}/tasks`);