import React, {Context, createContext, useState} from "react";

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
    updateState: (finding: boolean, playing: boolean) => Promise<void>;
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
    const [playerInformation, setPlayerInformation] = useState<PlayerInformation>({
        findingGame: false,
        playing: false,
        cookie: "",
        gameStats: {
            totalGames: 0,
            wins: 0,
        }
    });

    const findingGame = async (): Promise<void> => {
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

    const startGame = async (): Promise<void> => {
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
    const updateState = async (finding: boolean, playing: boolean,): Promise<void> => {
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