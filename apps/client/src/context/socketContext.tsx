import {createContext, useCallback, useContext, useEffect, useState} from "react";
import {io, Socket} from "socket.io-client";
import {useCookies} from "react-cookie";
import {SocketEvents, SocketGameEvents} from "../events/socket.events.ts";

export const socket = io("/", {
        transports: ["websocket"],
    }
);

interface PlayerInterface {
    id: string; // cookie
    total: number;
    wins: number;
}
interface SocketContextInterface {
    player: string;
    socket: Socket;
    totalPlayers: number;
    isPlaying: boolean;
    joinGame: (playerId: string) => void;
    startGame: (playerId: string) => void;
    quitGame: (playerId: string) => void;
}

const WebSocketContext = createContext<SocketContextInterface>({
    gameId: "",
    socket: socket,
    totalPlayers: 0,
    isPlaying: false,
    startGame: () => {
    },
    quitGame: () => {
    },
    joinGame: () => {
    }
});
export const useSocket = (): SocketContextInterface => {
    const context = useContext(WebSocketContext);
    if (!context) {
        throw new Error("This should be within a SocketProvider")
    }
    return context;
};

export function SocketProvider({children}: { children: JSX.Element }) {
    const {socket} = useSocket();
    const [cookie, setCookie] = useCookies(["rps-game"]);
    const [countPlayers, setCountPlayers] = useState<number>(0);
    const [userIsPlaying, setUserIsPlaying] = useState<boolean>(false);
    const [playerCurrentGame, setPlayerCurrentGame] = useState<string>()

    const handleJoinGame = useCallback((playerId: string) => {
        socket.emit<SocketGameEvents>('find game', playerId);
        setUserIsPlaying(true);
    }, []);

    const handleQuitGame = useCallback((playerId: string) => {
        socket.emit<SocketGameEvents>('finish game', {playerId});
        setUserIsPlaying(false);
    }, []);

    const handleStartGame = useCallback((gameId: string) => {
        setUserIsPlaying(true);
        socket.emit<SocketGameEvents>('start game', gameId);
    }, []);

    //@todo Fix bug when user first time connection, cookie is null and backend throw error
    useEffect(() => {
        if (!cookie["rps-game"]) {
            setCookie("rps-game", crypto.randomUUID());
        }
        socket.emit<SocketEvents>("start session");
        return () => {
            socket.off<SocketEvents>("start session");
        }
    }, []);

    useEffect(() => {
        socket.on<SocketEvents>('total players', (totalPlayers: number) => {
            setCountPlayers(totalPlayers);
        });
        socket.on<SocketGameEvents>("find game", (gameId: string) => {
            setPlayerCurrentGame(gameId);
        })
        return () => {
            socket.off<SocketEvents>('total players');
            socket.off<SocketGameEvents>("find game");
        }
    }, [socket]);

    return (
        <WebSocketContext.Provider value={{
            gameId: playerCurrentGame,
            socket: socket,
            totalPlayers: countPlayers,
            isPlaying: userIsPlaying,
            startGame: handleStartGame,
            joinGame: handleJoinGame,
            quitGame: handleQuitGame,
        }}>
            {children}
        </WebSocketContext.Provider>
    )
}