export enum Actions {
    ROCK = 0,
    PAPER = 1,
    SCISSOR = 2
}

export interface GameActionsInterface {
    gameId: string;
    player: string;
    action: Actions
}