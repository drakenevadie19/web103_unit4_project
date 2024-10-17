import React, { useState, useEffect } from 'react';
import { getAllCustomItems, addCar, getAllCars } from '../services/CarsAPI'; // Import API functions
import '../App.css';
import { useNavigate } from 'react-router-dom';

const CreateCar = () => {
    const [price, setPrice] = useState(65000); // Initial price
    const [step, setStep] = useState(null); // To control selection order
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

    const [isConvertible, setIsConvertible] = useState(false); // State for convertible checkbox
    const [carName, setCarName] = useState('');
    const [showOptions, setShowOptions] = useState(true); // Controls the visibility of options
    const [selectAnOption, setSelectAnOption] = useState(false);
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
        setSelectedItems(prev => {
            const previousItem = prev[type];
            const updatedPrice = previousItem 
                ? price - previousItem.price + item.price 
                : price + item.price;
            setPrice(updatedPrice);

            return { ...prev, [type]: item };
        });
    };

    const handleNextStep = () => {
        switch (step) {
            case 'exterior':
                setStep('roof');
                setSelectAnOption(false);
                break;
            case 'roof':
                setStep('wheels');
                setSelectAnOption(false);
                break;
            case 'wheels':
                setStep('interior');
                setSelectAnOption(false);
                break;
            case 'interior':
                setStep('alldone');
                setShowOptions(false); // Hide options after selecting interior
                break;
            default:
                setStep('exterior');
        }
    };

    const handleConvertibleChange = () => {
        setIsConvertible(prev => !prev); // Toggle the convertible state
        setPrice(prev => (isConvertible ? 65000 : 75000)); // Adjust the initial price based on convertible
    };

    const [id, setId] = useState(0);
    const handleSubmit = async () => {
        if (!carName || !selectedItems.exterior || !selectedItems.roof || !selectedItems.wheels || !selectedItems.interior) {
            alert('Please complete all selections and enter a car name.');
            return;
        }

        try {
            let carList = await getAllCars();
            setId(carList.length);
        } catch (err) {
            console.log("There is an error", err);
        }

        const carData = {
            id: id,
            car_name: carName,
            convertible: isConvertible,
            exterior: selectedItems.exterior,
            wheels: selectedItems.wheels,
            roof: selectedItems.roof,
            interior: selectedItems.interior,
            price: price
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
                    <input 
                        type="checkbox" 
                        id="convertible-button" 
                        checked={isConvertible} 
                        onChange={handleConvertibleChange} // Handle checkbox change
                    />
                    Convertible
                </label>
            </div>

            <div className="button-group">
                {/* Buttons for each type of customization */}
                <button 
                    id="car-options" 
                    onClick={() => step === null && setStep('exterior')} 
                    className={step === 'exterior' ? "onSelection" : ""}
                >
                    EXTERIOR
                </button>
                <button id="car-options" 
                    className={step === 'roof' ? "onSelection" : ""}>ROOF</button>
                <button id="car-options" 
                    className={step === 'wheels' ? "onSelection" : ""}>WHEELS</button>
                <button id="car-options" 
                    className={step === 'interior' ? "onSelection" : ""}>INTERIOR</button>
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

            {showOptions && step === 'exterior' && (
                <div className='option-modal'>
                    <div>
                        <div className="available-options">
                            {customItems.exterior.map(item => (
                                <div 
                                    key={item.id} 
                                    onClick={() => handleSelection('exterior', item)} 
                                    className={`option-card ${selectedItems.exterior && selectedItems.exterior.id === item.id ? 'selected-option' : ''}`}
                                >
                                    <div className='option-card-overlay'>
                                        {item.name} - ${item.price}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button onClick={handleNextStep}>Done</button>
                    </div>
                </div>
            )}

            {showOptions && step === 'roof' && (
                <div className='option-modal'>
                    <div>
                        <div className="available-options">
                            {customItems.roof.map(item => (
                                <div 
                                    key={item.id} 
                                    onClick={() => handleSelection('roof', item)} 
                                    className={`option-card ${selectedItems.roof && selectedItems.roof.id === item.id ? 'selected-option' : ''}`}
                                >
                                    <div className='option-card-overlay'>
                                        {item.name} - ${item.price}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button onClick={handleNextStep}>Done</button>
                    </div>
                </div>
            )}

            {showOptions && step === 'wheels' && (
                <div className='option-modal'>
                    <div>
                        <div className="available-options">
                            {customItems.wheels.map(item => (
                                <div 
                                    key={item.id} 
                                    onClick={() => handleSelection('wheels', item)} 
                                    className={`option-card ${selectedItems.wheels && selectedItems.wheels.id === item.id ? 'selected-option' : ''}`}
                                >
                                    <div className='option-card-overlay'>
                                        {item.name} - ${item.price}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button onClick={handleNextStep}>Done</button>
                    </div>
                </div>
            )}

            {showOptions && step === 'interior' && (
                <div className='option-modal'>
                    <div>
                        <div className="available-options">
                            {customItems.interior.map(item => (
                                <div 
                                    key={item.id} 
                                    onClick={() => handleSelection('interior', item)} 
                                    className={`option-card ${selectedItems.interior && selectedItems.interior.id === item.id ? 'selected-option' : ''}`}
                                >
                                    <div className='option-card-overlay'>
                                        {item.name} - ${item.price}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button onClick={handleNextStep}>Done</button>
                    </div>
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