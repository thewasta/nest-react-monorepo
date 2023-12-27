import {useContext} from "react";
import {GameContext} from "./gameContext.tsx";

export const useGame = () => {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error('useGame must be used within a provider')
    }
    return context;
}
