import mongoose, { Schema, Document } from "mongoose";

export interface IGame extends Document {
    players: mongoose.Types.ObjectId[];
    currentTurn: mongoose.Types.ObjectId;
    boardState: any; // Store positions of each player's tokens
    status: "waiting" | "in-progress" | "completed";
}

const GameSchema: Schema = new Schema({
    players: [{ type: mongoose.Types.ObjectId, ref: "Player" }],
    currentTurn: { type: mongoose.Types.ObjectId, ref: "Player" },
    boardState: { type: Object, default: {} },
    status: { type: String, default: "waiting" },
});

export default mongoose.model<IGame>("Game", GameSchema);
