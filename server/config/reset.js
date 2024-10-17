import { pool } from './database.js';
import './dotenv.js';
import carCustomizations from '../data/carCustomizations.js';
import initialCars from '../data/car.js';

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
        console.log('🎉 cars table created successfully');
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
        console.log('🎉 CustomItem table created successfully');
    } catch (err) {
        console.error('⚠️ error creating teams table', err);
    }
}

const addInitialCartoCarsTable = async () => {
    await createCarsTable(); // Ensure the cars table is created before inserting data

    initialCars.forEach((car) => {
        const insertQuery = {
            text: `
                INSERT INTO cars (id, car_name, convertible, exterior, wheels, roof, interior, price) 
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            `,
            values: [
                car.id,
                car.car_name,
                car.convertible,
                car.exterior,
                car.wheels,
                car.roof,
                car.interior,
                car.price
            ]
        };

        pool.query(insertQuery, (err, res) => {
            if (err) {
                console.error(`⚠️ Error inserting ${car.car_name}:`, err);
                return;
            }
            console.log(`✅ ${car.car_name} added successfully`);
        });
    });
};


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

addInitialCartoCarsTable();
addDataToCustomItemTable();