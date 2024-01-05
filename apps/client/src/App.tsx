import {Navigate, Route, Routes} from "react-router-dom";
import PlayingGame from "./page/playingGame.tsx";
import HomePage from "./page/homePage.tsx";
import {useSocket} from "./context/socketContext.tsx";

const PrivateWrapper = ({children, isPlaying}: { children: JSX.Element; isPlaying: boolean }) => {
    return isPlaying ? children : <Navigate to="/" replace/>;
};

function App() {
    const {isPlaying} = useSocket();

    return (
        <Routes>
            <Route path='/playing' element={(
                <PrivateWrapper isPlaying={isPlaying}>
                    <PlayingGame/>
                </PrivateWrapper>
            )}>
            </Route>
            <Route path='/' element={<HomePage/>}>
            </Route>
        </Routes>
    )
}

export default App
