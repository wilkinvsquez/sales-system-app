import api from "../api/api";
export default {
    createSale: async () => { },
    getSales: async () => {
        try {
            const response = await api.get('/sale');
            return response.data;
        } catch (error) {
            console.error('Error fetching sales:', error);
            throw error;
        }
    },
}