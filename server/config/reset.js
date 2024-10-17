import { pool } from './database.js';
import './dotenv.js';
import carCustomizations from '../data/carCustomizations.js';

const createCarsTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS cars;

        CREATE TABLE IF NOT EXISTS cars (
            id SERIAL PRIMARY KEY,
            car_name VARCHAR(255) NOT NULL,
            convertible BOOLEAN NOT NULL,
            exterior VARCHAR(255) NOT NULL,
            wheels VARCHAR(255) NOT NULL,
            roof VARCHAR(255) NOT NULL,
            interior VARCHAR(255) NOT NULL,
            price INTEGER NOT NULL
        )
    `;

    try {
        const res = await pool.query(createTableQuery);
        console.log('🎉 teams table created successfully');
    } catch (err) {
        console.error('⚠️ error creating teams table', err);
    }
}

const createCustomItemTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS CustomItem;

        CREATE TABLE IF NOT EXISTS CustomItem (
            id SERIAL PRIMARY KEY,
            type VARCHAR(255) NOT NULL,
            name VARCHAR(255) NOT NULL,
            price INTEGER NOT NULL
        )
    `;

    try {
        const res = await pool.query(createTableQuery);
        console.log('🎉 teams table created successfully');
    } catch (err) {
        console.error('⚠️ error creating teams table', err);
    }
}


const addDataToCustomItemTable = async () => {
    await createCustomItemTable();

    carCustomizations.forEach((car, index) => {
        const insertQuery = {
            text: 'INSERT INTO CustomItem (id, type, name, price) VALUES ($1, $2, $3, $4)',
            values: [
                index,
                car.type,
                car.name,
                car.price
            ]
        };

        pool.query(insertQuery, (err, res) => {
            if (err) {
                console.error('⚠️ error inserting team', err);
                return;
            }
            console.log(`✅ ${car.name} added successfully`);
        });
    });
}

createCarsTable();
addDataToCustomItemTable();