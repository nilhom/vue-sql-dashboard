const axios = require('axios');

const apiUrl = 'http://localhost:3000/api/query'; // Update the URL if your server is running on a different port or domain

const testApiQuery = async () => {
    try {
        // Make a POST request to /api/query with a sample SQL query
        const response = await axios.post(apiUrl, {
            sql: 'SELECT name FROM sqlite_master WHERE type="table"',
        });

        // Print the response data
        console.log('Response:', response.data);
    } catch (error) {
        // Print any errors that occur during the request
        console.error('Error:', error.message);
    }
};

// Call the function to test the API endpoint
testApiQuery();
