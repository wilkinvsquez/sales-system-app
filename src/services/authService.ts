import api from '../api/api';

export default {
    /** 
     * Logs in a user with the provided username and password. and stores the token in sessionStorage.
     * @param {string} username - The username of the user.
     * @param {string} password - The password of the user.
     * @return {Promise<Object>} The response data from the API.
     */
    login: async (username: string, password: string) => {
        try {
            const response = await api.post('/auth/login', { username, password });
            if (response.data.data.token) sessionStorage.setItem('token', response.data.data.token);
            return response.data.data;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    },

    /** 
     * Registers a new user with the provided username and password.
     * @param {string} username - The username of the new user.
     * @param {string} password - The password of the new user.
     * @return {Promise<Object>} The response data from the API.
     */
    register: async (username: string, password: string) => {
        try {
            const response = await api.post('/auth/register', { username, password });
            return response.data;
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    }
}