import {ChangeEvent, FormEvent, useState} from "react";
import * as React from "react";

function TaskForm() {
    const [task, setTask] = useState({
        title: "",
        description: "",
        done: false
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setTask({
            ...task,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(task)
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="title"
                       className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2"
                       placeholder="Write a title"
                       onChange={handleChange}/>
                <textarea name="description"
                          onChange={handleChange} rows={3}
                          className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2"></textarea>
                <label className="inline-flex items-center gap-x-2">
                    <input type="checkbox"
                           className="h-5 w-5 text-indigo-600"
                           onChange={(e: ChangeEvent<HTMLInputElement>) => setTask({...task, done: e.target.checked})}/>
                    <span>Done</span>
                </label>
                <button className="bg-indigo-500 px-3 block py-2 w-full">Save</button>
            </form>
        </div>
    );
}

export default TaskForm;