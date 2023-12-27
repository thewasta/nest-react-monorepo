import {Navigate, Route, Routes} from "react-router-dom";
import PlayingGame from "./page/playingGame.tsx";
import HomePage from "./page/homePage.tsx";
import {useGame} from "./context/useGame.tsx";

const PrivateWrapper = ({children, isPlaying}: { children: JSX.Element; isPlaying: boolean }) => {
    return isPlaying ? children : <Navigate to="/" replace/>;
};

function App() {
    const {data} = useGame();

    return (
        <Routes>
            <Route path='/playing' element={(
                <PrivateWrapper isPlaying={data.playing}>
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
