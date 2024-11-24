import { Server } from "socket.io";
import Player from "../models/playerModel";
import { createGame, joinGame, rollDice } from "../services/gameService";

const socketHandler = (io: Server) => {
    io.on("connection", (socket) => {
        console.log(`Player connected: ${socket.id}`);

        socket.on("create-game", async ({ username }, callback) => {
            try {
                const player = new Player({
                    username,
                    socketId: socket.id,
                    isReady: false,
                });
                const savedPlayer = await player.save();
                const game = await createGame(savedPlayer._id!.toString());
                callback({ gameId: game._id });
            } catch (err) {
                console.error(err);
                callback({ error: "Failed to create game." });
            }
        });

        socket.on("join-game", async ({ gameId, username }, callback) => {
            try {
                const player = new Player({
                    username,
                    socketId: socket.id,
                    isReady: false,
                });
                const savedPlayer = await player.save();
                const game = await joinGame(
                    gameId,
                    savedPlayer._id!.toString()
                );
                if (!game)
                    return callback({ error: "Game not found or full." });
                io.to(gameId).emit("player-joined", { players: game.players });
                callback({ success: true });
            } catch (err) {
                console.error(err);
                callback({ error: "Failed to join game." });
            }
        });

        socket.on("roll-dice", () => {
            const diceValue = rollDice();
            io.emit("dice-rolled", { value: diceValue });
        });

        socket.on("disconnect", () => {
            console.log(`Player disconnected: ${socket.id}`);
        });
    });
};

export default socketHandler;
