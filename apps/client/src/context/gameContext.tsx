import React, {Context, createContext, useContext, useState} from "react";
import {WebSocketContext} from "./socketContext.tsx";

interface GameStats {
    totalGames: number;
    wins: number;
}

interface PlayerInformation {
    cookie?: string | null;
    gameStats: GameStats;
    findingGame: boolean;
    playing: boolean;
}

export interface contextProp {
    updateState: (finding: boolean, playing: boolean, playerId: string) => Promise<void>;
    data: PlayerInformation;
}

export const GameContext: Context<contextProp> = createContext<contextProp>({
    data: {
        cookie: null,
        gameStats: {
            totalGames: 0,
            wins: 0,
        },
        playing: false,
        findingGame: false
    },
    updateState(): Promise<void> {
        return new Promise(resolve => resolve);
    }
});

interface Props {
    children: React.ReactNode
}

export const GameProvider: React.FC<Props> = ({children}) => {
    const socket = useContext(WebSocketContext);

    const [playerInformation, setPlayerInformation] = useState<PlayerInformation>({
        findingGame: false,
        playing: false,
        cookie: "",
        gameStats: {
            totalGames: 0,
            wins: 0,
        }
    });

    const findingGame = async (playerId: string): Promise<void> => {
        socket.emit("finding game", playerId)

        return new Promise(resolve => {
            setTimeout(() => {
                setPlayerInformation({
                    ...playerInformation,
                    findingGame: true,
                    playing: false
                })
                resolve();
            }, 300)
        });
    }

    const startGame = async (playerOneId: string, playerTwoId: string): Promise<void> => {
        socket.emit("start game", playerOneId, playerTwoId);
        return new Promise(resolve => {
            setTimeout(() => {
                setPlayerInformation({
                    ...playerInformation,
                    findingGame: false,
                    playing: true
                });
                resolve();
            }, 300)
        })
    }
    const updateState = async (finding: boolean, playing: boolean,playerId: string): Promise<void> => {
        socket.emit("finding game", playerId)

        return new Promise(resolve => {
            setTimeout(() => {
                setPlayerInformation({
                    ...playerInformation,
                    findingGame: finding,
                    playing: playing
                });
                resolve();
            }, 300)
        });
    }

    return (
        <GameContext.Provider value={
            {
                data: playerInformation,
                updateState
            }
        }>
            {children}
        </GameContext.Provider>
    );
}