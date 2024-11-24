import { Types } from "mongoose";
import Game, { IGame } from "../models/gameModel";
import Player from "../models/playerModel";

export const createGame = async (playerId: string): Promise<IGame> => {
    const game = new Game({
        players: [playerId],
        boardState: {}, // Initialize board (to be defined)
        status: "waiting",
    });
    return await game.save();
};

export const joinGame = async (gameId: string, playerId: string): Promise<IGame | null> => {
    const game = await Game.findById(gameId);
    if (game && game.status === "waiting") {
        game.players.push(new Types.ObjectId(playerId));
        if (game.players.length >= 2) game.status = "in-progress";
        return await game.save();
    }
    return null;
};

export const rollDice = (): number => Math.floor(Math.random() * 6) + 1;
