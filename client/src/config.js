// Separate deployment: Static site (client) + Web Service (API)
// Client is deployed as Render Static Site
// Server is deployed as Render Web Service
const BACKEND_URL = 'https://portfoliobackend-w2l0.onrender.com';

const API_BASE_URL = window.location.hostname === 'localhost'
    ? 'http://localhost:5000'
    : BACKEND_URL;

console.log('Config Debug:', {
    hostname: window.location.hostname,
    BACKEND_URL,
    API_BASE_URL
});

export default API_BASE_URL;
