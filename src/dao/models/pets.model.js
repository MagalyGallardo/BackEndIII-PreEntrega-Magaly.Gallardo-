
import mongoose from "mongoose";

export const mascotasModelo = mongoose.model(
    "mascotas",
    new mongoose.Schema(
        {
            name: { type: String, required: true },
            species: { type: String, required: true },
            age: { type: Number, required: true },
            owner: { type: mongoose.Schema.Types.ObjectId, ref: "usuarios" },
        },
        {
            timestamps: true,
        }
    )
);
