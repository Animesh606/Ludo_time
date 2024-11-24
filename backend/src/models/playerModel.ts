import mongoose, { Schema, Document } from "mongoose";

export interface IPlayer extends Document {
    username: string;
    socketId: string;
    score: number;
    isReady: boolean;
}

const PlayerSchema: Schema = new Schema({
    username: { type: String, required: true },
    socketId: { type: String, required: true },
    score: { type: Number, default: 0 },
    isReady: { type: Boolean, default: false },
});

export default mongoose.model<IPlayer>("Player", PlayerSchema);
