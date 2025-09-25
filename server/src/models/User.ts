import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
    username: string;
    password: string;
    role: "admin" | "partner";
    available?: boolean; // Only relevant for partners
}

const UserSchema: Schema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "partner"], required: true },
    available: { type: Boolean, default: true }, // Only for partners
});

export default mongoose.model<IUser>("User", UserSchema);
