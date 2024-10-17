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
router.get('/cars/:id', carController.getCarById);

// Edit a specific car by ID
router.put('/cars/:id', carController.editCar);

// Delete a specific car by ID
router.delete('/cars/:id', carController.deleteCar);

// Get all customs
router.get('/customsList', carController.getAllCustoms);

export default router;
