import React, { useState } from 'react'
import { getCar } from '../services/CarsAPI'; // Import the API function
import '../App.css'

const CreateCar = () => {

    const [price, setPrice] = useState(65000);
    const [chosen, setChosen] = useState(false);

    return (
        <div className="create-car-bar">
            {/* <h1>Here is adding customization to a car</h1> */}
            <div className="convertible">
                <label htmlFor="convertible-button">
                    <input type='checkbox' id="convertible-button"  />
                    Convertible
                </label>
            </div>

            <div className='button-group'>
                <button id="car-options">EXTERIOR</button>
                <button id="car-options">ROOF</button>
                <button id="car-options">WHEELS</button>
                <button id="car-options">INTERIOR</button>
            </div>

            <div className="input-carname-and-submit-button">
                <div className="input-carname">
                    <input type="text" id="car-name" placeholder="My New Car" />
                </div>
                <button>CREATE</button>
            </div>
            
            {
                chosen && 
                <div>
                    
                </div>
            }
            

            <div className="create-car-price">
                💰$
                {price}
            </div>
        </div>
    )
}

export default CreateCar