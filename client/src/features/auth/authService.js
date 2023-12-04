import axios from 'axios';

// Base URL for the user API
const API_URL = '/api/users/';

// Function to register a user
const register = async (userData) => {
    try {
        // Sending a POST request to the registration endpoint
        const response = await axios.post(API_URL, userData);

        // If the response contains user data, store it in local storage
        if (response.data) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }

        // Return the response data
        return response.data;
    } catch (error) {
        // Handle errors and throw the exception
        throw error;
    }
}

// Function to login a user
const login = async (userData) => {
    try {
        // Sending a POST request to the login endpoint
        const response = await axios.post(API_URL + 'login', userData);

        // If the response contains user data, store it in local storage
        if (response.data) {
            localStorage.setItem('user', JSON.stringify(response.data));
        }

        // Return the response data
        return response.data;
    } catch (error) {
        // Handle errors and throw the exception
        throw error;
    }
}

// Function to logout a user
const logout = () => {
    // Remove user data from local storage
    localStorage.removeItem('user');
}

// Object containing the authentication service functions
const authService = {
    register,
    logout,
    login,
}

// Exporting the authService object as the default export
export default authService;
