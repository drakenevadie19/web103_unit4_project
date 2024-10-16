import { pool } from '../config/database.js';

// Get list of all cars
const getCarsList = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM boltBucket ORDER BY id ASC');
        // console.log("Here is result");
        // console.log(results);
        res.status(200).json(results.rows);
    } catch (error) {
        res.status(409).json( { error: error.message } )
    }
} 

// Create a car entry
const addCar = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM boltBucket ORDER BY id ASC');
        // console.log("Here is result");
        // console.log(results);
        res.status(200).json(results.rows);
    } catch (error) {
        res.status(409).json( { error: error.message } )
    }
} 


// Edit a car details
const editCar = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM boltBucket ORDER BY id ASC');
        // console.log("Here is result");
        // console.log(results);
        res.status(200).json(results.rows);
    } catch (error) {
        res.status(409).json( { error: error.message } )
    }
} 

// Delete a car entry 
const deleteCar = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM boltBucket ORDER BY id ASC');
        // console.log("Here is result");
        // console.log(results);
        res.status(200).json(results.rows);
    } catch (error) {
        res.status(409).json( { error: error.message } )
    }
} 

export default {
    getCarsList,
    addCar,
    editCar,
    deleteCar
}