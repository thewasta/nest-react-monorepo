import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import {SocketProvider} from "./context/socketContext.tsx";
import {CookiesProvider} from "react-cookie";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <CookiesProvider>
        <BrowserRouter>
            <SocketProvider>
                    <App/>
            </SocketProvider>
        </BrowserRouter>
    </CookiesProvider>
)
