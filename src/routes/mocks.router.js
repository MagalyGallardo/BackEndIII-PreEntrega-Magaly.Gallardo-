// src/routes/mocks.router.js
import { Router } from 'express';
import { generateMockUsers, generateMockPets } from '../utils/mocking.js';
import { usuariosModelo } from '../dao/models/users.model.js';
import { mascotasModelo } from '../dao/models/pets.model.js';

export const router = Router();

// Endpoint para generar 50 usuarios mockeados
router.get('/mockingusers', (req, res) => {
    const users = generateMockUsers(50); // Generar 50 usuarios
    res.status(200).json(users);
});

// Endpoint para generar datos y almacenarlos en la base de datos
router.post('/generateData', async (req, res) => {
    const { users, pets } = req.body;

    if (!users || !pets) {
        return res.status(400).json({ error: 'Los parámetros users y pets son obligatorios.' });
    }

    try {
        const generatedUsers = generateMockUsers(users);
        const generatedPets = generateMockPets(pets);

        // Inserta en la base de datos usando tus DAOs correspondientes
        await usuariosModelo.insertMany(generatedUsers);
        await mascotasModelo.insertMany(generatedPets);

        res.status(201).json({
            message: 'Datos generados e insertados con éxito',
            users: generatedUsers.length,
            pets: generatedPets.length,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});