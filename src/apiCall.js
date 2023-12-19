import axios from 'axios';

const apiUrl = 'http://localhost:3000/api'; // Update with your API URL

export const fetchData = async (sql) => {
    try {
        const response = await axios.post(`${apiUrl}/query`, { sql });
        return response.data.data;
    } catch (error) {
        throw error.response ? error.response.data.data : error.message;
    }
};

export const saveStateToServer = async (state) => {
    try {
        const stateToSave = JSON.stringify(state);
        const response = await axios.post(`${apiUrl}/saveState`, { data: stateToSave } );
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};

export const loadStateFromServer = async () => {
    try {
        const response = await axios.get(`${apiUrl}/loadState`);
        return response.data.data;
    } catch (error) {
        throw error.response ? error.response.data : error.message;
    }
};
