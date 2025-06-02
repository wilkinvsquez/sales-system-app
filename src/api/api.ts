import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
    },
})

/**
 * Sets the Authorization header for all requests if a token is present in sessionStorage.
 * Handles 401 Unauthorized responses by redirecting to the login page.
 * @returns {AxiosInstance} The configured Axios instance.
 */
api.interceptors.request.use((config) => {
    const token = sessionStorage.getItem('token');
    if (token) config.headers['Authorization'] = `Bearer ${token}`;
    return config;
}, (error) => {
    return Promise.reject(error);
});

/**
 * Handles responses from the API.
 * Logs errors and redirects to the login page if a 401 Unauthorized response is received.
 * @param {AxiosResponse} response - The response from the API.
 * @returns {AxiosResponse} The response object.
 */
api.interceptors.response.use((response) => response, (error) => {
    console.log('API Error:', error);
    if (error.response && error.response.status === 401) {
        sessionStorage.removeItem('token');
        window.location.href = '/login';
    }
    if (error.response && error.response.data) {
        if (error.response.data.message) {
            alert(` ${error.response.data.message}`);
        }
    }
    return Promise.reject(error);
})

export default api;