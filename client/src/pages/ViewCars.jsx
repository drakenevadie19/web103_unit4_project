import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // For navigation to the details page
import { getAllCars } from '../services/CarsAPI'; // Import the API function
import '../App.css';

const ViewCars = () => {
    const [cars, setCars] = useState([]); // State to store the list of cars
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    useEffect(() => {
        // Fetch all cars when the component mounts
        const fetchCars = async () => {
            try {
                const carList = await getAllCars();
                setCars(carList);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchCars();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <div>
                <header>
                    <h3>
                        <img src="/assets/convertible-d1e22bba.png" alt="Convertible Icon" />  
                        Tacos
                    </h3>
                </header>
            </div>

            <div className="cars-list-container">
                <div className="cars-grid">
                    {cars.map(car => (
                        <div className="car-card" key={car.id}>
                            <h2>{car.car_name}</h2>
                            <p><strong>Price:</strong> ${car.price}</p>
                            <p><strong>Convertible:</strong> {car.convertible ? 'Yes' : 'No'}</p>
                            <p><strong>Exterior:</strong> {car.exterior}</p>
                            <p><strong>Wheels:</strong> {car.wheels}</p>
                            <p><strong>Roof:</strong> {car.roof}</p>
                            <p><strong>Interior:</strong> {car.interior}</p>
                            
                            {/* Button to navigate to the car details page */}
                            <Link to={`/customcars/${car.id}`} className="details-button">
                                Details
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ViewCars;
