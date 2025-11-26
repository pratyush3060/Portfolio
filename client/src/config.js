// TODO: Replace with your actual backend URL deployed on Render
const SERVER_URL = 'https://portfolio-server-placeholder.onrender.com';

const API_BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? SERVER_URL : 'http://localhost:5000');

export default API_BASE_URL;
