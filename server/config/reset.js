import { pool } from './database.js';
import './dotenv.js';
import teamList from '../data/teams.js';

const createBoltBucketTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS boltBucket;

        CREATE TABLE IF NOT EXISTS boltBucket (
            id SERIAL PRIMARY KEY,
            team_name VARCHAR(255) NOT NULL,
            year_of_foundation INTEGER NOT NULL,
            country VARCHAR(255) NOT NULL,
            stadium VARCHAR(255) NOT NULL,
            stadium_capacity INTEGER NOT NULL,
            city VARCHAR(255) NOT NULL,
            manager VARCHAR(255) NOT NULL,
            logo VARCHAR(255) NOT NULL
        )
    `;

    try {
        const res = await pool.query(createTableQuery);
        console.log('🎉 teams table created successfully');
    } catch (err) {
        console.error('⚠️ error creating teams table', err);
    }
}

const sendTeamsTable = async () => {
    await createTeamsTable();

    teamList.forEach((team) => {
        const insertQuery = {
            text: 'INSERT INTO teams (team_name, year_of_foundation, country, stadium, stadium_capacity, city, manager, logo) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
            values: [
                team.team_name,
                team.year_of_foundation,
                team.country,
                team.stadium,
                team.stadium_capacity,
                team.city,
                team.manager,
                team.logo
            ]
        };

        pool.query(insertQuery, (err, res) => {
            if (err) {
                console.error('⚠️ error inserting team', err);
                return;
            }
            console.log(`✅ ${team.team_name} added successfully`);
        });
    });
}

sendTeamsTable();