
import { Router } from 'express';
import { PetsDAO } from '../dao/PetsDAO.js';

export const router = Router();

// Endpoint para obtener todas las mascotas
router.get('/', async (req, res) => {
    try {
        const pets = await PetsDAO.getAll();
        res.status(200).json(pets);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint para obtener una mascota por ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const pet = await PetsDAO.getById(id);
        if (!pet) {
            return res.status(404).json({ error: 'Mascota no encontrada.' });
        }
        res.status(200).json(pet);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint para crear una nueva mascota
router.post('/', async (req, res) => {
    const { name, species, age, owner } = req.body;
    if (!name || !species || !age) {
        return res.status(400).json({ error: 'Faltan datos obligatorios.' });
    }

    try {
        const newPet = await PetsDAO.create({ name, species, age, owner });
        res.status(201).json({ message: 'Mascota creada con éxito.', pet: newPet });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint para actualizar una mascota por ID
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    try {
        const updatedPet = await PetsDAO.update(id, updateData);
        if (!updatedPet) {
            return res.status(404).json({ error: 'Mascota no encontrada.' });
        }
        res.status(200).json({ message: 'Mascota actualizada con éxito.', pet: updatedPet });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint para eliminar una mascota por ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedPet = await PetsDAO.delete(id);
        if (!deletedPet) {
            return res.status(404).json({ error: 'Mascota no encontrada.' });
        }
        res.status(200).json({ message: 'Mascota eliminada con éxito.', pet: deletedPet });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
