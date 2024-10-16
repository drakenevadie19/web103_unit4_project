import express from "express";
import path from 'path';
import { fileURLToPath } from 'url'

import carController from '../controllers/boltBucket.js';

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const router = express.Router()

// router.get('/', (req, res) => {
//     res.status(200).json(teamList)
// });

router.get('/', carController.getCarsList)

router.get('/:carId', (req, res) => {
    res.status(200).sendFile(path.resolve(__dirname, '../public/team.html'))
});

export default router;