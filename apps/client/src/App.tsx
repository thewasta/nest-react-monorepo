import TaskList from "./components/TaskList.tsx";
import TaskForm from "./components/TaskForm.tsx";
import {TaskProvider} from "./context/TaskContext.tsx";

function App() {
    return (
        <div className="bg-zinc-900 h-screen text-white flex items-center justify-center">
            <div className="bg-gray-950 p-4 w1/5">
                <h1 className="text-3xl font-bold text-center block my-2">Applicación de tareas</h1>
                <TaskProvider>
                    <TaskForm/>
                    <TaskList/>
                </TaskProvider>
            </div>
        </div>
    )
}

export default App
