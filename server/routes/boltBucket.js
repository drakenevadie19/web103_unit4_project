import express from "express";
import path from 'path';
import { fileURLToPath } from 'url';
import carController from '../controllers/boltBucket.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = express.Router();

// Get the list of all cars
router.get('/', carController.getCarsList);

// Create a new car
router.post('/', carController.addCar);

// Get a specific car by ID (you can modify this if you want to return details or serve a static page)
router.get('/:carId', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, '../public/index.html'));
});

// Edit a specific car by ID
router.put('/:carId', carController.editCar);

// Delete a specific car by ID
router.delete('/:carId', carController.deleteCar);

export default router;
