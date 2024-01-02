import {createContext} from "react";
import {io, Socket} from "socket.io-client";

export const socket = io("/", {
        transports: ["websocket"],
    }
)


export const WebSocketContext = createContext<Socket>(socket);
export const WebSocketProvider = WebSocketContext.Provider;