import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Assuming you're using react-router for route params
import { getCar } from '../services/CarsAPI'; // Import the API function
import '../App.css';

const CarDetails = () => {
    const { carId } = useParams(); // Get carId from the route params
    const [car, setCar] = useState(null); // State to hold car details
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    useEffect(() => {
        // Fetch car details when the component mounts
        const fetchCarDetails = async () => {
            try {
                const carData = await getCar(carId);
                setCar(carData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchCarDetails();
    }, [carId]); // Re-fetch car data when carId changes

    if (loading) {
        return <div>Loading...</div>; // Loading state
    }

    if (error) {
        return <div>Error: {error}</div>; // Error state
    }

    if (!car) {
        return <div>No car details found</div>; // No car data found
    }

    return (
        <div className="car-details-container">
            <h1>Car Details</h1>
            <div className="car-details">
                <p><strong>Car Name:</strong> {car.car_name}</p>
                <p><strong>Convertible:</strong> {car.convertible ? 'Yes' : 'No'}</p>
                <p><strong>Exterior:</strong> {car.exterior}</p>
                <p><strong>Wheels:</strong> {car.wheels}</p>
                <p><strong>Roof:</strong> {car.roof}</p>
                <p><strong>Interior:</strong> {car.interior}</p>
                <p><strong>Price:</strong> ${car.price}</p>
            </div>
        </div>
    );
};

export default CarDetails;
