import bcrypt from "bcrypt"

import { faker } from '@faker-js/faker';
import { generaHash } from './utils.js';

export const generaHash=pass=>bcrypt.hashSync(pass, 10)
export const validaPass=(pass, hash)=>bcrypt.compareSync(pass, hash)


export const generateMockUsers = (count) => {
    return Array.from({ length: count }, () => ({
        username: faker.internet.userName(),
        email: faker.internet.email(),
        first_name: faker.name.firstName(),
        role: faker.helpers.arrayElement(['user', 'admin']),
        password: generaHash('coder123'),
        pets: [],
    }));
};

export const generateMockPets = (count) => {
    return Array.from({ length: count }, () => ({
        name: faker.animal.cat(),
        species: faker.helpers.arrayElement(['cat', 'dog', 'bird']),
        age: faker.datatype.number({ min: 1, max: 15 }),
    }));
};
