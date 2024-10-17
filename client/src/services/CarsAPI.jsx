// Define functions to call API to getAllCars, getCar, createCar, editCar, deleteCar
const API_BASE_URL = "http://localhost:3000"; // Updated base URL with /api prefix

// Get all cars
export const getAllCars = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}`);
    if (!response.ok) {
      throw new Error(`Error fetching cars: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching cars:", error);
    throw error;
  }
};

// Get a specific car by ID
export const getCar = async (carId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/cars/${carId}`);
    if (!response.ok) {
      throw new Error(`Error fetching car ${carId}: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching car:", error);
    throw error;
  }
};

// Add a new car
export const addCar = async (carData) => {
  try {
    const response = await fetch(`${API_BASE_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(carData),
    });
    if (!response.ok) {
      throw new Error(`Error adding car: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error adding car:", error);
    throw error;
  }
};

// Update car details by ID
export const updateCar = async (carId, updatedCarData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/cars/${carId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedCarData),
    });
    if (!response.ok) {
      throw new Error(`Error updating car ${carId}: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error updating car ${carId}:`, error);
    throw error;
  }
};

// Delete car by ID
export const deleteCar = async (carId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/cars/${carId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Error deleting car ${carId}: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error(`Error deleting car ${carId}:`, error);
    throw error;
  }
};

// Get all customs 
export const getAllCustomItems = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/customsList`);
        if (!response.ok) {
          throw new Error(`Error fetching cars: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error fetching cars:", error);
        throw error;
      }
}
