// TODO: Replace with your actual backend URL deployed on Render
const SERVER_URL = 'https://portfoliobackend-w2l0.onrender.com';

const API_BASE_URL = window.location.hostname === 'localhost' ? 'http://localhost:5000' : SERVER_URL;

export default API_BASE_URL;
