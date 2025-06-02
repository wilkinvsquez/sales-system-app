import api from '../api/api';

export default {
    getProducts: async () => {
        try {
            const response = await api.get('/products');
            return await response.data.data;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    },
    searchProducts: async (query: string) => {
        try {
            const response = await api.get(`/products?term=${encodeURIComponent(query)}`);
            return await response.data.data;
        } catch (error) {
            console.error('Error searching products:', error);
            throw error;
        }
    }
}