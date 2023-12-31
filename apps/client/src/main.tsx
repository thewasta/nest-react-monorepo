import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import {GameProvider} from "./context/gameContext.tsx";
import {socket, WebSocketProvider} from "./context/socketContext.tsx";
import {CookiesProvider, useCookies} from "react-cookie";


function GameCookieProvider({children}: { children: JSX.Element }) {
    const [cookie, setCookie] = useCookies(['rps-game']);

    if (!cookie["rps-game"]) {
        setCookie('rps-game', crypto.randomUUID());
    }

    return (
        <CookiesProvider>
            {children}
        </CookiesProvider>
    );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <GameCookieProvider>
            <WebSocketProvider value={socket}>
                <GameProvider>
                    <App/>
                </GameProvider>
            </WebSocketProvider>
        </GameCookieProvider>
    </BrowserRouter>
)
