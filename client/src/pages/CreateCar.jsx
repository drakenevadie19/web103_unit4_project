import React, { useState, useEffect } from 'react';
import { getAllCustomItems, addCar } from '../services/CarsAPI'; // Import API functions
import '../App.css';
import { useNavigate } from 'react-router-dom';

const CreateCar = () => {
    const [price, setPrice] = useState(65000);
    const [step, setStep] = useState('exterior'); // To control selection order
    const [customItems, setCustomItems] = useState({
        exterior: [],
        roof: [],
        wheels: [],
        interior: []
    });

    const [selectedItems, setSelectedItems] = useState({
        exterior: null,
        roof: null,
        wheels: null,
        interior: null
    });
    
    const [carName, setCarName] = useState('');
    const [showOptions, setShowOptions] = useState(true); // Controls the visibility of options
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCustomItems = async () => {
            try {
                const allItems = await getAllCustomItems();
                const dividedItems = {
                    exterior: allItems.filter(item => item.type === 'exterior'),
                    roof: allItems.filter(item => item.type === 'roof'),
                    wheels: allItems.filter(item => item.type === 'wheels'),
                    interior: allItems.filter(item => item.type === 'interior')
                };
                setCustomItems(dividedItems);
            } catch (error) {
                console.error("Error fetching custom items", error);
            }
        };

        fetchCustomItems();
    }, []);

    const handleSelection = (type, item) => {
        setSelectedItems(prev => ({ ...prev, [type]: item }));
        setPrice(prev => prev + item.price);
    };

    const handleNextStep = () => {
        switch (step) {
            case 'exterior':
                setStep('roof');
                break;
            case 'roof':
                setStep('wheels');
                break;
            case 'wheels':
                setStep('interior');
                break;
            case 'interior':
                setShowOptions(false); // Hide options after selecting interior
                break;
            default:
                setStep('exterior');
        }
    };

    const handleSubmit = async () => {
        if (!carName || !selectedItems.exterior || !selectedItems.roof || !selectedItems.wheels || !selectedItems.interior) {
            alert('Please complete all selections and enter a car name.');
            return;
        }

        const carData = {
            name: carName,
            price,
            customizations: selectedItems
        };

        try {
            await addCar(carData);
            console.log("Car added successfully", carData);
            // After submitting, navigate to the cars list
            navigate('/customcars');
        } catch (error) {
            console.error("Error adding car", error);
        }
    };

    return (
        <div className="create-car-bar">
            <div className="convertible">
                <label htmlFor="convertible-button">
                    <input type="checkbox" id="convertible-button" />
                    Convertible
                </label>
            </div>

            {/* Always display the car name input and create button */}
            <div className="input-carname-and-submit-button">
                <input 
                    type="text" 
                    id="car-name" 
                    placeholder="My New Car" 
                    value={carName}
                    onChange={(e) => setCarName(e.target.value)}
                />
                <button onClick={handleSubmit}>Create</button>
            </div>

            <div className="button-group">
                {/* Buttons for each type of customization */}
                <button id="car-options" onClick={() => setStep('exterior')}>EXTERIOR</button>
                <button id="car-options" onClick={() => setStep('roof')}>ROOF</button>
                <button id="car-options" onClick={() => setStep('wheels')}>WHEELS</button>
                <button id="car-options" onClick={() => setStep('interior')}>INTERIOR</button>
            </div>

            {/* Display customization options based on the current step */}
            {showOptions && step === 'exterior' && (
                <div>
                    <h4>Select Exterior:</h4>
                    <div className="custom-item-list">
                        {customItems.exterior.map(item => (
                            <div key={item.id} onClick={() => handleSelection('exterior', item)}>
                                {item.name} - ${item.price}
                            </div>
                        ))}
                    </div>
                    <button onClick={handleNextStep}>Done</button>
                </div>
            )}

            {showOptions && step === 'roof' && (
                <div>
                    <h4>Select Roof:</h4>
                    <div className="custom-item-list">
                        {customItems.roof.map(item => (
                            <div key={item.id} onClick={() => handleSelection('roof', item)}>
                                {item.name} - ${item.price}
                            </div>
                        ))}
                    </div>
                    <button onClick={handleNextStep}>Done</button>
                </div>
            )}

            {showOptions && step === 'wheels' && (
                <div>
                    <h4>Select Wheels:</h4>
                    <div className="custom-item-list">
                        {customItems.wheels.map(item => (
                            <div key={item.id} onClick={() => handleSelection('wheels', item)}>
                                {item.name} - ${item.price}
                            </div>
                        ))}
                    </div>
                    <button onClick={handleNextStep}>Done</button>
                </div>
            )}

            {showOptions && step === 'interior' && (
                <div>
                    <h4>Select Interior:</h4>
                    <div className="custom-item-list">
                        {customItems.interior.map(item => (
                            <div key={item.id} onClick={() => handleSelection('interior', item)}>
                                {item.name} - ${item.price}
                            </div>
                        ))}
                    </div>
                    <button onClick={handleNextStep}>Done</button>
                </div>
            )}

            {/* Display total price at the bottom */}
            <div className="create-car-price">
                💰${price}
            </div>
        </div>
    );
};

export default CreateCar;