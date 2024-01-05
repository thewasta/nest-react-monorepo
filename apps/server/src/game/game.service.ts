import {Inject, Injectable} from '@nestjs/common';
import {CACHE_MANAGER} from "@nestjs/cache-manager";
import {Cache} from 'cache-manager';
import {PlayerInterface} from "./model/player.interface";
import {PlayerStatsInterface} from "./model/player.stats.interface";
import {GameInterface} from "./model/game.interface";
import * as crypto from "crypto";
import {GameActions, GameResult} from "./game.gateway";

@Injectable()
export class GameService {
    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {
    }

    async findUser(cookie: string) {
        let value = await this.cacheManager.get<string>(`user:${cookie}:session`);
        if (!value) {
            await this.cacheManager.set<PlayerInterface>(`user:${cookie}:session`, {
                start: new Date(),
                cookie: cookie,
            });
            await this.cacheManager.set<PlayerStatsInterface>(`user:${cookie}:stats`, {
                total: 0,
                wins: 0
            })
            value = await this.cacheManager.get<string>(`user:${cookie}:session`);
        }
        return value;
    }

    async joinGame(gameId: string, playerTwo: string) {
        const game = await this.cacheManager.get<GameInterface>(`game:${gameId}`)
        game["playerTwo"] = playerTwo;
        await this.cacheManager.set<GameInterface>(`game:${gameId}`, {
            ...game,
            playerTwo,
        })
    }

    async createGame(playerOne: string, gameId: string) {
        await this.cacheManager.set<GameInterface>(`game:${gameId}`, {
            gameId,
            playerOne: playerOne,
            playerTwo: null,
            won: null,
            rounds: [],
            isPlaying: false,
            isFinished: false,
            startedBy: playerOne
        })
    }

    async winner(player: string, gameId: string) {
        const game = await this.findGame(gameId);
        game.won = player;
        game.isFinished = true;
        game.isPlaying = false;
        try {
            await this.cacheManager.set(`games:${gameId}`, game);
            return Promise.resolve();
        } catch (e) {
            return Promise.reject('Couldn\'t update game information');
        }
    }

    async findGame(gameId: string): Promise<GameInterface> {
        const game = await this.cacheManager.get<GameInterface>('games:inProgress');
        if (null === game) {
            return Promise.reject(`Game id <${gameId}> not found`);
        }

        return game;
    }

    determineWinner(playerOne: GameActions, playerTwo: GameActions): GameResult {
        if (playerOne === playerTwo) {
            return 'DRAW';
        }

        if (
            (playerOne === 'ROCK' && playerTwo === 'SCISSORS') ||
            (playerOne === 'PAPER' && playerTwo === 'ROCK') ||
            (playerOne === 'SCISSORS' && playerTwo === 'PAPER')
        ) {
            return 'PLAYER_ONE_WINS';
        }

        return 'PLAYER_TWO_WINS';
    }

    async findNewGame(playerId: string) {
        const inProgressGames = await this.cacheManager.get<GameInterface>(`games:inProgress`) || {};
        const gameKeys = Object.keys(inProgressGames);
        const gameId = crypto.randomUUID();

        if (!gameKeys.length) {
            await this.createGame(playerId, gameId);
            return gameId;
        } else {
            await this.joinGame(gameKeys[0], playerId)
            return gameKeys[0];
        }
    }

    async gameRound(gameId: string, playerId: string, playerAction: GameActions) {
        const game = await this.findGame(gameId);
        if (game.rounds.length >= 3) {
            return;
        }

        const currentRound = game.rounds.sort((roundA, roundB) => (
            roundB.round - roundA.round
        ));
        let roundWinner = null;
        if (null !== currentRound[0].playerOne && null !== currentRound[0].playerTwo) {
            roundWinner = this.determineWinner(currentRound[0].playerOne, currentRound[0].playerTwo);
        }
        let playerOneAction = null;
        let playerTwoAction = null;
        if (game.playerOne === playerId) {
            playerOneAction = playerAction;
        } else {
            playerTwoAction = playerAction;
        }
        game.rounds.push({
            round: currentRound[0].round + 1,
            playerTwo: playerTwoAction,
            playerOne: playerOneAction,
            winner: roundWinner
        });

        await this.cacheManager.set<GameInterface>(`games:inProgress`, game);
    }
}
