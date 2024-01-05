import {GameActions} from "../game.gateway";

interface GameRound {
    round: number;
    playerOne: GameActions | null;
    playerTwo: GameActions | null;
    winner: string
}

export interface GameInterface {
    gameId: string;
    startedBy: string;
    playerOne: string;
    playerTwo?: string;
    won?: string;
    rounds: GameRound[]
    isPlaying?: boolean;
    isFinished?: boolean;
}