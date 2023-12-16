const API_URL = 'api'

export interface Task {
    title: string
    description?: string
    done: boolean
}

export const createTaskRequest = (task: Task): Promise<any> => {
    return fetch(`${API_URL}/tasks`, {
        method: 'POST',
        body: JSON.stringify(task),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}