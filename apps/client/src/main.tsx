import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import FindMatch from "./page/findMatch.tsx";
import PlayingGame from "./page/playingGame.tsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
    },
    {
        path: '/find',
        element: <FindMatch/>
    },
    {
        path: '/playing',
        element: <PlayingGame/>
    }
]);
ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>,
)
