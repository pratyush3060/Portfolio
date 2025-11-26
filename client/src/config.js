// Unified deployment: Same server handles both frontend and API
// In production, use the same origin (relative path)
// In development, point to localhost backend
const API_BASE_URL = window.location.hostname === 'localhost'
    ? 'http://localhost:5000'
    : window.location.origin;

console.log('Config Debug:', {
    hostname: window.location.hostname,
    origin: window.location.origin,
    API_BASE_URL
});

export default API_BASE_URL;
