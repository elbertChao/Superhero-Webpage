import axios from 'axios';

const API_URL = '/api/lists/';

// Creating a new list
const createList = async (listData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${ token }`
        }
    }

    const response = await axios.post(API_URL, listData, config);

    return response.data;
}

// Getting all lists for a user
const getLists = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${ token }`
        }
    }

    // Config has the JWT for the user
    const response = await axios.get(API_URL, config);

    return response.data;
}

const listService = {
    createList,
}

export default listService;