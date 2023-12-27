import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import {GameProvider} from "./context/gameContext.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <GameProvider>
            <App/>
        </GameProvider>
    </BrowserRouter>
)
