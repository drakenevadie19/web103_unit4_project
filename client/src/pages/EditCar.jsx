import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // For accessing the route parameters and navigation
import { getCar, updateCar } from '../services/CarsAPI'; // Assuming these functions are defined in your CarsAPI
import '../App.css';

const EditCar = () => {
    const { id } = useParams(); // Get the car ID from the URL parameters
    const navigate = useNavigate(); // To navigate programmatically after saving changes
    const [car, setCar] = useState(null); // State to store the car details
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state
    const [formData, setFormData] = useState({}); // State to manage form input

    useEffect(() => {
        const fetchCar = async () => {
            try {
                const fetchedCar = await getCar(id); // Fetch car details by ID
                setCar(fetchedCar);
                setFormData(fetchedCar); // Initialize form data with fetched car details
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchCar();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateCar(id, formData); // Call the API to update the car
            navigate(`/customcars/${id}`); // Redirect to the car details page after updating
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Edit Car Details</h1>
            {car && (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Car Name:</label>
                        <input
                            type="text"
                            name="car_name"
                            value={formData.car_name || ''}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Price:</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price || ''}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Convertible:</label>
                        <select
                            name="convertible"
                            value={formData.convertible ? 'true' : 'false'}
                            onChange={handleChange}
                            required
                        >
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                    </div>
                    <div>
                        <label>Exterior:</label>
                        <input
                            type="text"
                            name="exterior"
                            value={formData.exterior || ''}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Wheels:</label>
                        <input
                            type="text"
                            name="wheels"
                            value={formData.wheels || ''}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Roof:</label>
                        <input
                            type="text"
                            name="roof"
                            value={formData.roof || ''}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Interior:</label>
                        <input
                            type="text"
                            name="interior"
                            value={formData.interior || ''}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit">Update Car</button>
                </form>
            )}
        </div>
    );
};

export default EditCar;
