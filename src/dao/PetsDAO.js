
import { mascotasModelo } from "./models/pets.models.js";

export class PetsDAO {
    static async getAll() {
        return await mascotasModelo.find().lean();
    }

    static async getById(id) {
        return await mascotasModelo.findById(id).lean();
    }

    static async create(petData) {
        const newPet = await mascotasModelo.create(petData);
        return newPet.toJSON();
    }

    static async update(id, updateData) {
        return await mascotasModelo.findByIdAndUpdate(id, updateData, { new: true }).lean();
    }

    static async delete(id) {
        return await mascotasModelo.findByIdAndDelete(id).lean();
    }
}
