import mongoose, { Schema, Document } from "mongoose";

export interface IOrder extends Document {
    title: string;
    status: string;
    partnerId: mongoose.Schema.Types.ObjectId | null;
    location: { lat: number; lng: number };
}

const OrderSchema: Schema = new Schema({
    title: { type: String, required: true },
    status: { type: String, default: "pending" },
    partnerId: { type: mongoose.Schema.Types.ObjectId, ref: "Partner", default: null },
    location: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
    },
});

export default mongoose.model<IOrder>("Order", OrderSchema);
