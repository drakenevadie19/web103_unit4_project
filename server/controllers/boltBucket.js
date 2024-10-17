import { pool } from '../config/database.js';

// Get list of all cars
const getCarsList = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM cars ORDER BY id ASC');
        res.status(200).json(results.rows);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
};

// Get list a car
const getCarById = async (req, res) => {
    const { id } = req.params;
    try {
        const results = await pool.query(`SELECT * FROM cars WHERE id = $1`, [id]);
        if (results.rowCount === 0) {
            return res.status(404).json({ message: 'Car not found' });
        }
        res.status(200).json(results.rows[0]);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
};

// Create a new car entry
const addCar = async (req, res) => {
    const { car_name, convertible, exterior, wheels, roof, interior, price } = req.body;

    const insertQuery = `
        INSERT INTO cars (car_name, convertible, exterior, wheels, roof, interior, price)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *;
    `;

    try {
        const results = await pool.query(insertQuery, [car_name, convertible, exterior, wheels, roof, interior, price]);
        res.status(201).json(results.rows[0]);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
};

// Edit car details by id
const editCar = async (req, res) => {
    const { id } = req.params;
    const { car_name, convertible, exterior, wheels, roof, interior, price } = req.body;

    const updateQuery = `
        UPDATE cars
        SET car_name = $1, convertible = $2, exterior = $3, wheels = $4, roof = $5, interior = $6, price = $7
        WHERE id = $8
        RETURNING *;
    `;

    try {
        const results = await pool.query(updateQuery, [car_name, convertible, exterior, wheels, roof, interior, price, id]);
        if (results.rowCount === 0) {
            return res.status(404).json({ message: 'Car not found' });
        }
        res.status(200).json(results.rows[0]);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
};

// Delete a car entry by id
const deleteCar = async (req, res) => {
    const { id } = req.params;

    const deleteQuery = `
        DELETE FROM cars
        WHERE id = $1
        RETURNING *;
    `;

    try {
        const results = await pool.query(deleteQuery, [id]);
        if (results.rowCount === 0) {
            return res.status(404).json({ message: 'Car not found' });
        }
        res.status(200).json({ message: 'Car deleted successfully' });
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
};

const getAllCustoms = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM customitem ORDER BY id ASC');
        res.status(200).json(results.rows);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
}

export default {
    getCarsList,
    getCarById,
    addCar,
    editCar,
    deleteCar,
    getAllCustoms
};
