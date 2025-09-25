import mongoose, { Schema, Document } from "mongoose";

export interface IPartner extends Document {
    username: string;
    password: string;
    role: string;
    available: boolean;
}

const PartnerSchema: Schema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "partner" },
    available: { type: Boolean, default: true },
});

export default mongoose.model<IPartner>("Partner", PartnerSchema);
